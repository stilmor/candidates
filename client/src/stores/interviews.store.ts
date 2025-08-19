import { defineStore } from 'pinia'
import type { InterviewDTO } from '@/api/interviews'
import { getInterviewsByCandidate, createInterview as apiCreateInterview } from '@/api/interviews'

export const useInterviewsStore = defineStore('interviews', {
  state: () => ({
    byCandidate: new Map<string, InterviewDTO[]>(),
    loading: false,
    error: null as string | null,
    lastCreated: null as InterviewDTO | null,
  }),
  actions: {
    async fetchForCandidate(candidateId: string) {
      this.loading = true; this.error = null
      try {
        const interviews = await getInterviewsByCandidate(candidateId)
        this.byCandidate.set(candidateId, interviews)
      } catch (e: any) {
        this.error = e?.message ?? 'Error fetching interviews'
      } finally { this.loading = false }
    },
    async createInterview(payload: { candidateId: string; position: string; scheduledAt: string }): Promise<InterviewDTO | void> {
      this.loading = true; this.error = null
      try {
        const interview = await apiCreateInterview(payload)
        this.lastCreated = interview
        const list = this.byCandidate.get(payload.candidateId) ?? []
        this.byCandidate.set(payload.candidateId, [interview, ...list])
        return interview
      } catch (e: any) {
        this.error = e?.message ?? 'Error creating interview'
      } finally { this.loading = false }
    },
  },
})