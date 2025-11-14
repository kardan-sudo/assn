import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const showAuthModal = ref(false)
  const authMode = ref('login') // 'login' или 'register'

  // Предопределенные пользователи
  const predefinedUsers = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Администратор Системы' },
    { id: 2, username: 'user', password: 'user123', role: 'user', name: 'Иванов И.И.' },
    { id: 3, username: 'analyst', password: 'analyst123', role: 'user', name: 'Петрова А.С.' }
  ]

  // Загружаем зарегистрированных пользователей из localStorage
  const registeredUsers = ref(JSON.parse(localStorage.getItem('registeredUsers')) || [])

  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || 'guest')
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = (username, password) => {
    // Ищем в предопределенных пользователях
    let foundUser = predefinedUsers.find(u => 
      u.username === username && u.password === password
    )
    
    // Если не нашли, ищем в зарегистрированных
    if (!foundUser) {
      foundUser = registeredUsers.value.find(u => 
        u.username === username && u.password === password
      )
    }
    
    if (foundUser) {
      user.value = foundUser
      localStorage.setItem('user', JSON.stringify(foundUser))
      showAuthModal.value = false
      return true
    }
    return false
  }

  const register = (userData) => {
    // Проверяем, не занят ли username
    const usernameExists = predefinedUsers.some(u => u.username === userData.username) ||
                          registeredUsers.value.some(u => u.username === userData.username)
    
    if (usernameExists) {
      return { success: false, error: 'Пользователь с таким логином уже существует' }
    }

    // Создаем нового пользователя
    const newUser = {
      id: Date.now(), // Простой ID на основе времени
      username: userData.username,
      password: userData.password,
      role: 'user', // Все новые пользователи получают роль user
      name: userData.name || userData.username,
      email: userData.email || '',
      registeredAt: new Date().toISOString()
    }

    // Добавляем в список зарегистрированных
    registeredUsers.value.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value))

    // Автоматически логиним пользователя после регистрации
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
    showAuthModal.value = false

    return { success: true }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const openAuthModal = (mode = 'login') => {
    authMode.value = mode
    showAuthModal.value = true
  }

  const closeAuthModal = () => {
    showAuthModal.value = false
    authMode.value = 'login'
  }

  const switchAuthMode = (mode) => {
    authMode.value = mode
  }

  // Проверка доступа для разных ролей
  const hasAccess = (requiredRole) => {
    const roles = { 'guest': 0, 'user': 1, 'admin': 2 }
    return roles[userRole.value] >= roles[requiredRole]
  }

  // Проверка является ли пользователь администратором
  const isUserAdmin = () => {
    return user.value?.role === 'admin'
  }

  // Получить статистику пользователей
  const getUserStats = () => {
    return {
      predefined: predefinedUsers.length,
      registered: registeredUsers.value.length,
      total: predefinedUsers.length + registeredUsers.value.length
    }
  }

  return {
    user,
    showAuthModal,
    authMode,
    isAuthenticated,
    userRole,
    isAdmin,
    login,
    register,
    logout,
    openAuthModal,
    closeAuthModal,
    switchAuthMode,
    hasAccess,
    isUserAdmin,
    getUserStats
  }
})