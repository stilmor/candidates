import { defineStore } from 'pinia';
import { http } from '@/api/http';
export const useCandidatesStore = defineStore('candidates', {
    state: () => ({
        list: [],
        current: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchAll(params) {
            this.loading = true;
            this.error = null;
            try {
                const { data } = await http.get('/candidates', { params });
                this.list = data;
            }
            catch (e) {
                this.error = e?.message ?? 'Error fetching candidates';
            }
            finally {
                this.loading = false;
            }
        },
        async fetchById(id) {
            this.loading = true;
            this.error = null;
            try {
                const { data } = await http.get(`/candidates/${id}`);
                this.current = data;
            }
            catch (e) {
                this.error = e?.message ?? 'Candidate not found';
                this.current = null;
            }
            finally {
                this.loading = false;
            }
        },
    },
});
