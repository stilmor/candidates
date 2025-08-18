<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCandidatesStore } from '@/stores/candidates.store'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import { useRouter } from 'vue-router'

const store = useCandidatesStore()
const router = useRouter()
const name = ref('')
const email = ref('')

const createDialog = ref(false)
const submitting = ref(false)
const createForm = ref<any>(null)

// Campos del formulario de creación
const firstName = ref('')
const lastName = ref('')
const newEmail = ref('')
const phone = ref('')
const observations = ref('')

// Reglas básicas de validación
const required = (v: string) => !!v || 'Requerido'
const emailRule = (v: string) =>
  (!!v && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) || 'Email inválido'

const tableHeaders = [
  { title: 'Nombre', key: 'fullName', align: 'start' },
  { title: 'Email', key: 'email', align: 'start' },
  { title: 'Estado', key: 'status', align: 'start' },
  { title: 'Acciones', key: 'actions', align: 'center', sortable: false }
] as const

async function openCreate() {
  // Limpia y abre el diálogo
  firstName.value = ''
  lastName.value = ''
  newEmail.value = ''
  phone.value = ''
  observations.value = ''
  createDialog.value = true
}

async function createCandidate() {
  // valida el v-form antes de enviar
  const res = await createForm.value?.validate?.()
  if (res && res.valid === false) return

  submitting.value = true
  try {
    await store.create({
      firstName: firstName.value,
      lastName: lastName.value,
      email: newEmail.value,
      phone: phone.value || undefined,
      observations: observations.value || undefined,
    } as any)
    createDialog.value = false
    // refresca listado tras crear
    await store.fetchAll({ name: name.value || undefined, email: email.value || undefined })
  } finally {
    submitting.value = false
  }
}

const tableItems = computed(() =>
  store.list.map(c => ({
    id: c.id,
    fullName: `${c.firstName} ${c.lastName}`,
    email: c.email,
    status: c.status
  }))
)

async function goToDetail(id: string) {
  try {
    // Precarga el detalle en el store para evitar parpadeo
    await store.fetchById(id)
  } finally {
    router.push(`/candidates/${id}`)
  }
}

function search() {
  store.fetchAll({ name: name.value || undefined, email: email.value || undefined })
}
onMounted(() => store.fetchAll())
</script>

<template>
  <div class="page">
    <div class="container">
      <AppBreadcrumbs />
      <h2 class="title mb-6">Candidatos</h2>

      <v-row class="mb-4" justify="center" align="end">
        <v-col cols="12" md="5">
          <v-text-field v-model="name" label="Buscar por nombre" />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="email" label="Buscar por email" />
        </v-col>
      </v-row>

      <v-dialog v-model="createDialog" max-width="640">
        <v-card>
          <v-card-title class="text-h6">Crear candidato</v-card-title>
          <v-card-text>
            <v-form ref="createForm" @submit.prevent="createCandidate">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="firstName" :rules="[required]" label="Nombre *" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="lastName" :rules="[required]" label="Apellidos *" density="comfortable" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="newEmail" :rules="[required, emailRule]" label="Email *" type="email" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="phone" label="Teléfono" density="comfortable" />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="observations" label="Observaciones" rows="3" auto-grow density="comfortable" />
                </v-col>
              </v-row>
              <v-card-actions class="justify-end">
                <v-btn variant="text" type="button" @click="createDialog = false">Cancelar</v-btn>
                <v-btn color="primary" :loading="submitting" type="submit">Crear</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-row class="mb-6" justify="center">
        <v-col cols="12" md="10" lg="8" class="d-flex justify-center">
          <v-btn color="primary" variant="elevated" @click="openCreate">
            Crear candidato
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="mb-6" justify="center">
        <v-col cols="12" md="3" class="d-flex justify-center">
          <v-btn color="primary" class="search-btn" @click="search">Buscar</v-btn>
        </v-col>
      </v-row>

      <v-progress-linear v-if="store.loading" indeterminate class="mb-4 contained" />
      <v-alert v-if="store.error" type="error" class="mb-4 contained text-center">{{ store.error }}</v-alert>

      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-data-table
            v-if="store.list.length"
            :headers="tableHeaders"
            :items="tableItems"
            item-key="id"
            class="elevation-1 table-left"
            density="comfortable"
          >
            <template #item.actions="{ item }">
              <v-btn size="small" variant="tonal" @click="goToDetail(item.id)">Ver</v-btn>
            </template>
          </v-data-table>
          <div v-else class="text-medium-emphasis text-center">No hay resultados</div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}
.container {
  max-width: 1100px;
}
.title { text-align: center; }
.search-btn { height: 56px; min-width: 220px; }
.contained { max-width: 1100px; margin: 0 auto; }
@media (max-width: 960px) {
  .search-btn { width: 100%; min-width: 0; }
  .contained { max-width: 100%; }
}
/* --- Alineación de la tabla --- */
.table-left :deep(th),
.table-left :deep(td) {
  text-align: left !important;
}
/* Alinear el contenido del header a la izquierda (Vuetify usa flex) */
.table-left :deep(th .v-data-table-header__content) {
  justify-content: flex-start;
}
/* Centrar la última columna (Acciones) */
.table-left :deep(th:last-child),
.table-left :deep(td:last-child) {
  text-align: center !important;
}
</style>