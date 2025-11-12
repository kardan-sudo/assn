<template>
  <aside class="w-64 bg-gray-900/80 backdrop-blur-lg border-r border-white/10 min-h-screen">
    <nav class="p-6">
      <!-- Заголовок навигации -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-white mb-2">Навигация</h2>
        <div class="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      </div>

      <!-- Базовое меню для гостей -->
      <ul class="space-y-2">
        <li>
          <router-link 
            to="/" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            active-class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">📊</span>
            </div>
            <span class="font-medium">Главная</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/history" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            active-class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">📚</span>
            </div>
            <span class="font-medium">История</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/municipalities" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            active-class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">🏛️</span>
            </div>
            <span class="font-medium">Муниципалитеты</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/government" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            active-class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">⚖️</span>
            </div>
            <span class="font-medium">Госорганы</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/situation/open" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            active-class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">📰</span>
            </div>
            <span class="font-medium">Обстановка</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/systems" 
            class="flex items-center space-x-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 group hover:bg-white/10 hover:text-white"
            active-class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <span class="text-lg">🔗</span>
            </div>
            <span class="font-medium">Системы</span>
          </router-link>
        </li>
      </ul>

      <!-- Призыв к авторизации -->
      <div class="mt-8 bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
        <h3 class="text-white font-semibold text-sm mb-2">Полный доступ</h3>
        <p class="text-blue-200 text-xs mb-3">
          Войдите в систему для доступа к дополнительным разделам
        </p>
        <button 
          @click="openAuthModal"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-semibold"
        >
          Войти в систему
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const openAuthModal = () => {
  authStore.openAuthModal()
}
</script>