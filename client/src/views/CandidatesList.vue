<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCandidatesStore } from '@/stores/candidates.store'

const store = useCandidatesStore()
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

function search() {
  store.fetchAll({ name: name.value || undefined, email: email.value || undefined })
}
onMounted(() => store.fetchAll())
</script>

<template>
  <div class="page">
    <div class="container">
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
        <v-col cols="12" md="10" lg="8">
          <v-list v-if="store.list.length">
            <v-list-item
              v-for="c in store.list"
              :key="c.id"
              :to="`/candidates/${c.id}`"
              link
            >
              <v-list-item-title>{{ c.firstName }} {{ c.lastName }}</v-list-item-title>
              <v-list-item-subtitle>{{ c.email }} · {{ c.status }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
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
.contained { max-width: 900px; margin: 0 auto; }
@media (max-width: 960px) {
  .search-btn { width: 100%; min-width: 0; }
  .contained { max-width: 100%; }
}
</style>