<script setup lang="ts">
import { ref } from 'vue'
import { useInterviewsStore } from '@/stores/interviews.store'

const props = defineProps<{ candidateId: string }>()
const position = ref(''); const whenLocal = ref('')
const store = useInterviewsStore()

function submit() {
  const iso = whenLocal.value ? new Date(whenLocal.value).toISOString() : ''
  store.createInterview({ candidateId: props.candidateId, position: position.value, scheduledAt: iso })
}
</script>

<template>
  <v-row align="center">
    <v-col cols="12" md="5" lg="6">
      <v-text-field v-model="position" label="Posición" required density="comfortable" hide-details />
    </v-col>
    <v-col cols="12" md="5" lg="4">
      <v-text-field v-model="whenLocal" type="datetime-local" label="Fecha/hora" required density="comfortable" hide-details />
    </v-col>
    <v-col cols="12" md="2" lg="2" class="d-flex">
      <v-btn color="primary" :loading="store.loading" @click="submit" height="56" class="w-100">Asignar</v-btn>
    </v-col>
  </v-row>
  <v-alert v-if="store.error" type="error" class="mt-2">{{ store.error }}</v-alert>
  <v-alert v-if="store.lastCreated" type="success" class="mt-2">Entrevista creada</v-alert>
</template>