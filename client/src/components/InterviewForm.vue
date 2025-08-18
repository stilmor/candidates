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
  <v-row dense>
    <v-col cols="6"><v-text-field v-model="position" label="Posición" required /></v-col>
    <v-col cols="4"><v-text-field v-model="whenLocal" type="datetime-local" label="Fecha/hora" required /></v-col>
    <v-col cols="2" class="d-flex align-end">
      <v-btn color="primary" :loading="store.loading" @click="submit">Asignar</v-btn>
    </v-col>
  </v-row>
  <v-alert v-if="store.error" type="error" class="mt-2">{{ store.error }}</v-alert>
  <v-alert v-if="store.lastCreated" type="success" class="mt-2">Entrevista creada</v-alert>
</template>