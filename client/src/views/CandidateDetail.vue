<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCandidatesStore } from '@/stores/candidates.store'
import { useInterviewsStore } from '@/stores/interviews.store'
import InterviewForm from '@/components/InterviewForm.vue'

const route = useRoute()
const candidates = useCandidatesStore()
const interviews = useInterviewsStore()

onMounted(() => {
  const id = String(route.params.id)
  candidates.fetchById(id)
  interviews.fetchForCandidate(id)
})

watch(() => route.params.id, (val) => {
  const id = String(val ?? '')
  candidates.fetchById(id)
  interviews.fetchForCandidate(id)
})
</script>

<template>
  <div class="page">
    <div class="container">
      <v-progress-linear v-if="candidates.loading" indeterminate class="mb-4 contained" />
      <v-alert v-if="candidates.error" type="error" class="mb-4 contained text-center">{{ candidates.error }}</v-alert>

      <template v-if="candidates.current">
        <h2 class="title mb-1">{{ candidates.current.firstName }} {{ candidates.current.lastName }}</h2>
        <div class="subtitle mb-6">{{ candidates.current.email }} · {{ candidates.current.status }}</div>

        <h3 class="section mb-2">Asignar entrevista</h3>
        <div class="contained mb-6">
          <InterviewForm :candidate-id="candidates.current.id" />
        </div>

        <h3 class="section mb-2">Entrevistas</h3>
        <v-progress-linear v-if="interviews.loading" indeterminate class="mb-3 contained" />
        <v-alert v-if="interviews.error" type="error" class="mb-3 contained text-center">{{ interviews.error }}</v-alert>

        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-list v-if="interviews.byCandidate.get(candidates.current.id)?.length">
              <v-list-item
                v-for="i in interviews.byCandidate.get(candidates.current.id)"
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
.page { width: 100vw; min-height: 100vh; padding: 24px; box-sizing: border-box; }
.container { max-width: 1100px; }
.title { text-align: center; }
.subtitle { text-align: center; color: rgba(0,0,0,.6); }
.section { font-weight: 600; }
.contained { max-width: 900px; margin: 0 auto; }
</style>