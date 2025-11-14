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
    redirect: '/government/executive'
  },
  {
    path: '/government/executive',
    name: 'GovernmentExecutive',
    component: () => import('@/views/GovernmentExecutive.vue')
  },
  {
    path: '/government/legislative',
    name: 'GovernmentLegislative', 
    component: () => import('@/views/GovernmentLegislative.vue')
  },
  {
    path: '/government/judicial',
    name: 'GovernmentJudicial',
    component: () => import('@/views/GovernmentJudicial.vue')
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import('@/views/StaffView.vue'),
    meta: { requiresAuth: true, title: 'Сотрудники' }
  },
  // Новые маршруты для Обстановки
  {
    path: '/situation/open',
    name: 'situation-open',
    component: () => import('@/views/SituationView.vue'),
    meta: { title: 'Обстановка - Открытый раздел' }
  },
  {
    path: '/situation/closed',
    name: 'situation-closed',
    component: () => import('@/views/SituationView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Обстановка - Закрытый раздел' }
  },
  // Редирект со старого маршрута
  {
    path: '/situation',
    redirect: '/situation/open'
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
  
  // Проверка на необходимость авторизации
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    authStore.openAuthModal()
    return next(false)
  }
  
  // Проверка на права администратора
  if (to.meta.requiresAdmin && !authStore.hasAccess('admin')) {
    // Перенаправляем на открытый раздел если нет прав
    if (to.path.includes('situation')) {
      return next('/situation/open')
    }
    authStore.openAuthModal()
    return next(false)
  }
  
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

export default router