import { defineStore } from 'pinia'
import { http } from '../api/http'
import type { Interview } from '@/api/types'

export const useInterviewsStore = defineStore('interviews', {
  state: () => ({
    byCandidate: new Map<string, Interview[]>(),
    loading: false,
    error: null as string | null,
    lastCreated: null as Interview | null,
  }),
  actions: {
    async fetchForCandidate(candidateId: string) {
      this.loading = true; this.error = null
      try {
        const { data } = await http.get<Interview[]>(`/candidates/${candidateId}`)
        this.byCandidate.set(candidateId, data)
      } catch (e: any) {
        this.error = e?.message ?? 'Error fetching interviews'
      } finally { this.loading = false }
    },
    async createInterview(payload: { candidateId: string; position: string; scheduledAt: string }) {
      this.loading = true; this.error = null
      try {
        const { data } = await http.post<Interview>('/interviews', payload)
        this.lastCreated = data
        const list = this.byCandidate.get(payload.candidateId) ?? []
        this.byCandidate.set(payload.candidateId, [data, ...list])
      } catch (e: any) {
        this.error = e?.message ?? 'Error creating interview'
      } finally { this.loading = false }
    },
  },
})