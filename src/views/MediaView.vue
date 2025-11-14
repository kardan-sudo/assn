<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">
        📺 Мониторинг СМИ
      </h1>
      <p class="text-purple-200 text-lg">
        Анализ медиапространства и социальных сетей региона
      </p>
      <div class="flex items-center space-x-2 mt-2">
        <span class="text-red-400 text-sm">🔒</span>
        <span class="text-red-300 text-sm">Доступ ограничен • Только для администраторов</span>
      </div>
    </div>

    <!-- Навигация по разделам -->
    <div class="glass rounded-2xl p-1 border border-white/20">
      <div class="flex space-x-1">
        <router-link
          v-for="tab in closedTabs"
          :key="tab.path"
          :to="tab.path"
          :class="[
            'flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-center',
            $route.path === tab.path
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-purple-200 hover:text-white hover:bg-white/10'
          ]"
        >
          <div class="flex items-center justify-center space-x-2">
            <span class="text-lg">{{ tab.icon }}</span>
            <span>{{ tab.title }}</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Контент страницы -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white flex items-center space-x-3">
          <span>📺</span>
          <span>Мониторинг СМИ и социальных сетей</span>
        </h2>
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2 bg-blue-500/20 px-3 py-2 rounded-lg">
            <span class="text-blue-300 text-sm">Период:</span>
            <span class="text-white font-semibold">октябрь 2025</span>
          </div>
        </div>
      </div>

      <!-- Ключевые метрики -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="glass rounded-xl p-4 text-center border border-blue-400/30 bg-blue-500/10">
          <div class="text-2xl font-bold text-white mb-1">1,248</div>
          <div class="text-blue-200 text-xs">Публикаций</div>
          <div class="text-blue-300 text-xs mt-1">в СМИ</div>
        </div>
        <div class="glass rounded-xl p-4 text-center border border-green-400/30 bg-green-500/10">
          <div class="text-2xl font-bold text-white mb-1">856K</div>
          <div class="text-green-200 text-xs">Охват</div>
          <div class="text-green-300 text-xs mt-1">пользователей</div>
        </div>
        <div class="glass rounded-xl p-4 text-center border border-yellow-400/30 bg-yellow-500/10">
          <div class="text-2xl font-bold text-white mb-1">42%</div>
          <div class="text-yellow-200 text-xs">Позитивный тон</div>
          <div class="text-yellow-300 text-xs mt-1">+8% к сентябрю</div>
        </div>
        <div class="glass rounded-xl p-4 text-center border border-red-400/30 bg-red-500/10">
          <div class="text-2xl font-bold text-white mb-1">28</div>
          <div class="text-red-200 text-xs">Критические</div>
          <div class="text-red-300 text-xs mt-1">публикации</div>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Тематические тренды -->
        <div class="glass rounded-2xl p-6 border border-orange-400/30 bg-orange-500/10 lg:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <span class="text-xl">📰</span>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg">Тематические тренды</h3>
              <p class="text-orange-300 text-sm">Распределение тем в региональных СМИ</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="trend in mediaTrends" :key="trend.topic" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 rounded-full" :class="trend.color"></div>
                <span class="text-white text-sm">{{ trend.topic }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-32 bg-gray-600 rounded-full h-2">
                  <div class="h-2 rounded-full" :class="trend.color" :style="{ width: trend.percentage + '%' }"></div>
                </div>
                <span class="text-orange-300 text-sm font-semibold">{{ trend.percentage }}%</span>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-400/20">
            <p class="text-orange-200 text-sm">
              <span class="font-semibold">Вывод:</span> Основной фокус СМИ сместился на социальные темы. 
              Демографическая ситуация и поддержка семей стали доминирующими темами месяца.
            </p>
          </div>
        </div>

        <!-- Тональность упоминаний -->
        <div class="glass rounded-2xl p-6 border border-purple-400/30 bg-purple-500/10">
          <h3 class="text-lg font-bold text-white mb-6 flex items-center space-x-2">
            <span>🎭</span>
            <span>Тональность упоминаний</span>
          </h3>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span class="text-white text-sm">Позитивные</span>
              </div>
              <span class="text-green-300 font-semibold">42%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span class="text-white text-sm">Нейтральные</span>
              </div>
              <span class="text-yellow-300 font-semibold">45%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <span class="text-white text-sm">Негативные</span>
              </div>
              <span class="text-red-300 font-semibold">13%</span>
            </div>
          </div>

          <!-- Круговая диаграмма -->
          <div class="relative w-32 h-32 mx-auto mb-4">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-white font-bold text-lg">42%</div>
                <div class="text-purple-300 text-xs">позитив</div>
              </div>
            </div>
            <svg class="w-full h-full" viewBox="0 0 100 100">
              <!-- Зеленый сегмент -->
              <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" stroke-width="10" 
                      stroke-dasharray="141.37 141.37" stroke-dashoffset="82" transform="rotate(-90 50 50)"/>
              <!-- Желтый сегмент -->
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" stroke-width="10" 
                      stroke-dasharray="141.37 141.37" stroke-dashoffset="141.37" transform="rotate(54 50 50)"/>
              <!-- Красный сегмент -->
              <circle cx="50" cy="50" r="45" fill="none" stroke="#EF4444" stroke-width="10" 
                      stroke-dasharray="141.37 141.37" stroke-dashoffset="177" transform="rotate(216 50 50)"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Критические публикации -->
      <div class="glass rounded-2xl p-6 border border-red-400/30 bg-red-500/10 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <span class="text-xl">⚠️</span>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg">Критические публикации</h3>
              <p class="text-red-300 text-sm">Требуют особого внимания</p>
            </div>
          </div>
          <span class="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-sm font-semibold">
            {{ criticalPublications.length }} публикаций
          </span>
        </div>

        <div class="space-y-4">
          <div v-for="publication in criticalPublications" :key="publication.id" 
               class="flex items-start space-x-4 p-4 bg-red-500/5 rounded-xl border border-red-400/20">
            <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-lg">{{ publication.platform === 'vk' ? '👥' : '📱' }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-white font-semibold">{{ publication.title }}</h4>
                <span class="text-red-300 text-xs bg-red-500/20 px-2 py-1 rounded">{{ publication.platform.toUpperCase() }}</span>
              </div>
              <p class="text-red-200 text-sm mb-2">{{ publication.content }}</p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-red-300">Автор: {{ publication.author }}</span>
                <span class="text-red-300">Охват: {{ publication.reach }}</span>
                <span class="text-red-300">Лайки: {{ publication.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Позитивный отклик -->
      <div class="glass rounded-2xl p-6 border border-green-400/30 bg-green-500/10">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
            <span class="text-xl">👍</span>
          </div>
          <div>
            <h3 class="text-white font-bold text-lg">Позитивный отклик</h3>
            <p class="text-green-300 text-sm">Наиболее успешные публикации</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="positive in positiveFeedback" :key="positive.id" 
               class="p-4 bg-green-500/5 rounded-xl border border-green-400/20">
            <h4 class="text-white font-semibold mb-2">{{ positive.title }}</h4>
            <p class="text-green-200 text-sm mb-3">{{ positive.description }}</p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-green-300">Охват: {{ positive.reach }}</span>
              <span class="text-green-300">Вовлеченность: {{ positive.engagement }}%</span>
              <span class="text-green-300 font-semibold">+{{ positive.sentiment }}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Аналитика социальных сетей -->
    <section class="glass rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center space-x-3">
        <span>📱</span>
        <span>Аналитика социальных сетей</span>
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
          <div class="text-2xl font-bold text-white mb-1">245K</div>
          <div class="text-blue-200 text-xs">ВКонтакте</div>
          <div class="text-blue-300 text-xs mt-1">охват</div>
        </div>
        <div class="text-center p-4 bg-green-500/10 rounded-xl border border-green-400/30">
          <div class="text-2xl font-bold text-white mb-1">128K</div>
          <div class="text-green-200 text-xs">Telegram</div>
          <div class="text-green-300 text-xs mt-1">подписчики</div>
        </div>
        <div class="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
          <div class="text-2xl font-bold text-white mb-1">86K</div>
          <div class="text-yellow-200 text-xs">Одноклассники</div>
          <div class="text-yellow-300 text-xs mt-1">активность</div>
        </div>
        <div class="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
          <div class="text-2xl font-bold text-white mb-1">15.8%</div>
          <div class="text-purple-200 text-xs">Общий рост</div>
          <div class="text-purple-300 text-xs mt-1">за месяц</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const closedTabs = [
  { path: '/situation/closed/reports', title: 'Аналитические отчеты', icon: '📊' },
  { path: '/situation/closed/statistics', title: 'Статистика', icon: '📋' },
  { path: '/situation/closed/media', title: 'Мониторинг СМИ', icon: '📺' }
]

const mediaTrends = [
  { topic: 'Демографическая ситуация', percentage: 35, color: 'bg-blue-400' },
  { topic: 'Дорожная инфраструктура', percentage: 28, color: 'bg-green-400' },
  { topic: 'Поддержка бизнеса', percentage: 22, color: 'bg-yellow-400' },
  { topic: 'Здравоохранение', percentage: 15, color: 'bg-red-400' }
]

const criticalPublications = [
  {
    id: 1,
    title: 'Проблемы с дорогами в центре города',
    content: 'Жители жалуются на качество дорожного покрытия после недавнего ремонта...',
    platform: 'vk',
    author: 'Иван Петров',
    reach: '15,200',
    likes: 342
  },
  {
    id: 2,
    title: 'Очереди в поликлиниках',
    content: 'Пациенты не могут попасть к специалистам, очереди растягиваются на месяцы...',
    platform: 'telegram',
    author: 'Мария Сидорова',
    reach: '8,700',
    likes: 189
  },
  {
    id: 3,
    title: 'Вопросы к программе реновации',
    content: 'Горожане выражают обеспокоенность по поводу сроков реализации программы...',
    platform: 'vk',
    author: 'Алексей Козлов',
    reach: '12,500',
    likes: 267
  }
]

const positiveFeedback = [
  {
    id: 1,
    title: 'Программа поддержки молодых семей',
    description: 'Публикации о новых мерах поддержки получили высокий позитивный отклик',
    reach: '250,000+',
    engagement: 15.8,
    sentiment: 85
  },
  {
    id: 2,
    title: 'Открытие IT-кластера',
    description: 'Новость о создании новых рабочих мест в IT-сфере',
    reach: '180,000+',
    engagement: 12.3,
    sentiment: 78
  },
  {
    id: 3,
    title: 'Рекордный урожай',
    description: 'Информация о достижениях сельского хозяйства региона',
    reach: '120,000+',
    engagement: 8.9,
    sentiment: 82
  },
  {
    id: 4,
    title: 'Модернизация здравоохранения',
    description: 'Открытие новых ФАПов в сельской местности',
    reach: '95,000+',
    engagement: 7.4,
    sentiment: 76
  }
]
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