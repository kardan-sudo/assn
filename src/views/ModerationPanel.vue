<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Заголовок -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Панель модерации комментариев</h1>
        <p class="text-blue-200">Управление комментариями пользователей</p>
      </div>

      <!-- Статистика -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gray-800/50 rounded-xl p-6 border border-white/10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Всего комментариев</p>
              <p class="text-2xl font-bold text-white">{{ commentStats.total }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Ожидают модерации</p>
              <p class="text-2xl font-bold text-yellow-400">{{ commentStats.pending }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 rounded-xl p-6 border border-green-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Одобрено</p>
              <p class="text-2xl font-bold text-green-400">{{ commentStats.approved }}</p>
            </div>
            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gray-800/50 rounded-xl p-6 border border-red-500/20">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">Отклонено</p>
              <p class="text-2xl font-bold text-red-400">{{ commentStats.rejected }}</p>
            </div>
            <div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Вкладки -->
      <div class="mb-6">
        <div class="flex space-x-1 bg-gray-800 rounded-xl p-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300',
              activeTab === tab.id
                ? tab.activeClass
                : 'text-gray-400 hover:text-white'
            ]"
          >
            <span class="flex items-center justify-center space-x-2">
              <span>{{ tab.icon }}</span>
              <span>{{ tab.name }}</span>
              <span v-if="tab.badge" class="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                {{ tab.badge }}
              </span>
            </span>
          </button>
        </div>
      </div>

      <!-- Контент вкладок -->
      <div class="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
        <!-- Ожидающие модерации -->
        <div v-if="activeTab === 'pending'" class="p-6">
          <div v-if="pendingComments.length > 0" class="space-y-4">
            <div
              v-for="comment in pendingComments"
              :key="comment.id"
              class="bg-gray-700/30 rounded-xl p-6 border border-yellow-500/20"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ comment.userName.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <p class="text-white font-semibold">{{ comment.userName }}</p>
                    <p class="text-gray-400 text-sm">{{ formatCommentDate(comment.createdAt) }}</p>
                    <p class="text-yellow-400 text-xs mt-1 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Ожидает модерации
                    </p>
                  </div>
                </div>
                <div class="text-gray-400 text-sm">
                  ID: {{ comment.id }}
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-400 text-sm mb-2">Текст комментария:</label>
                <textarea
                  v-model="commentEdits[comment.id]"
                  :ref="el => { if (el) textareas[comment.id] = el }"
                  class="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows="3"
                  :maxlength="500"
                ></textarea>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-gray-400 text-xs">
                    {{ commentEdits[comment.id]?.length || comment.text.length }}/500 символов
                  </span>
                  <button
                    v-if="commentEdits[comment.id] !== comment.text"
                    @click="resetCommentEdit(comment.id)"
                    class="text-gray-400 hover:text-white text-xs flex items-center space-x-1"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span>Отменить</span>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-sm">
                  <span class="text-gray-400">Новость ID:</span>
                  <span class="text-blue-400 font-mono">{{ comment.newsId }}</span>
                </div>

                <div class="flex items-center space-x-3">
                  <button
                    @click="rejectComment(comment.id)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span>Отклонить</span>
                  </button>

                  <button
                    @click="approveComment(comment.id)"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Одобрить</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-white font-semibold text-xl mb-2">Нет комментариев для модерации</h3>
            <p class="text-gray-400">Все комментарии обработаны</p>
          </div>
        </div>

        <!-- Одобренные комментарии -->
        <div v-if="activeTab === 'approved'" class="p-6">
          <div v-if="approvedComments.length > 0" class="space-y-4">
            <div
              v-for="comment in approvedComments"
              :key="comment.id"
              class="bg-gray-700/30 rounded-xl p-6 border border-green-500/20"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ comment.userName.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <p class="text-white font-semibold">{{ comment.userName }}</p>
                    <p class="text-gray-400 text-sm">{{ formatCommentDate(comment.createdAt) }}</p>
                    <p class="text-green-400 text-xs mt-1 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Одобрено
                    </p>
                  </div>
                </div>
                <div class="text-gray-400 text-sm">
                  ID: {{ comment.id }}
                </div>
              </div>

              <p class="text-gray-200 text-sm leading-relaxed mb-4">{{ comment.text }}</p>

              <div class="flex items-center justify-between text-sm text-gray-400">
                <div>
                  <span>Новость ID: {{ comment.newsId }}</span>
                  <span v-if="comment.moderatedAt" class="ml-4">
                    Модерация: {{ formatCommentDate(comment.moderatedAt) }}
                  </span>
                </div>
                <button
                  @click="deleteComment(comment.id)"
                  class="text-red-400 hover:text-red-300 flex items-center space-x-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span>Удалить</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <h3 class="text-white font-semibold text-xl mb-2">Нет одобренных комментариев</h3>
            <p class="text-gray-400">Здесь появятся одобренные комментарии</p>
          </div>
        </div>

        <!-- Отклоненные комментарии -->
        <div v-if="activeTab === 'rejected'" class="p-6">
          <div v-if="rejectedComments.length > 0" class="space-y-4">
            <div
              v-for="comment in rejectedComments"
              :key="comment.id"
              class="bg-gray-700/30 rounded-xl p-6 border border-red-500/20"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ comment.userName.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <p class="text-white font-semibold">{{ comment.userName }}</p>
                    <p class="text-gray-400 text-sm">{{ formatCommentDate(comment.createdAt) }}</p>
                    <p class="text-red-400 text-xs mt-1 flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Отклонено
                    </p>
                  </div>
                </div>
                <div class="text-gray-400 text-sm">
                  ID: {{ comment.id }}
                </div>
              </div>

              <p class="text-gray-200 text-sm leading-relaxed mb-4">{{ comment.text }}</p>

              <div class="flex items-center justify-between text-sm text-gray-400">
                <div>
                  <span>Новость ID: {{ comment.newsId }}</span>
                  <span v-if="comment.moderationReason" class="ml-4 text-red-400">
                    Причина: {{ comment.moderationReason }}
                  </span>
                </div>
                <button
                  @click="deleteComment(comment.id)"
                  class="text-red-400 hover:text-red-300 flex items-center space-x-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span>Удалить</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <h3 class="text-white font-semibold text-xl mb-2">Нет отклоненных комментариев</h3>
            <p class="text-gray-400">Здесь появятся отклоненные комментарии</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const activeTab = ref('pending')
const commentEdits = ref({})
const textareas = ref({})

const tabs = computed(() => [
  {
    id: 'pending',
    name: 'Ожидающие',
    icon: '⏳',
    badge: authStore.pendingModerationCount,
    activeClass: 'bg-yellow-500 text-white shadow-lg'
  },
  {
    id: 'approved',
    name: 'Одобренные',
    icon: '✅',
    badge: null,
    activeClass: 'bg-green-500 text-white shadow-lg'
  },
  {
    id: 'rejected',
    name: 'Отклоненные',
    icon: '❌',
    badge: null,
    activeClass: 'bg-red-500 text-white shadow-lg'
  }
])

const commentStats = computed(() => authStore.getCommentStats())
const pendingComments = computed(() => authStore.getPendingComments())
const approvedComments = computed(() => authStore.getApprovedComments())
const rejectedComments = computed(() => authStore.getRejectedComments())

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
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const approveComment = async (commentId) => {
  const editedText = commentEdits.value[commentId]
  const result = authStore.moderateComment(commentId, 'approve', 'Комментарий соответствует правилам', editedText)
  
  if (result.success) {
    delete commentEdits.value[commentId]
    // Можно добавить уведомление об успехе
  } else {
    // Обработка ошибки
    console.error(result.error)
  }
}

const rejectComment = async (commentId) => {
  const reason = prompt('Введите причину отклонения комментария:', 'Нарушение правил сообщества')
  if (reason === null) return // Пользователь отменил

  const result = authStore.moderateComment(commentId, 'reject', reason)
  
  if (result.success) {
    delete commentEdits.value[commentId]
    // Можно добавить уведомление об успехе
  } else {
    // Обработка ошибки
    console.error(result.error)
  }
}

const deleteComment = async (commentId) => {
  if (!confirm('Вы уверены, что хотите удалить этот комментарий?')) return

  const result = authStore.deleteComment(commentId)
  
  if (result.success) {
    // Можно добавить уведомление об успехе
  } else {
    // Обработка ошибки
    console.error(result.error)
  }
}

const resetCommentEdit = (commentId) => {
  commentEdits.value[commentId] = pendingComments.value.find(c => c.id === commentId)?.text || ''
}

// Инициализируем редактирование комментариев
onMounted(() => {
  pendingComments.value.forEach(comment => {
    commentEdits.value[comment.id] = comment.text
  })
})
</script>