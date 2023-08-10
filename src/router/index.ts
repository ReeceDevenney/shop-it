import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/Loggin',
      name: 'Loggin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LogginView.vue')
    },
    {
      path: '/dashboard/:username',
      name: 'dashboard',
      component: () => import('../views/dashboardView.vue')
    }
  ]
})

export default router
