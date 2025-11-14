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

  // Система комментариев
  const comments = ref(JSON.parse(localStorage.getItem('comments')) || [])
  const pendingModerationCount = computed(() => 
    comments.value.filter(comment => comment.status === 'pending').length
  )

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

  // Система комментариев
  const addComment = (newsId, text) => {
    if (!user.value) {
      return { success: false, error: 'Необходимо авторизоваться' }
    }

    const newComment = {
      id: Date.now(),
      newsId: parseInt(newsId),
      userId: user.value.id,
      userName: user.value.name,
      userRole: user.value.role,
      text: text.trim(),
      status: 'pending', // pending, approved, rejected
      createdAt: new Date().toISOString(),
      moderatedAt: null,
      moderatedBy: null,
      moderationReason: null
    }

    comments.value.push(newComment)
    localStorage.setItem('comments', JSON.stringify(comments.value))
    
    return { success: true }
  }

  const getCommentsForNews = (newsId) => {
    return comments.value.filter(comment => 
      comment.newsId === parseInt(newsId) && comment.status === 'approved'
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getPendingComments = () => {
    return comments.value.filter(comment => comment.status === 'pending')
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }

  const getApprovedComments = () => {
    return comments.value.filter(comment => comment.status === 'approved')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getRejectedComments = () => {
    return comments.value.filter(comment => comment.status === 'rejected')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const moderateComment = (commentId, action, reason = '', editedText = null) => {
    const commentIndex = comments.value.findIndex(c => c.id === commentId)
    if (commentIndex === -1) {
      return { success: false, error: 'Комментарий не найден' }
    }

    const comment = comments.value[commentIndex]
    
    if (action === 'approve') {
      comment.status = 'approved'
      comment.moderatedAt = new Date().toISOString()
      comment.moderatedBy = user.value.id
      comment.moderationReason = reason
      if (editedText) {
        comment.text = editedText
        comment.editedBy = user.value.id
        comment.editedAt = new Date().toISOString()
      }
    } else if (action === 'reject') {
      comment.status = 'rejected'
      comment.moderatedAt = new Date().toISOString()
      comment.moderatedBy = user.value.id
      comment.moderationReason = reason
    } else if (action === 'edit') {
      comment.text = editedText
      comment.editedBy = user.value.id
      comment.editedAt = new Date().toISOString()
    }

    localStorage.setItem('comments', JSON.stringify(comments.value))
    return { success: true }
  }

  const deleteComment = (commentId) => {
    const commentIndex = comments.value.findIndex(c => c.id === commentId)
    if (commentIndex === -1) {
      return { success: false, error: 'Комментарий не найден' }
    }

    comments.value.splice(commentIndex, 1)
    localStorage.setItem('comments', JSON.stringify(comments.value))
    return { success: true }
  }

  const getCommentStats = () => {
    const total = comments.value.length
    const pending = comments.value.filter(c => c.status === 'pending').length
    const approved = comments.value.filter(c => c.status === 'approved').length
    const rejected = comments.value.filter(c => c.status === 'rejected').length

    return { total, pending, approved, rejected }
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
    getUserStats,
    // Комментарии
    comments,
    pendingModerationCount,
    addComment,
    getCommentsForNews,
    getPendingComments,
    getApprovedComments,
    getRejectedComments,
    moderateComment,
    deleteComment,
    getCommentStats
  }
})