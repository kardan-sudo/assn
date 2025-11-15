<template>
  <transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      @click.self="close"
    >
      <transition name="slide">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden">
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

              <!-- Раздел комментариев -->
              <div class="border-t border-white/10 pt-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-bold text-white flex items-center">
                    <svg class="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Комментарии
                    <span class="ml-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                      {{ approvedComments.length }}
                    </span>
                  </h3>
                  
                </div>

                <!-- Форма добавления комментария -->
                <div v-if="isAuthenticated" class="mb-6">
                  <div class="bg-gray-800/50 rounded-xl p-4 border border-white/10">
                    <h4 class="text-white font-semibold mb-3 flex items-center">
                      <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                      Добавить комментарий
                    </h4>
                    <textarea
                      v-model="newCommentText"
                      placeholder="Введите ваш комментарий..."
                      rows="3"
                      class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      :maxlength="500"
                    ></textarea>
                    <div class="flex justify-between items-center mt-3">
                      <span class="text-gray-400 text-sm">
                        {{ newCommentText.length }}/500 символов
                      </span>
                      <button
                        @click="addComment"
                        :disabled="!newCommentText.trim() || addingComment"
                        class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <svg v-if="addingComment" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{{ addingComment ? 'Отправка...' : 'Отправить' }}</span>
                      </button>
                    </div>
                    <p v-if="isAuthenticated && !isAdmin" class="text-yellow-400 text-xs mt-2 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                      </svg>
                      Ваш комментарий будет отправлен на модерацию
                    </p>
                  </div>
                </div>

                <!-- Сообщение для неавторизованных пользователей -->
                <div v-else class="mb-6 bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <p class="text-blue-200 text-sm flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Для добавления комментария необходимо 
                    <button @click="openAuthModal" class="text-white font-semibold underline ml-1 hover:text-blue-300">
                      войти в систему
                    </button>
                  </p>
                </div>

                <!-- Список комментариев -->
                <div v-if="approvedComments.length > 0" class="space-y-4">
                  <div
                    v-for="comment in approvedComments"
                    :key="comment.id"
                    class="bg-gray-800/30 rounded-xl p-4 border border-white/10"
                  >
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {{ comment.userName.split(' ').map(n => n[0]).join('') }}
                        </div>
                        <div>
                          <p class="text-white font-semibold text-sm">{{ comment.userName }}</p>
                          <p class="text-gray-400 text-xs">{{ formatCommentDate(comment.createdAt) }}</p>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-200 text-sm leading-relaxed">{{ comment.text }}</p>
                    
                    <!-- Информация о модерации -->
                    <div v-if="isAdmin && comment.moderatedBy" class="mt-2 pt-2 border-t border-white/10">
                      <p class="text-gray-400 text-xs">
                        Модерация: {{ formatCommentDate(comment.moderatedAt) }}
                        <span v-if="comment.moderationReason" class="ml-2 text-blue-400">
                          ({{ comment.moderationReason }})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Сообщение если нет комментариев -->
                <div v-else class="text-center py-8">
                  <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h4 class="text-white font-semibold text-lg mb-2">Пока нет комментариев</h4>
                  <p class="text-gray-400 text-sm">
                    {{ isAuthenticated ? 'Будьте первым, кто оставит комментарий!' : 'Авторизуйтесь, чтобы оставить комментарий' }}
                  </p>
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
                
                <!-- Кнопка модерации для администратора -->
                <button 
                  v-if="isAdmin && pendingComments.length > 0"
                  @click="openModeration"
                  class="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span>Модерация ({{ pendingComments.length }})</span>
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
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

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

const emit = defineEmits(['close', 'openModeration'])

const authStore = useAuthStore()
const newCommentText = ref('')
const addingComment = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const approvedComments = computed(() => authStore.getCommentsForNews(props.news?.id))
const pendingComments = computed(() => authStore.getPendingComments().filter(comment => comment.newsId === props.news?.id))

const close = () => {
  emit('close')
}

const openModeration = () => {
  emit('openModeration')
}

const openAuthModal = () => {
  authStore.openAuthModal('login')
  close()
}

const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatCommentDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'только что'
  if (diffMins < 60) return `${diffMins} мин. назад`
  if (diffHours < 24) return `${diffHours} ч. назад`
  if (diffDays < 7) return `${diffDays} дн. назад`
  
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const addComment = async () => {
  if (!newCommentText.value.trim()) return

  addingComment.value = true
  const result = authStore.addComment(props.news.id, newCommentText.value)
  
  if (result.success) {
    newCommentText.value = ''
    // Можно добавить уведомление об успешной отправке
  } else {
    // Обработка ошибки
    console.error(result.error)
  }
  
  addingComment.value = false
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

// Сбрасываем форму при открытии/закрытии модалки
watch(() => props.show, (newVal) => {
  if (!newVal) {
    newCommentText.value = ''
    addingComment.value = false
  }
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