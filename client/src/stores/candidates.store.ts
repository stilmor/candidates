import { defineStore } from 'pinia'
import type { CandidateDTO } from '@/api/candidates.api'
import { getCandidates, getCandidateById, updateCandidate, deleteCandidate, createCandidate } from '@/api/candidates.api'

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
        if (this.current && this.current.id === id) {
          this.current = { ...this.current, ...updated }
        }
        const idx = this.list.findIndex(candidate => candidate.id === id)
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

    async delete(id: string) {
      this.loading = true; this.error = null
      try {
        await deleteCandidate(id)
        const idx = this.list.findIndex(candidate => candidate.id === id)
        if (idx !== -1) {
          this.list.splice(idx, 1)
        }
        if (this.current && this.current.id === id) {
          this.current = null
        }
      } catch (e: any) {
        this.error = e?.message ?? 'Error deleting candidate'
        throw e
      } finally {
        this.loading = false
      }
    },

    async create(data: Omit<CandidateDTO, 'id'>) {
      this.loading = true; this.error = null
      try {
        const created = await createCandidate(data)
        this.list.push(created)
        return created
      } catch (e: any) {
        this.error = e?.message ?? 'Error creating candidate'
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})