import { createRouter, createWebHistory } from 'vue-router'
import CandidatesList from '../views/CandidatesList.vue'
import CandidateDetail from '../views/CandidateDetail.vue'
// import CandidateCreate from '../views/CandidateCreate.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/candidates' },
    { path: '/candidates', component: CandidatesList },
    // { path: '/candidates/create', component: CandidateCreate },
    { path: '/candidates/:id', component: CandidateDetail, props: true },
  ],
})