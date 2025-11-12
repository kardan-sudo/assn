<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
    <!-- Preloader -->
    <div v-if="loading" class="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg font-semibold">Загрузка ситуационного центра...</p>
      </div>
    </div>

    <!-- Main App -->
    <div v-else class="min-h-screen flex flex-col">
      <AppHeader />
      
      <div class="flex flex-1">
        <!-- Показываем навигацию для всех, но разную -->
        <NavigationSidebar v-if="isAuthenticated" />
        <GuestNavigation v-else />
        
        <main class="flex-1 p-6 transition-all duration-300" :class="{ 'ml-0': !isAuthenticated, 'ml-64': isAuthenticated }">
          <div class="max-w-7xl mx-auto">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
      
      <AppFooter />
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
import GuestNavigation from '@/components/layout/GuestNavigation.vue'
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