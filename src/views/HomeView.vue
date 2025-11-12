<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Приветствие и быстрые метрики -->
    <section class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-2">
        <h1 class="text-3xl font-bold text-white mb-2">Добро пожаловать в Ситуационный центр</h1>
        <p class="text-blue-200 text-lg">Курская область • {{ currentDate }}</p>
      </div>
      
      <!-- Быстрые метрики -->
      <div class="glass rounded-2xl p-6 border border-white/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-200 text-sm">Онлайн пользователей</p>
            <p class="text-white text-2xl font-bold">24</p>
          </div>
          <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="glass rounded-2xl p-6 border border-white/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-200 text-sm">Активных задач</p>
            <p class="text-white text-2xl font-bold">8</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Основные разделы -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link 
        v-for="section in quickSections" 
        :key="section.name"
        :to="section.path"
        class="glass rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 group cursor-pointer"
      >
        <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {{ section.icon }}
        </div>
        <h3 class="text-white font-bold text-xl mb-2 group-hover:text-blue-200 transition-colors">
          {{ section.name }}
        </h3>
        <p class="text-blue-200 text-sm">
          {{ section.description }}
        </p>
        <div class="mt-4 flex items-center text-blue-300 text-sm font-semibold">
          <span>Перейти</span>
          <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </router-link>
    </section>

    <!-- Последние новости -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white">Последние новости и события</h2>
        <router-link to="/situation" class="text-blue-300 hover:text-white text-sm font-semibold transition-colors flex items-center space-x-1">
          <span>Все новости</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard
          v-for="news in latestNews"
          :key="news.id"
          :news="news"
        />
      </div>
    </section>

    <!-- Системный статус -->
    <section class="glass rounded-2xl p-6 border border-white/20">
      <h2 class="text-xl font-bold text-white mb-4">Статус системы</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="service in systemStatus" :key="service.name" class="text-center">
          <div class="w-16 h-16 mx-auto mb-2 rounded-2xl flex items-center justify-center" :class="service.statusClass">
            <span class="text-2xl">{{ service.icon }}</span>
          </div>
          <p class="text-white text-sm font-semibold">{{ service.name }}</p>
          <p class="text-blue-200 text-xs">{{ service.status }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NewsCard from '@/components/ui/NewsCard.vue'

const currentDate = ref('')

const quickSections = [
  {
    name: 'Муниципалитеты',
    path: '/municipalities',
    icon: '🏛️',
    description: '28 муниципальных образований региона'
  },
  {
    name: 'Госорганы',
    path: '/government',
    icon: '⚖️',
    description: 'Структура государственной власти'
  },
  {
    name: 'Обстановка',
    path: '/situation',
    icon: '📈',
    description: 'Социально-экономический мониторинг'
  },
  {
    name: 'История',
    path: '/history',
    icon: '📚',
    description: 'Историческая справка региона'
  },
  {
    name: 'Системы',
    path: '/systems',
    icon: '🔗',
    description: 'Информационные системы и сервисы'
  },
  {
    name: 'ГИС Карты',
    path: '/gis',
    icon: '🗺️',
    description: 'Геоинформационная система'
  }
]

const latestNews = [
  {
    id: 1,
    title: 'Заседание правительства области',
    summary: 'Рассмотрены вопросы развития агропромышленного комплекса и социальной поддержки населения',
    date: '2024-01-15',
    category: 'Политика'
  },
  {
    id: 2,
    title: 'Открытие нового медицинского центра',
    summary: 'В Курске открылся современный диагностический центр с передовым оборудованием',
    date: '2024-01-15',
    category: 'Здравоохранение'
  },
  {
    id: 3,
    title: 'Развитие транспортной инфраструктуры',
    summary: 'Начаты работы по реконструкции автодороги Курск-Железногорск',
    date: '2024-01-14',
    category: 'Транспорт'
  }
]

const systemStatus = [
  {
    name: 'База данных',
    status: 'Online',
    icon: '💾',
    statusClass: 'bg-green-500/20 border border-green-500/30'
  },
  {
    name: 'ГИС система',
    status: 'Active',
    icon: '🗺️',
    statusClass: 'bg-green-500/20 border border-green-500/30'
  },
  {
    name: 'API сервисы',
    status: 'Stable',
    icon: '🔌',
    statusClass: 'bg-green-500/20 border border-green-500/30'
  },
  {
    name: 'Безопасность',
    status: 'Protected',
    icon: '🛡️',
    statusClass: 'bg-blue-500/20 border border-blue-500/30'
  }
]

onMounted(() => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
</style>