<script setup lang="ts">
import { onMounted, watch, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCandidatesStore } from '@/stores/candidates.store'
import { useInterviewsStore } from '@/stores/interviews.store'
import InterviewForm from '@/components/InterviewForm.vue'

const route = useRoute()
const candidates = useCandidatesStore()
const interviews = useInterviewsStore()

// --- Edición y validación ---
const editMode = ref(false)
const formRef = ref<any>(null)
const savedOk = ref(false)

type CandidateStatus = 'PENDING' | 'INTERVIEW' | 'REJECTED' | 'HIRED'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '' as string | null,
  observations: '' as string | null,
  status: 'PENDING' as CandidateStatus,
})

const rules = {
  required: (v: string | null | undefined) => !!(v && String(v).trim()) || 'Campo requerido',
  email: (v: string | null | undefined) => {
    if (!v) return 'Email requerido'
    const re = /^(?:[a-zA-Z0-9_'^&\/+\-])+(?:\.(?:[a-zA-Z0-9_'^&\/+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
    return re.test(v) || 'Email inválido'
  },
}

const hasCurrent = computed(() => !!candidates.current)

function fillFormFromCurrent() {
  if (!candidates.current) return
  form.firstName = candidates.current.firstName
  form.lastName = candidates.current.lastName
  form.email = candidates.current.email
  form.phone = candidates.current.phone ?? ''
  form.observations = candidates.current.observations ?? ''
  form.status = candidates.current.status
}

onMounted(() => {
  const id = String(route.params.id)
  candidates.fetchById(id).then(fillFormFromCurrent)
  interviews.fetchForCandidate(id)
})

watch(() => route.params.id, (val) => {
  const id = String(val ?? '')
  candidates.fetchById(id).then(fillFormFromCurrent)
  interviews.fetchForCandidate(id)
})

watch(() => candidates.current?.id, () => fillFormFromCurrent())

async function save() {
  if (!candidates.current) return
  savedOk.value = false

  // valida el formulario con Vuetify
  const validation = await formRef.value?.validate?.()
  if (validation && validation.valid === false) return

  await candidates.update(candidates.current.id, {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone === '' ? null : form.phone,
    observations: form.observations === '' ? null : form.observations,
    status: form.status,
  })
  savedOk.value = !candidates.error
  if (savedOk.value) editMode.value = false
}

function cancel() {
  editMode.value = false
  fillFormFromCurrent()
}
</script>

<template>
  <div class="page">
    <div class="container">
      <v-progress-linear v-if="candidates.loading" indeterminate class="mb-4 contained" />
      <v-alert v-if="candidates.error" type="error" class="mb-4 contained text-center">{{ candidates.error }}</v-alert>

      <template v-if="hasCurrent">
        <!-- Cabecera -->
        <h2 class="title mb-1">{{ candidates.current!.firstName }} {{ candidates.current!.lastName }}</h2>
        <div class="subtitle mb-6">{{ candidates.current!.email }} · {{ candidates.current!.status }}</div>

        <!-- Datos del candidato / Edición con validación -->
        <h3 class="section mb-2">Datos del candidato</h3>
        <div class="contained mb-6">
          <div class="d-flex justify-center align-center mb-3" style="gap: 8px;">
            <v-btn v-if="!editMode" color="primary" @click="editMode = true">Editar</v-btn>
            <v-btn v-else color="primary" :loading="candidates.loading" @click="save">Guardar</v-btn>
            <v-btn v-if="editMode" variant="text" @click="cancel">Cancelar</v-btn>
          </div>
          <v-alert v-if="savedOk" type="success" class="mb-3">Cambios guardados</v-alert>

          <template v-if="!editMode">
            <v-row class="centered-block" justify="center">
              <v-col cols="12" md="6"><strong>Nombre:</strong> {{ candidates.current!.firstName }}</v-col>
              <v-col cols="12" md="6"><strong>Apellidos:</strong> {{ candidates.current!.lastName }}</v-col>
              <v-col cols="12" md="6"><strong>Email:</strong> {{ candidates.current!.email }}</v-col>
              <v-col cols="12" md="6"><strong>Teléfono:</strong> {{ candidates.current!.phone ?? '—' }}</v-col>
              <v-col cols="12" md="6"><strong>Estado:</strong> {{ candidates.current!.status }}</v-col>
              <v-col cols="12"><strong>Observaciones:</strong> {{ candidates.current!.observations ?? '—' }}</v-col>
            </v-row>
          </template>

          <template v-else>
            <v-form ref="formRef">
              <v-row justify="center" class="centered-block">
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.firstName" label="Nombre" :rules="[rules.required]" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.lastName" label="Apellidos" :rules="[rules.required]" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.email" label="Email" type="email" :rules="[rules.email]" required />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.phone" label="Teléfono" />
                  <v-select
                    v-model="form.status"
                    :items="['PENDING','INTERVIEW','REJECTED','HIRED']"
                    label="Estado"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="form.observations" label="Observaciones" rows="3" />
                </v-col>
              </v-row>
            </v-form>
          </template>
        </div>

        <!-- Asignar entrevista -->
        <h3 class="section mb-2">Asignar entrevista</h3>
        <div class="contained mb-6">
          <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6">
              <InterviewForm :candidate-id="candidates.current!.id" :density="'compact'" :field="'position'" />
            </v-col>
          </v-row>
        </div>

        <!-- Listado entrevistas -->
        <h3 class="section mb-2">Entrevistas</h3>
        <v-progress-linear v-if="interviews.loading" indeterminate class="mb-3 contained" />
        <v-alert v-if="interviews.error" type="error" class="mb-3 contained text-center">{{ interviews.error }}</v-alert>

        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-list v-if="interviews.byCandidate.get(candidates.current!.id)?.length">
              <v-list-item
                v-for="i in interviews.byCandidate.get(candidates.current!.id)"
                :key="i.id"
              >
                <v-list-item-title>
                  {{ new Date(i.scheduledAt).toLocaleString() }} — {{ i.position }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <div v-else class="text-medium-emphasis text-center">No hay entrevistas</div>
          </v-col>
        </v-row>
      </template>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;                 /* evitar el desplazamiento por el scrollbar de 100vw */
  min-height: 100dvh;          /* alto de la ventana respetando barras/UA */
  padding: 24px;               /* margen interno simétrico */
  box-sizing: border-box;
  display: flex;               /* centrar el contenedor */
  justify-content: center;
}
.container {
  max-width: 1920px;
  margin: 0 auto;          /* centrado horizontal */
  text-align: center;
  width: 100%;             /* que use todo el ancho disponible del .page */
}
.title { text-align: center; }
.subtitle { text-align: center; color: rgba(0,0,0,.6); }
.section { font-weight: 600; }
.contained { max-width: 1920px; margin: 0 auto; }
.centered-block { max-width: 1920px; margin: 0 auto; }
</style>