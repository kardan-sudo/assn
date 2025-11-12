// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const showAuthModal = ref(false)

  // Предопределенные пользователи
  const predefinedUsers = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Администратор Системы' },
    { id: 2, username: 'user', password: 'user123', role: 'user', name: 'Иванов И.И.' },
    { id: 3, username: 'analyst', password: 'analyst123', role: 'user', name: 'Петрова А.С.' }
  ]

  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || 'guest')

  const login = (username, password) => {
    const foundUser = predefinedUsers.find(u => 
      u.username === username && u.password === password
    )
    
    if (foundUser) {
      user.value = foundUser
      localStorage.setItem('user', JSON.stringify(foundUser))
      showAuthModal.value = false
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const openAuthModal = () => {
    showAuthModal.value = true
  }

  const closeAuthModal = () => {
    showAuthModal.value = false
  }

  const hasAccess = (requiredRole) => {
    const roles = { 'guest': 0, 'user': 1, 'admin': 2 }
    return roles[userRole.value] >= roles[requiredRole]
  }

  return {
    user,
    showAuthModal,
    isAuthenticated,
    userRole,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    hasAccess
  }
})