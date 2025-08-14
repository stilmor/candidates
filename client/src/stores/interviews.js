import { defineStore } from 'pinia';
import { http } from '../api/http';
export const useInterviewsStore = defineStore('interviews', {
    state: () => ({
        byCandidate: new Map(),
        loading: false,
        error: null,
        lastCreated: null,
    }),
    actions: {
        async fetchForCandidate(candidateId) {
            this.loading = true;
            this.error = null;
            try {
                const { data } = await http.get(`/candidates/${candidateId}`);
                this.byCandidate.set(candidateId, data);
            }
            catch (e) {
                this.error = e?.message ?? 'Error fetching interviews';
            }
            finally {
                this.loading = false;
            }
        },
        async createInterview(payload) {
            this.loading = true;
            this.error = null;
            try {
                const { data } = await http.post('/interviews', payload);
                this.lastCreated = data;
                const list = this.byCandidate.get(payload.candidateId) ?? [];
                this.byCandidate.set(payload.candidateId, [data, ...list]);
            }
            catch (e) {
                this.error = e?.message ?? 'Error creating interview';
            }
            finally {
                this.loading = false;
            }
        },
    },
});
