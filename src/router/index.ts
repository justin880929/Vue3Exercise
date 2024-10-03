import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '1',
    },
    {
      path: '/1',
      name: 'exercise1',
      component:() => import('../views/ExerCise1.vue')
    },
    {
      path: '/2',
      name: 'exercise2',
      component: () => import('../views/ExerCise2.vue')
    },
    {
      path: '/3',
      name: 'exercise3',
      component: () => import('../views/ExerCise3.vue')
    }
  ]
})

export default router
