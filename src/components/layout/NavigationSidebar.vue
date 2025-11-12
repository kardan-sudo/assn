<template>
  <aside class="w-64 bg-gray-900/80 backdrop-blur-lg border-r border-white/10 sticky top-0 h-screen overflow-y-auto flex-shrink-0">
    <nav class="p-6">
      <!-- Заголовок навигации -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-white mb-2">Навигация</h2>
        <div class="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      </div>

      <!-- Меню -->
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <!-- Обычные пункты меню -->
          <router-link 
            v-if="!item.children"
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

          <!-- Выпадающий список для "Обстановка" -->
          <div v-else class="relative">
            <button
              @click="toggleSituationDropdown"
              class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white w-full text-left"
              :class="{
                'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400': isSituationActive
              }"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <span class="text-lg">{{ item.icon }}</span>
              </div>
              <span class="font-medium">{{ item.name }}</span>
              <svg 
                class="w-4 h-4 ml-auto transition-transform duration-300" 
                :class="{ 'rotate-180': showSituationDropdown }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Выпадающее меню -->
            <transition name="dropdown">
              <div 
                v-if="showSituationDropdown"
                class="ml-4 mt-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl overflow-hidden"
              >
                <div class="py-2 space-y-1">
                  <router-link
                    v-for="child in item.children"
                    :key="child.path"
                    :to="child.path"
                    @click="showSituationDropdown = false"
                    class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    :class="{
                      'bg-blue-500/20 text-white': $route.path === child.path
                    }"
                  >
                    <div class="w-5 h-5 flex items-center justify-center">
                      <span class="text-sm">{{ child.icon }}</span>
                    </div>
                    <span class="text-sm font-medium">{{ child.name }}</span>
                    
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
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

      <!-- Текущий пользователь -->
      <div v-if="isAuthenticated" class="mt-6 pt-6 border-t border-white/10">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-semibold truncate">{{ user.name }}</p>
            <p class="text-blue-300 text-xs truncate">{{ userRoleText }}</p>
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
const showSituationDropdown = ref(false)

// Проверяем активна ли какая-либо из дочерних страниц "Обстановка"
const isSituationActive = computed(() => {
  return route.path.startsWith('/situation')
})

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name.split(' ').map(n => n[0]).join('')
})
const userRoleText = computed(() => {
  if (!user.value?.role) return 'Гость'
  return user.value.role === 'admin' ? 'Администратор' : 'Пользователь'
})

const menuItems = computed(() => {
  const baseItems = [
    { name: 'Главная', path: '/', icon: '📊' },
    { name: 'История', path: '/history', icon: '📚' },
    { name: 'Муниципалитеты', path: '/municipalities', icon: '🏛️' },
    { name: 'Госорганы', path: '/government', icon: '⚖️' },
    { 
      name: 'Обстановка', 
      icon: '📈', 
      badge: '2',
      children: [
        { 
          name: 'Открытый раздел', 
          path: '/situation/open', 
          icon: '📰',
          description: 'Обзор событий, СМИ и деятельность ГФИ'
        },
        { 
          name: 'Закрытый раздел', 
          path: '/situation/closed', 
          icon: '🔒',
          description: 'Социально-экономическое развитие',
          requiresAdmin: true
        }
      ].filter(child => !child.requiresAdmin || authStore.hasAccess('admin'))
    },
    { name: 'Системы', path: '/systems', icon: '🔗' }
  ]

  // Добавляем сотрудников только для админов
  if (authStore.hasAccess('admin')) {
    baseItems.splice(4, 0, { 
      name: 'Сотрудники', 
      path: '/staff', 
      icon: '👥',
      requiresAdmin: true 
    })
  }

  // Добавляем ГИС карту для всех авторизованных пользователей
  if (authStore.isAuthenticated) {
    baseItems.push({ name: 'ГИС Карта', path: '/gis', icon: '🗺️' })
  }

  return baseItems
})

const toggleSituationDropdown = () => {
  showSituationDropdown.value = !showSituationDropdown.value
}

// Закрываем dropdown при клике вне его
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showSituationDropdown.value = false
  }
}

// Обновление времени
let timeInterval

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  clearInterval(timeInterval)
  document.removeEventListener('click', handleClickOutside)
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Стили для фиксированной навигации */
.sticky {
  position: sticky;
  top: 0;
}

/* Высота на всю видимую область */
.h-screen {
  height: 100vh;
}

/* Кастомная полоса прокрутки для навигации */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Анимации для выпадающего меню */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>