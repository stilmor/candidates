import { defineStore } from 'pinia'
import type { CandidateDTO } from '@/api/candidates.api'
import { getCandidates, getCandidateById } from '@/api/candidates.api'

export const useCandidatesStore = defineStore('candidates', {
  state: () => ({
    list: [] as CandidateDTO[],
    current: null as CandidateDTO | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll(params?: { name?: string; email?: string }) {
      this.loading = true; this.error = null
      try {
        this.list = await getCandidates(params ?? {})
      } catch (e: any) {
        this.error = e?.message ?? 'Error fetching candidates'
      } finally { this.loading = false }
    },
    async fetchById(id: string) {
      this.loading = true; this.error = null
      try {
        this.current = await getCandidateById(id)
      } catch (e: any) {
        this.error = e?.message ?? 'Candidate not found'; this.current = null
      } finally { this.loading = false }
    },
  },
})