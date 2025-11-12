<template>
  <aside class="w-64 bg-gray-900/80 backdrop-blur-lg border-r border-white/10 min-h-screen">
    <nav class="p-6">
      <!-- Заголовок навигации -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-white mb-2">Навигация</h2>
        <div class="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      </div>

      <!-- Меню -->
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <router-link 
            :to="item.path" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            :class="{
              'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400': $route.path === item.path
            }"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">{{ item.icon }}</span>
            </div>
            <span class="font-medium">{{ item.name }}</span>
            <div v-if="item.badge" class="ml-auto bg-red-500 text-xs text-white px-2 py-1 rounded-full">
              {{ item.badge }}
            </div>
          </router-link>
        </li>
      </ul>

      <!-- Разделитель -->
      <div class="my-6 border-t border-white/10"></div>

      <!-- Системная информация -->
      <div class="bg-black/30 rounded-xl p-4 border border-white/10">
        <h3 class="text-sm font-semibold text-white mb-3">Системный статус</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-400">База данных</span>
            <span class="text-green-400 font-semibold">Online</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-400">ГИС система</span>
            <span class="text-green-400 font-semibold">Active</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-gray-400">Обновление</span>
            <span class="text-blue-400 font-semibold">{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const currentTime = ref('')

const menuItems = computed(() => {
  const baseItems = [
    { name: 'Главная', path: '/', icon: '📊' },
    { name: 'История', path: '/history', icon: '📚' },
    { name: 'Муниципалитеты', path: '/municipalities', icon: '🏛️' },
    { name: 'Госорганы', path: '/government', icon: '⚖️' },
    { name: 'Обстановка', path: '/situation', icon: '📈', badge: '3' },
    { name: 'Системы', path: '/systems', icon: '🔗' }
  ]

  if (authStore.hasAccess('user')) {
    baseItems.splice(4, 0, { name: 'Сотрудники', path: '/staff', icon: '👥' })
    baseItems.push({ name: 'ГИС Карта', path: '/gis', icon: '🗺️' })
  }

  return baseItems
})

// Обновление времени
let timeInterval

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000) // Каждую минуту
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}
</script>