<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">
        👨‍💼 Деятельность ГФИ
      </h1>
      <p class="text-blue-200 text-lg">
        Рабочие визиты, встречи и мероприятия Главного федерального инспектора
      </p>
    </div>

    <!-- Навигация по разделам -->
    <div class="glass rounded-2xl p-1 border border-white/20">
      <div class="flex space-x-1">
        <router-link
          v-for="tab in openTabs"
          :key="tab.path"
          :to="tab.path"
          :class="[
            'flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-center',
            $route.path === tab.path
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-blue-200 hover:text-white hover:bg-white/10'
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
          <span>👨‍💼</span>
          <span>Деятельность Главного федерального инспектора</span>
        </h2>
        <div class="flex items-center space-x-2 bg-blue-500/20 px-3 py-2 rounded-lg">
          <span class="text-blue-300 text-sm">Активность за месяц:</span>
          <span class="text-white font-semibold">{{ gfiActivities.length }} мероприятий</span>
        </div>
      </div>

      <!-- Основная информация о ГФИ -->
      <div class="glass rounded-2xl p-6 border border-white/20 mb-8">
        <div class="flex items-center space-x-6">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span class="text-2xl text-white">👨‍💼</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white mb-2">Иванов Алексей Владимирович</h3>
            <p class="text-blue-200 mb-3">Главный федеральный инспектор по Курской области</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span class="text-blue-300">В должности с:</span>
                <span class="text-white ml-2">2023</span>
              </div>
              <div>
                <span class="text-blue-300">Мероприятий:</span>
                <span class="text-white ml-2">24</span>
              </div>
              <div>
                <span class="text-blue-300">Рабочих визитов:</span>
                <span class="text-white ml-2">12</span>
              </div>
              <div>
                <span class="text-blue-300">Координационных советов:</span>
                <span class="text-white ml-2">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Активности ГФИ -->
      <div class="space-y-6">
        <div 
          v-for="activity in gfiActivities" 
          :key="activity.id"
          class="glass rounded-2xl p-6 border border-white/20 hover:border-blue-400/30 transition-all duration-300"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                   :class="getActivityColor(activity.type).bg">
                <span class="text-xl" :class="getActivityColor(activity.type).text">{{ activity.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-white font-semibold text-lg mb-2">{{ activity.title }}</h3>
                <p class="text-blue-200 text-sm mb-3">{{ activity.description }}</p>
                
                <!-- Детали мероприятия -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
                  <div class="flex items-center space-x-2">
                    <span class="text-blue-300">📍 Место:</span>
                    <span class="text-white">{{ activity.location }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-blue-300">📅 Дата:</span>
                    <span class="text-white">{{ activity.date }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-blue-300">⏱️ Длительность:</span>
                    <span class="text-white">{{ activity.duration }}</span>
                  </div>
                </div>

                <!-- Участники -->
                <div v-if="activity.participants" class="mb-3">
                  <span class="text-blue-300 text-xs">👥 Участники:</span>
                  <span class="text-white text-xs ml-2">{{ activity.participants }}</span>
                </div>

                <!-- Результаты -->
                <div v-if="activity.results" class="bg-green-500/10 border border-green-400/30 rounded-lg p-3">
                  <span class="text-green-300 text-xs font-semibold">✅ Результаты:</span>
                  <p class="text-green-200 text-xs mt-1">{{ activity.results }}</p>
                </div>
              </div>
            </div>
            
            <!-- Статус -->
            <div class="flex flex-col items-end space-y-2">
              <span class="text-xs px-3 py-1 rounded-full font-semibold"
                    :class="getStatusColor(activity.status).class">
                {{ activity.status }}
              </span>
              <span class="text-blue-300 text-xs">{{ activity.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Статистика деятельности -->
    <section class="glass rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-6">📈 Статистика деятельности</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
          <div class="text-2xl font-bold text-white mb-1">{{ activityStats.total }}</div>
          <div class="text-blue-200 text-xs">Всего мероприятий</div>
        </div>
        <div class="text-center p-4 bg-green-500/10 rounded-xl border border-green-400/30">
          <div class="text-2xl font-bold text-white mb-1">{{ activityStats.completed }}</div>
          <div class="text-green-200 text-xs">Завершено</div>
        </div>
        <div class="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
          <div class="text-2xl font-bold text-white mb-1">{{ activityStats.inProgress }}</div>
          <div class="text-yellow-200 text-xs">В работе</div>
        </div>
        <div class="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
          <div class="text-2xl font-bold text-white mb-1">{{ activityStats.planned }}</div>
          <div class="text-purple-200 text-xs">Запланировано</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openTabs = [
  { path: '/situation/open/events', title: 'Обзор событий', icon: '📅' },
  { path: '/situation/open/problems', title: 'Актуальные проблемы', icon: '⚠️' },
  { path: '/situation/open/gfi', title: 'Деятельность ГФИ', icon: '👨‍💼' }
]

const gfiActivities = [
  {
    id: 1,
    title: 'Инспекция социальных объектов',
    description: 'Проверка хода строительства детских садов и школ в рамках национальных проектов. Оценка качества выполненных работ и соответствия проектной документации.',
    type: 'Рабочий визит',
    icon: '🏗️',
    location: 'Курский район, с. Ворошнево',
    date: '25.10.2025',
    duration: '4 часа',
    participants: 'Представители Минстроя, подрядные организации',
    results: 'Выявлены несоответствия в 2 объектах, даны поручения по устранению',
    status: 'Завершено'
  },
  {
    id: 2,
    title: 'Рабочая встреча с предпринимателями',
    description: 'Обсуждение мер поддержки малого и среднего бизнеса в условиях экономических вызовов. Рассмотрение вопросов налогового администрирования и доступности кредитных ресурсов.',
    type: 'Встреча',
    icon: '💼',
    location: 'Бизнес-инкубатор "Курск"',
    date: '22.10.2025',
    duration: '3 часа',
    participants: '35 представителей бизнеса, ТПП, Минэкономразвития',
    results: 'Сформирован перечень проблемных вопросов для решения на федеральном уровне',
    status: 'В работе'
  },
  {
    id: 3,
    title: 'Мониторинг дорожных работ',
    description: 'Контроль за исполнением федеральной программы "Безопасные качественные дороги". Проверка качества дорожного покрытия и соблюдения сроков выполнения работ.',
    type: 'Выездной контроль',
    icon: '🛣️',
    location: 'Автодорога Курск-Белгород, км 25-45',
    date: '18.10.2025',
    duration: '6 часов',
    participants: 'Дорожная служба, подрядчики, ГИБДД',
    results: 'Выданы предписания по устранению дефектов на 3 участках',
    status: 'Завершено'
  },
  {
    id: 4,
    title: 'Координационное совещание по демографии',
    description: 'Обсуждение мер по улучшению демографической ситуации в регионе. Рассмотрение реализации программ поддержки семей и стимулирования рождаемости.',
    type: 'Совещание',
    icon: '📊',
    location: 'Правительство Курской области',
    date: '15.10.2025',
    duration: '2 часа',
    participants: 'Минздрав, Минсоцразвития, Минобразования',
    results: 'Утвержден план мероприятий на 2026 год',
    status: 'Планирование'
  },
  {
    id: 5,
    title: 'Проверка готовности к отопительному сезону',
    description: 'Контроль подготовки объектов ЖКХ к зимнему периоду. Проверка котельных, тепловых сетей и аварийных запасов.',
    type: 'Инспекция',
    icon: '🔥',
    location: 'г. Курск, Железнодорожный район',
    date: '12.10.2025',
    duration: '5 часов',
    participants: 'МинЖКХ, управляющие компании',
    results: 'Выявлены недостатки в 4 котельных, назначены сроки устранения',
    status: 'Завершено'
  },
  {
    id: 6,
    title: 'Встреча с сельхозпроизводителями',
    description: 'Обсуждение результатов уборочной кампании и проблем сельскохозяйственного сектора. Вопросы логистики, хранения и реализации продукции.',
    type: 'Рабочая встреча',
    icon: '🚜',
    location: 'Щигровский район',
    date: '08.10.2025',
    duration: '4 часа',
    participants: '25 сельхозпредприятий, Минсельхоз',
    results: 'Согласованы меры поддержки по сбыту зерновых',
    status: 'В работе'
  }
]

const activityStats = computed(() => {
  return {
    total: gfiActivities.length,
    completed: gfiActivities.filter(a => a.status === 'Завершено').length,
    inProgress: gfiActivities.filter(a => a.status === 'В работе').length,
    planned: gfiActivities.filter(a => a.status === 'Планирование').length
  }
})

const getActivityColor = (type) => {
  const colors = {
    'Рабочий визит': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    'Встреча': { bg: 'bg-green-500/20', text: 'text-green-400' },
    'Выездной контроль': { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    'Совещание': { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    'Инспекция': { bg: 'bg-red-500/20', text: 'text-red-400' }
  }
  return colors[type] || { bg: 'bg-gray-500/20', text: 'text-gray-400' }
}

const getStatusColor = (status) => {
  const colors = {
    'Завершено': { class: 'bg-green-500/20 text-green-300' },
    'В работе': { class: 'bg-yellow-500/20 text-yellow-300' },
    'Планирование': { class: 'bg-blue-500/20 text-blue-300' }
  }
  return colors[status] || { class: 'bg-gray-500/20 text-gray-300' }
}
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