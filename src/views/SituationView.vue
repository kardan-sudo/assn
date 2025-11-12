<template>
  <div class="space-y-8">
    <!-- Открытый раздел -->
    <section>
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Обстановка в Курской области</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-semibold text-blue-800 mb-4">Обзор СМИ</h2>
        <div class="space-y-4">
          <div
            v-for="item in mediaReview"
            :key="item.id"
            class="border-l-4 border-blue-500 pl-4 py-2"
          >
            <h3 class="font-semibold text-lg">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.content }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-500">{{ item.source }}</span>
              <span class="text-sm text-blue-600">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Закрытый раздел для авторизованных -->
      <div v-if="isAuthenticated" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-green-800 mb-4">Аналитические материалы</h2>
        <div class="space-y-4">
          <div
            v-for="report in analyticalReports"
            :key="report.id"
            class="border border-green-200 rounded-lg p-4"
          >
            <h3 class="font-semibold text-lg text-green-800">{{ report.title }}</h3>
            <p class="text-gray-600 mt-2">{{ report.summary }}</p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-sm text-gray-500">{{ report.date }}</span>
              <button class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                Скачать PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p class="text-yellow-800">
          Для доступа к аналитическим материалам требуется авторизация
        </p>
        <button 
          @click="openAuthModal"
          class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Войти в систему
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const openAuthModal = () => authStore.openAuthModal()

const mediaReview = [
  {
    id: 1,
    title: 'Развитие сельского хозяйства в регионе',
    content: 'Курская область демонстрирует устойчивый рост в агропромышленном комплексе...',
    source: 'Курские известия',
    date: '15.01.2024'
  },
  {
    id: 2,
    title: 'Социальная поддержка населения',
    content: 'В области расширены меры поддержки многодетных семей и ветеранов...',
    source: 'Курский вестник',
    date: '14.01.2024'
  }
]

const analyticalReports = [
  {
    id: 1,
    title: 'Анализ социально-экономического развития за 2023 год',
    summary: 'Комплексный анализ основных показателей развития региона...',
    date: '10.01.2024'
  },
  {
    id: 2,
    title: 'Прогноз развития промышленности на 2024 год',
    summary: 'Прогнозные показатели и перспективы промышленного роста...',
    date: '05.01.2024'
  }
]
</script>