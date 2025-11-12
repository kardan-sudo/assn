<template>
  <header class="glass-dark border-b border-white/10">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Логотип и название -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
          </div>
          
          <div class="text-white">
            <h1 class="text-xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ситуационный центр
            </h1>
            <p class="text-sm text-blue-200 opacity-80">Губернатор Курской области</p>
          </div>
        </div>

        <!-- Статус и время -->
        <div class="hidden md:flex items-center space-x-6">
          <div class="text-right text-white">
            <div class="text-sm opacity-80">Курск</div>
            <div class="text-xs opacity-60">{{ currentTime }}</div>
          </div>
          <div class="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-300 text-sm font-medium">Система активна</span>
          </div>
        </div>

        <!-- Кнопки управления -->
        <div class="flex items-center space-x-3">
          <!-- Уведомления -->
          <button class="relative p-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-6.24M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center">3</span>
          </button>

          <!-- Профиль пользователя -->
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <div class="text-right text-white hidden sm:block">
              <div class="font-semibold text-sm">{{ user.name }}</div>
              <div class="text-xs opacity-70 capitalize">{{ user.role }}</div>
            </div>
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white/20">
              {{ user.name.split(' ').map(n => n[0]).join('') }}
            </div>
          </div>

          <!-- Кнопка входа -->
          <button
            v-else
            @click="openAuthModal"
            class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Войти в систему
          </button>

          <!-- Кнопка выхода -->
          <button
            v-if="isAuthenticated"
            @click="logout"
            class="p-2 text-white/70 hover:text-red-300 transition-colors rounded-lg hover:bg-white/10"
            title="Выйти"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const currentTime = ref('')

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const openAuthModal = () => authStore.openAuthModal()
const logout = () => authStore.logout()

// Обновление времени в реальном времени
let timeInterval

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>