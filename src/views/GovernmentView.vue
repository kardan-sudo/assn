<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Государственные органы Курской области</h1>

      <!-- Навигационные табы -->
      <div class="mb-8 border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="switchTab(tab.id)"
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="activeTab === tab.id 
              ? ['border-' + tab.color + '-500', 'text-' + tab.color + '-600']
              : ['border-transparent', 'text-gray-500 hover:text-gray-700 hover:border-gray-300']
            "
          >
            <div class="flex items-center space-x-2">
              <span class="text-lg">{{ tab.icon }}</span>
              <span>{{ tab.name }}</span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Исполнительная власть -->
      <section v-if="activeTab === 'executive'" class="mb-8">
        <div class="flex items-center mb-6">
          <div class="w-3 h-8 bg-green-500 rounded-full mr-3"></div>
          <h2 class="text-2xl font-semibold text-green-800">Исполнительная власть</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="body in governmentBodies.executive"
            :key="body.name"
            class="border border-green-200 rounded-lg p-6 bg-green-50 hover:bg-green-100 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <h3 class="text-xl font-semibold text-green-800 mb-3">{{ body.name }}</h3>
            <div class="space-y-2">
              <p class="text-gray-700">
                <strong class="text-green-700">Руководитель:</strong> 
                <span class="ml-2">{{ body.head }}</span>
              </p>
              <p class="text-gray-700">
                <strong class="text-green-700">Адрес:</strong> 
                <span class="ml-2">{{ body.address }}</span>
              </p>
              <p class="text-gray-700">
                <strong class="text-green-700">Телефон:</strong> 
                <span class="ml-2">{{ body.phone }}</span>
              </p>
            </div>
            <p class="text-gray-600 text-sm mt-4 leading-relaxed">{{ body.description }}</p>
          </div>
        </div>
      </section>

      <!-- Законодательная власть -->
      <section v-if="activeTab === 'legislative'" class="mb-8">
        <div class="flex items-center mb-6">
          <div class="w-3 h-8 bg-blue-500 rounded-full mr-3"></div>
          <h2 class="text-2xl font-semibold text-blue-800">Законодательная власть</h2>
        </div>
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="body in governmentBodies.legislative"
            :key="body.name"
            class="border border-blue-200 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <h3 class="text-xl font-semibold text-blue-800 mb-3">{{ body.name }}</h3>
            <div class="space-y-2">
              <p class="text-gray-700">
                <strong class="text-blue-700">Руководитель:</strong> 
                <span class="ml-2">{{ body.head }}</span>
              </p>
              <p class="text-gray-700">
                <strong class="text-blue-700">Адрес:</strong> 
                <span class="ml-2">{{ body.address }}</span>
              </p>
              <p class="text-gray-700">
                <strong class="text-blue-700">Телефон:</strong> 
                <span class="ml-2">{{ body.phone }}</span>
              </p>
            </div>
            <p class="text-gray-600 text-sm mt-4 leading-relaxed">{{ body.description }}</p>
          </div>
        </div>
      </section>

      <!-- Судебная власть -->
      <section v-if="activeTab === 'judicial'" class="mb-8">
        <div class="flex items-center mb-6">
          <div class="w-3 h-8 bg-purple-500 rounded-full mr-3"></div>
          <h2 class="text-2xl font-semibold text-purple-800">Судебная власть</h2>
        </div>
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="body in governmentBodies.judicial"
            :key="body.name"
            class="border border-purple-200 rounded-lg p-6 bg-purple-50 hover:bg-purple-100 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <h3 class="text-xl font-semibold text-purple-800 mb-3">{{ body.name }}</h3>
            <div class="space-y-2">
              <p class="text-gray-700">
                <strong class="text-purple-700">Руководитель:</strong> 
                <span class="ml-2">{{ body.head }}</span>
              </p>
              <p class="text-gray-700">
                <strong class="text-purple-700">Адрес:</strong> 
                <span class="ml-2">{{ body.address }}</span>
              </p>
              <p class="text-gray-700">
                <strong class="text-purple-700">Телефон:</strong> 
                <span class="ml-2">{{ body.phone }}</span>
              </p>
            </div>
            <p class="text-gray-600 text-sm mt-4 leading-relaxed">{{ body.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/data'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const activeTab = ref('executive')
const governmentBodies = dataStore.governmentBodies

const tabs = [
  { id: 'executive', name: 'Исполнительная власть', icon: '🏢', color: 'green' },
  { id: 'legislative', name: 'Законодательная власть', icon: '📜', color: 'blue' },
  { id: 'judicial', name: 'Судебная власть', icon: '⚖️', color: 'purple' }
]

const switchTab = (tabId) => {
  activeTab.value = tabId
  router.push(`/government/${tabId}`)
}

// Устанавливаем активную вкладку при загрузке
onMounted(() => {
  if (route.meta.activeTab) {
    activeTab.value = route.meta.activeTab
  }
})
</script>