import { defineStore } from 'pinia'
import type { CandidateDTO } from '@/api/candidates.api'
import { getCandidates, getCandidateById, updateCandidate } from '@/api/candidates.api'

export const useCandidatesStore = defineStore('candidates', {
  state: () => ({
    list: [] as CandidateDTO[],
    current: null as CandidateDTO | null,
    loading: false,
    error: null as string | null,
    lastUpdated: null as CandidateDTO | null,
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
    async update(id: string, data: Partial<CandidateDTO>) {
      this.loading = true; this.error = null
      try {
        const updated = await updateCandidate(id, data)
        this.lastUpdated = updated
        // sincroniza `current` si coincide
        if (this.current && this.current.id === id) {
          this.current = { ...this.current, ...updated }
        }
        // actualiza la lista si el candidato está cargado
        const idx = this.list.findIndex(c => c.id === id)
        if (idx !== -1) {
          this.list.splice(idx, 1, { ...this.list[idx], ...updated })
        }
        return updated
      } catch (e: any) {
        this.error = e?.message ?? 'Error updating candidate'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})