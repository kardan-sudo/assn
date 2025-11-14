<template>
  <transition name="fade">
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="close">
      <transition name="slide">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md overflow-hidden">
          <!-- Заголовок -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white">
                  {{ authMode === 'login' ? 'Авторизация' : 'Регистрация' }}
                </h2>
                <p class="text-blue-100 text-sm mt-1">
                  {{ authMode === 'login' ? 'Доступ к ситуационному центру' : 'Создание новой учетной записи' }}
                </p>
              </div>
              <button @click="close" class="text-white/80 hover:text-white transition-colors p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Форма -->
          <div class="p-6">
            <!-- Переключение между логином и регистрацией -->
            <div class="flex bg-gray-800 rounded-lg p-1 mb-6">
              <button
                @click="switchMode('login')"
                :class="[
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300',
                  authMode === 'login'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                ]"
              >
                Вход
              </button>
              <button
                @click="switchMode('register')"
                :class="[
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300',
                  authMode === 'register'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                ]"
              >
                Регистрация
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Поле имени (только для регистрации) -->
              <div v-if="authMode === 'register'">
                <label class="block text-sm font-medium text-gray-300 mb-2">ФИО</label>
                <div class="relative">
                  <input
                    v-model="formData.name"
                    type="text"
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Введите ваше полное имя"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Поле email (только для регистрации) -->
              <div v-if="authMode === 'register'">
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div class="relative">
                  <input
                    v-model="formData.email"
                    type="email"
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Введите ваш email"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Поле логина -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Логин</label>
                <div class="relative">
                  <input
                    v-model="formData.username"
                    type="text"
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    :placeholder="authMode === 'login' ? 'Введите ваш логин' : 'Придумайте логин'"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Поле пароля -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
                <div class="relative">
                  <input
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    :placeholder="authMode === 'login' ? 'Введите ваш пароль' : 'Придумайте пароль'"
                    required
                    :minlength="authMode === 'register' ? 6 : 1"
                  >
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-400"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  </button>
                </div>
                <p v-if="authMode === 'register'" class="text-xs text-gray-500 mt-1">
                  Пароль должен содержать не менее 6 символов
                </p>
              </div>

              <!-- Подтверждение пароля (только для регистрации) -->
              <div v-if="authMode === 'register'">
                <label class="block text-sm font-medium text-gray-300 mb-2">Подтверждение пароля</label>
                <div class="relative">
                  <input
                    v-model="formData.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Повторите пароль"
                    required
                  >
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-400"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Ошибка -->
              <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p class="text-red-300 text-sm flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ error }}
                </p>
              </div>

              <!-- Успешная регистрация -->
              <div v-if="success" class="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <p class="text-green-300 text-sm flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Регистрация прошла успешно! Вы автоматически вошли в систему.
                </p>
              </div>

              <!-- Кнопка отправки -->
              <button
                type="submit"
                :disabled="loading"
                :class="[
                  'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed',
                  authMode === 'login' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                ]"
              >
                <span v-if="!loading">
                  {{ authMode === 'login' ? 'Войти в систему' : 'Зарегистрироваться' }}
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ authMode === 'login' ? 'Авторизация...' : 'Регистрация...' }}
                </span>
              </button>
            </form>

            <!-- Тестовые доступы (только для логина) -->
            <div v-if="authMode === 'login'" class="mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 class="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Тестовые доступы:
              </h3>
              <div class="space-y-2 text-xs">
                <div class="flex justify-between text-gray-400">
                  <span>Администратор:</span>
                  <span class="text-blue-300 font-mono">admin / admin123</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>Пользователь:</span>
                  <span class="text-green-300 font-mono">user / user123</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>Аналитик:</span>
                  <span class="text-purple-300 font-mono">analyst / analyst123</span>
                </div>
              </div>
            </div>

            <!-- Информация о регистрации -->
            <div v-if="authMode === 'register'" class="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 class="text-sm font-semibold text-blue-300 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                О регистрации:
              </h3>
              <p class="text-blue-200 text-xs">
                После регистрации вы получите роль <strong>Пользователь</strong> с доступом к основным функциям системы.
                Для получения прав администратора обратитесь к системному администратору.
              </p>
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

const authStore = useAuthStore()

const formData = ref({
  name: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})
const error = ref('')
const success = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const authMode = computed(() => authStore.authMode)

const switchMode = (mode) => {
  authStore.switchAuthMode(mode)
  resetForm()
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  // Валидация для регистрации
  if (authMode.value === 'register') {
    if (formData.value.password.length < 6) {
      error.value = 'Пароль должен содержать не менее 6 символов'
      loading.value = false
      return
    }

    if (formData.value.password !== formData.value.confirmPassword) {
      error.value = 'Пароли не совпадают'
      loading.value = false
      return
    }
  }

  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (authMode.value === 'login') {
    // Логин
    if (authStore.login(formData.value.username, formData.value.password)) {
      error.value = ''
    } else {
      error.value = 'Неверный логин или пароль'
    }
  } else {
    // Регистрация
    const result = authStore.register({
      name: formData.value.name,
      email: formData.value.email,
      username: formData.value.username,
      password: formData.value.password
    })

    if (result.success) {
      success.value = true
      error.value = ''
      // Автоматически закрываем модалку через 2 секунды
      setTimeout(() => {
        close()
      }, 2000)
    } else {
      error.value = result.error
    }
  }

  loading.value = false
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
  error.value = ''
  success.value = false
  showPassword.value = false
  showConfirmPassword.value = false
}

const close = () => {
  authStore.closeAuthModal()
  resetForm()
}

// Следим за изменением режима авторизации
watch(authMode, resetForm)
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
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>