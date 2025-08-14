import { defineStore } from 'pinia'
import { http } from '@/api/http'
import type { Candidate } from '@/api/types'

export const useCandidatesStore = defineStore('candidates', {
  state: () => ({
    list: [] as Candidate[],
    current: null as Candidate | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll(params?: { name?: string; email?: string }) {
      this.loading = true; this.error = null
      try {
        const { data } = await http.get<Candidate[]>('/candidates', { params })
        this.list = data
      } catch (e: any) {
        this.error = e?.message ?? 'Error fetching candidates'
      } finally { this.loading = false }
    },
    async fetchById(id: string) {
      this.loading = true; this.error = null
      try {
        const { data } = await http.get<Candidate>(`/candidates/${id}`)
        this.current = data
      } catch (e: any) {
        this.error = e?.message ?? 'Candidate not found'; this.current = null
      } finally { this.loading = false }
    },
  },
})