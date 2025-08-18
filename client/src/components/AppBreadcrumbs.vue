

<template>
  <v-breadcrumbs :items="items" class="mb-2 contained">
    <template #divider>
      <span class="mx-2">/</span>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCandidatesStore } from '@/stores/candidates.store'

type Crumb = { title: string; href?: string; disabled?: boolean }

const route = useRoute()
const candidates = useCandidatesStore()

const items = computed<Crumb[]>(() => {
  const list: Crumb[] = [{ title: 'Inicio', href: '/' }]

  // /candidates
  if (route.path.startsWith('/candidates')) {
    list.push({ title: 'Candidatos', href: '/candidates' })

    // /candidates/:id
    const id = route.params.id as string | undefined
    if (id) {
      const found = candidates.list.find(c => c.id === id)
      const label =
        found ? `${found.firstName} ${found.lastName}` : 'Detalle'
      list.push({ title: label, disabled: true })
    } else {
      // estás en el listado
      list[list.length - 1].disabled = true
    }
  }

  return list
})
</script>

<style scoped>
.contained { max-width: 1100px; margin: 0 auto; }
</style>