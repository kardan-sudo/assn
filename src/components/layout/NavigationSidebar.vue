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
            v-if="!item.children && hasAccess(item)"
            :to="item.path" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            :class="{
              'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400': isRouteActive(item.path)
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
          <div v-else-if="item.name === 'Обстановка' && hasAccess(item)" class="relative">
            <button
              @click="toggleDropdown('situation')"
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
                :class="{ 'rotate-180': activeDropdown === 'situation' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Выпадающее меню для Обстановки -->
            <transition name="dropdown">
              <div 
                v-if="activeDropdown === 'situation'"
                class="ml-4 mt-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl overflow-hidden"
              >
                <div class="py-2 space-y-1">
                  <!-- Открытый раздел -->
                  <div class="px-3 pt-2 pb-1">
                    <p class="text-xs font-semibold text-blue-300 uppercase tracking-wide">📰 Открытый раздел</p>
                  </div>
                  <router-link
                    v-for="child in item.children.open"
                    :key="child.path"
                    :to="child.path"
                    @click="activeDropdown = null"
                    v-show="hasAccess(child)"
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

                  <!-- Закрытый раздел -->
                  <div class="px-3 pt-3 pb-1 border-t border-white/10 mt-2">
                    <p class="text-xs font-semibold text-purple-300 uppercase tracking-wide">🔒 Закрытый раздел</p>
                  </div>
                  <router-link
                    v-for="child in item.children.closed"
                    :key="child.path"
                    :to="child.path"
                    @click="activeDropdown = null"
                    v-show="hasAccess(child)"
                    class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    :class="{
                      'bg-blue-500/20 text-white': $route.path === child.path
                    }"
                  >
                    <div class="w-5 h-5 flex items-center justify-center">
                      <span class="text-sm">{{ child.icon }}</span>
                    </div>
                    <span class="text-sm font-medium">{{ child.name }}</span>
                    <div v-if="child.requiresAdmin" class="ml-auto">
                      <span class="text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">Admin</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <!-- Выпадающий список для "Госорганы" -->
          <div v-else-if="item.name === 'Госорганы' && hasAccess(item)" class="relative">
            <button
              @click="toggleDropdown('government')"
              class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white w-full text-left"
              :class="{
                'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400': isGovernmentActive
              }"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <span class="text-lg">{{ item.icon }}</span>
              </div>
              <span class="font-medium">{{ item.name }}</span>
              <svg 
                class="w-4 h-4 ml-auto transition-transform duration-300" 
                :class="{ 'rotate-180': activeDropdown === 'government' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Выпадающее меню для Госорганов -->
            <transition name="dropdown">
              <div 
                v-if="activeDropdown === 'government'"
                class="ml-4 mt-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/10 shadow-2xl overflow-hidden"
              >
                <div class="py-2 space-y-1">
                  <router-link
                    v-for="child in item.children"
                    :key="child.path"
                    :to="child.path"
                    @click="activeDropdown = null"
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
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            :class="{
              'bg-gradient-to-br from-blue-400 to-purple-500': !isAdmin,
              'bg-gradient-to-br from-red-400 to-orange-500': isAdmin
            }"
          >
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-semibold truncate">{{ user.name }}</p>
            <p class="text-xs truncate" :class="isAdmin ? 'text-orange-300' : 'text-blue-300'">
              {{ userRoleText }}
            </p>
          </div>
        </div>
        
        <!-- Бейдж администратора -->
        <div v-if="isAdmin" class="mt-2 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-1">
          <p class="text-red-300 text-xs font-semibold text-center">Администратор системы</p>
        </div>
      </div>

      <!-- Кнопка входа для неавторизованных -->
      <div v-else class="mt-6 pt-6 border-t border-white/10">
        <button 
          @click="openAuthModal"
          class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Войти в систему
        </button>
        <p class="text-gray-400 text-xs text-center mt-3">
          Для доступа к полному функционалу
        </p>
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
const activeDropdown = ref(null)

// Проверяем активна ли какая-либо из дочерних страниц
const isSituationActive = computed(() => {
  return route.path.startsWith('/situation')
})

const isGovernmentActive = computed(() => {
  return route.path.startsWith('/government')
})

const isRouteActive = (path) => {
  return route.path === path
}

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const user = computed(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name.split(' ').map(n => n[0]).join('')
})
const userRoleText = computed(() => {
  if (!user.value?.role) return 'Гость'
  return user.value.role === 'admin' ? 'Администратор' : 'Пользователь'
})

// Функция проверки доступа к пункту меню
const hasAccess = (menuItem) => {
  // Если пункт требует авторизации, но пользователь не авторизован
  if (menuItem.requiresAuth && !isAuthenticated.value) {
    return false
  }
  
  // Если пункт требует прав администратора
  if (menuItem.requiresAdmin && !isAdmin.value) {
    return false
  }
  
  // Для дочерних элементов в выпадающем меню
  if (menuItem.children) {
    if (menuItem.children.open) {
      return menuItem.children.open.some(child => hasAccess(child)) || 
             menuItem.children.closed.some(child => hasAccess(child))
    }
    return menuItem.children.some(child => hasAccess(child))
  }
  
  return true
}

const menuItems = computed(() => {
  const baseItems = [
    { name: 'Главная', path: '/', icon: '📊' },
    { name: 'История', path: '/history', icon: '📚' },
    { name: 'Муниципалитеты', path: '/municipalities', icon: '🏛️' },
    { 
      name: 'Госорганы', 
      icon: '⚖️',
      children: [
        { 
          name: 'Исполнительная власть', 
          path: '/government/executive', 
          icon: '🏢'
        },
        { 
          name: 'Законодательная власть', 
          path: '/government/legislative', 
          icon: '📜'
        },
        { 
          name: 'Судебная власть', 
          path: '/government/judicial', 
          icon: '⚖️'
        }
      ]
    },
    { 
      name: 'Обстановка', 
      icon: '📈', 
      badge: isAdmin.value ? '6' : '3',
      children: {
        open: [
          { 
            name: 'Обзор событий', 
            path: '/situation/open/events', 
            icon: '📅'
          },
          { 
            name: 'Актуальные проблемы', 
            path: '/situation/open/problems', 
            icon: '⚠️'
          },
          { 
            name: 'Деятельность ГФИ', 
            path: '/situation/open/gfi', 
            icon: '👨‍💼'
          }
        ],
        closed: [
          { 
            name: 'Аналитические отчеты', 
            path: '/situation/closed/reports', 
            icon: '📊',
            requiresAuth: true,
            requiresAdmin: true
          },
          { 
            name: 'Статистика', 
            path: '/situation/closed/statistics', 
            icon: '📋',
            requiresAuth: true,
            requiresAdmin: true
          },
          { 
            name: 'Мониторинг СМИ', 
            path: '/situation/closed/media', 
            icon: '📺',
            requiresAuth: true,
            requiresAdmin: true
          }
        ]
      }
    },
    { 
      name: 'Сотрудники', 
      path: '/staff', 
      icon: '👥',
      requiresAuth: true,
      requiresAdmin: true
    },
    { name: 'Системы', path: '/systems', icon: '🔗' },
    { 
      name: 'ГИС Карта', 
      path: '/gis', 
      icon: '🗺️', 
      requiresAuth: true,
      requiresAdmin: true
    }
  ]

  return baseItems.filter(item => hasAccess(item))
})

const toggleDropdown = (dropdownName) => {
  activeDropdown.value = activeDropdown.value === dropdownName ? null : dropdownName
}

const openAuthModal = () => {
  authStore.openAuthModal()
}

// Закрываем dropdown при клике вне его
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeDropdown.value = null
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