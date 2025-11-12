// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Главная - Ситуационный центр' }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/HistoryView.vue'),
    meta: { title: 'История Курской области' }
  },
  {
    path: '/municipalities',
    name: 'municipalities',
    component: () => import('@/views/MunicipalitiesView.vue'),
    meta: { title: 'Муниципальные образования' }
  },
  {
    path: '/government',
    name: 'government',
    component: () => import('@/views/GovernmentView.vue'),
    meta: { title: 'Государственные органы' }
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import('@/views/StaffView.vue'),
    meta: { requiresAuth: true, title: 'Сотрудники' }
  },
  {
    path: '/situation',
    name: 'situation',
    component: () => import('@/views/SituationView.vue'),
    meta: { title: 'Обстановка' }
  },
  {
    path: '/systems',
    name: 'systems',
    component: () => import('@/views/SystemsView.vue'),
    meta: { title: 'Информационные системы' }
  },
  {
    path: '/gis',
    name: 'gis',
    component: () => import('@/views/GISView.vue'),
    meta: { requiresAuth: true, title: 'ГИС Карта' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    authStore.openAuthModal()
    return next(false)
  }
  
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

export default router