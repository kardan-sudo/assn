<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col">
    <!-- Preloader -->
    <div v-if="loading" class="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg font-semibold">Загрузка ситуационного центра...</p>
      </div>
    </div>

    <!-- Main App -->
    <div v-else class="flex flex-col min-h-screen">
      <AppHeader />
      
      <div class="flex flex-1 min-h-0">
        <NavigationSidebar v-if="isAuthenticated" />
        
        <!-- Основной контент с футером -->
        <div class="flex flex-col flex-1 min-h-0">
          <!-- Прокручиваемый контент -->
          <main class="flex-1 overflow-y-auto p-6" :class="{ 'ml-0': !isAuthenticated, 'ml-64': isAuthenticated }">
            <div class="max-w-7xl mx-auto min-h-full">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </main>
          
          <!-- Футер (всегда виден) -->
          <AppFooter />
        </div>
      </div>
      
      <AuthModal v-if="showAuthModal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import NavigationSidebar from '@/components/layout/NavigationSidebar.vue'
import AuthModal from '@/components/ui/AuthModal.vue'

const authStore = useAuthStore()
const loading = ref(true)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const showAuthModal = computed(() => authStore.showAuthModal)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Фиксируем высоты для правильной работы flex */
.min-h-screen {
  min-height: 100vh;
}

.min-h-0 {
  min-height: 0;
}

/* Кастомная полоса прокрутки */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
</style>