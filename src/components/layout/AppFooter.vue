<template>
  <footer class="bg-gray-900/80 backdrop-blur-lg border-t border-white/10 w-full">
    <div class="container mx-auto px-6 py-3">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <!-- Информация -->
        <div class="text-center md:text-left">
          <p class="text-white text-sm">
            &copy; 2024 Ситуационный центр Губернатора Курской области
          </p>
          <p class="text-gray-400 text-xs mt-1">
            Версия 2.0 | Обновлено: {{ lastUpdate }}
          </p>
        </div>

        <!-- Статус системы -->
        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-300 text-sm">Система активна</span>
          </div>
          <div class="text-gray-400 hidden lg:block text-sm">
            Онлайн: <span class="text-white font-semibold">{{ onlineUsers }}</span>
          </div>
        </div>

        <!-- Быстрые ссылки -->
        <div class="flex items-center space-x-3">
          <button class="text-gray-400 hover:text-white transition-colors text-xs">
            Помощь
          </button>
          <button class="text-gray-400 hover:text-white transition-colors text-xs">
            Документация
          </button>
          <button class="text-gray-400 hover:text-white transition-colors text-xs">
            Контакты
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lastUpdate = ref('')
const onlineUsers = ref(24)

// Имитация изменения количества онлайн пользователей
let usersInterval

onMounted(() => {
  const now = new Date()
  lastUpdate.value = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // Имитация изменения количества пользователей
  usersInterval = setInterval(() => {
    const change = Math.random() > 0.5 ? 1 : -1
    onlineUsers.value = Math.max(20, Math.min(30, onlineUsers.value + change))
  }, 10000)
})

onUnmounted(() => {
  clearInterval(usersInterval)
})
</script>