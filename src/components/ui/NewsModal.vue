<template>
  <transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      @click.self="close"
    >
      <transition name="slide">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <!-- Заголовок модалки -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-white">Детали события</h2>
                <p class="text-blue-100 text-sm mt-1">Полная информация о мероприятии</p>
              </div>
              <button @click="close" class="text-white/80 hover:text-white transition-colors p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Контент новости -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div v-if="news" class="space-y-6">
              <!-- Заголовок и мета-информация -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {{ news.category }}
                  </span>
                  <span class="text-blue-200 text-sm">{{ formatFullDate(news.date) }}</span>
                </div>
                <h1 class="text-2xl font-bold text-white mb-4">{{ news.title }}</h1>
              </div>

              <!-- Детальное описание -->
              <div class="prose prose-invert max-w-none">
                <p class="text-blue-100 text-lg leading-relaxed mb-6">
                  {{ news.fullContent || news.summary }}
                </p>

                <!-- Дополнительная информация -->
                <div v-if="news.details" class="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 class="text-white font-semibold mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Дополнительная информация
                  </h3>
                  <ul class="text-blue-200 text-sm space-y-2">
                    <li v-for="(detail, index) in news.details" :key="index" class="flex items-start">
                      <svg class="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {{ detail }}
                    </li>
                  </ul>
                </div>

                <!-- Статистика и цифры -->
                <div v-if="news.statistics" class="grid grid-cols-2 gap-4 mt-6">
                  <div v-for="(stat, key) in news.statistics" :key="key" class="text-center">
                    <div class="text-2xl font-bold text-white mb-1">{{ stat.value }}</div>
                    <div class="text-blue-200 text-xs">{{ stat.label }}</div>
                  </div>
                </div>

                <!-- Контакты для информации -->
                <div v-if="news.contacts" class="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 mt-6">
                  <h3 class="text-white font-semibold mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Контактная информация
                  </h3>
                  <div class="text-blue-200 text-sm space-y-1">
                    <div v-for="(contact, key) in news.contacts" :key="key" class="flex justify-between">
                      <span class="text-blue-300">{{ contact.label }}:</span>
                      <span class="text-white">{{ contact.value }}</span>
                    </div>
                  </div>
                </div>

                <!-- Дополнительные материалы -->
                <div v-if="news.materials" class="bg-green-500/10 rounded-xl p-4 border border-green-500/20 mt-6">
                  <h3 class="text-white font-semibold mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Дополнительные материалы
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="(material, index) in news.materials" 
                      :key="index"
                      class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2"
                    >
                      <span>{{ material.icon }}</span>
                      <span>{{ material.name }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Действия -->
              <div class="flex items-center justify-between pt-6 border-t border-white/10">
                <button @click="close" class="text-blue-300 hover:text-white transition-colors flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  <span>Назад к списку</span>
                </button>
                
                
              </div>
            </div>

            <!-- Сообщение если новость не загружена -->
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-white font-semibold text-lg mb-2">Информация не найдена</h3>
              <p class="text-blue-200 text-sm">Не удалось загрузить данные о событии</p>
              <button @click="close" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  news: {
    type: Object,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Обработка нажатия клавиши Escape
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.show) {
    close()
  }
}

// Добавляем обработчик клавиши Escape при монтировании
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-20px) scale(0.95);
}

.slide-leave-to {
  transform: translateY(20px) scale(0.95);
}

/* Стили для кастомной полосы прокрутки */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Стили для улучшения читаемости текста */
.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  list-style-type: none;
  padding-left: 0;
}

.prose li {
  margin-bottom: 0.5rem;
}
</style>