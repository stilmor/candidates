<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCandidatesStore } from '@/stores/candidates.store'

const store = useCandidatesStore()
const name = ref('')
const email = ref('')

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
  margin: 10px;
}
.title { text-align: center; }
.search-btn { height: 56px; min-width: 220px; }
.contained { max-width: 900px; margin: 0 auto; }
@media (max-width: 960px) {
  .search-btn { width: 100%; min-width: 0; }
  .contained { max-width: 100%; }
}
</style>