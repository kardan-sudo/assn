<template>
  <header class="glass-header">
    <div class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <!-- Логотип и название -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 bg-white">
              <img 
                :src="kurskCoatOfArms" 
                alt="Герб Курской области"
                class="w-10 h-10 object-contain"
              >
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-gray-900 shadow-lg shadow-green-500/50 animate-pulse"></div>
          </div>
          
          <div class="text-white">
            <h1 class="text-xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-purple-300 bg-clip-text text-transparent animate-gradient">
              Ситуационный центр
            </h1>
            <p class="text-sm text-blue-200/90 flex items-center gap-1 mt-0.5">
              <span class="w-1 h-1 bg-blue-400 rounded-full"></span>
              Губернатор Курской области
            </p>
          </div>
        </div>

        <!-- Статус и время -->
        <div class="hidden md:flex items-center space-x-6">
          <div class="text-right text-white bg-white/5 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/10">
            <div class="text-sm opacity-90 flex items-center gap-2">
              <span class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              Курск
            </div>
            <div class="text-xs opacity-70 font-mono mt-1">{{ currentTime }}</div>
          </div>
        </div>

        <!-- Кнопки управления -->
        <div class="flex items-center space-x-2">


          <!-- Профиль пользователя -->
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <div class="text-right text-white hidden sm:block bg-white/5 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/10">
              <div class="font-semibold text-sm">{{ user.name }}</div>
              <div class="text-xs opacity-70 capitalize flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full" :class="user.role === 'admin' ? 'bg-red-400' : 'bg-blue-400'"></span>
                {{ user.role === 'admin' ? 'Администратор' : 'Пользователь' }}
              </div>
            </div>
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white/20 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              :class="user.role === 'admin' 
                ? 'bg-gradient-to-br from-red-400 via-orange-400 to-orange-500 shadow-red-500/25' 
                : 'bg-gradient-to-br from-blue-400 via-purple-400 to-purple-500 shadow-blue-500/25'
              "
            >
              {{ user.name.split(' ').map(n => n[0]).join('') }}
            </div>
          </div>

          <!-- Кнопки входа/регистрации -->
          <div v-else class="flex items-center space-x-3">
            <button
              @click="openRegisterModal"
              class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm shadow-green-500/25 hover:shadow-green-500/40 border border-green-400/20"
            >
              Регистрация
            </button>
            <button
              @click="openLoginModal"
              class="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-400/20"
            >
              Войти
            </button>
          </div>

          <!-- Кнопка выхода -->
          <button
            v-if="isAuthenticated"
            @click="logout"
            class="p-3 text-white/70 hover:text-red-300 transition-all duration-300 rounded-xl hover:bg-red-500/10 group backdrop-blur-sm border border-transparent hover:border-red-500/20"
            title="Выйти"
          >
            <svg class="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import kurskCoatOfArms from '@/assets/images/Coat_of_arms_of_Kursk_Oblast.svg.png'

const authStore = useAuthStore()
const currentTime = ref('')

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const openLoginModal = () => authStore.openAuthModal('login')
const openRegisterModal = () => authStore.openAuthModal('register')
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

<style scoped>
.glass-header {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>