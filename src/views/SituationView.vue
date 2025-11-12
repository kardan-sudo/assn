<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">
        <span v-if="$route.path.includes('open')">📰 Обстановка - Открытый раздел</span>
        <span v-else>🔒 Обстановка - Закрытый раздел</span>
      </h1>
      <p class="text-blue-200 text-lg">
        <span v-if="$route.path.includes('open')">Обзор событий, СМИ, актуальные проблемы и деятельность ГФИ</span>
        <span v-else>Социально-экономическое и общественно-политическое развитие субъекта РФ</span>
      </p>
    </div>

    <!-- Открытый раздел -->
    <div v-if="$route.path.includes('open')">
      <!-- Обзор событий -->
      <section>
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <span>📅</span>
          <span>Обзор событий</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="news in octoberNews"
            :key="news.id"
            :news="news"
            @open="openNewsModal"
          />
        </div>
      </section>

      <!-- Актуальные проблемы -->
      <section class="mt-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <span>⚠️</span>
          <span>Актуальные проблемы субъекта</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="glass rounded-2xl p-6 border border-red-400/30 bg-red-500/10">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">📉</span>
              </div>
              <h3 class="text-white font-bold text-lg">Демографическая ситуация</h3>
            </div>
            <p class="text-red-200 text-sm mb-4">
              Снижение рождаемости на 8.3% по сравнению с 2024 годом. Естественная убыль населения составляет 6.7 человек на 1000 жителей.
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-red-300">Приоритет: Высокий</span>
              <span class="text-red-300">Статус: В работе</span>
            </div>
          </div>

          <div class="glass rounded-2xl p-6 border border-yellow-400/30 bg-yellow-500/10">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🏭</span>
              </div>
              <h3 class="text-white font-bold text-lg">Промышленный рост</h3>
            </div>
            <p class="text-yellow-200 text-sm mb-4">
              Замедление темпов роста промышленного производства до 2.1%. Необходима модернизация предприятий и привлечение инвестиций.
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-yellow-300">Приоритет: Средний</span>
              <span class="text-yellow-300">Статус: Анализ</span>
            </div>
          </div>

          <div class="glass rounded-2xl p-6 border border-orange-400/30 bg-orange-500/10">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🏥</span>
              </div>
              <h3 class="text-white font-bold text-lg">Здравоохранение</h3>
            </div>
            <p class="text-orange-200 text-sm mb-4">
              Дефицит узких специалистов в районных больницах. Очередь на плановую госпитализацию достигает 3-4 месяцев.
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-orange-300">Приоритет: Высокий</span>
              <span class="text-orange-300">Статус: Планирование</span>
            </div>
          </div>

          <div class="glass rounded-2xl p-6 border border-blue-400/30 bg-blue-500/10">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🛣️</span>
              </div>
              <h3 class="text-white font-bold text-lg">Дорожная инфраструктура</h3>
            </div>
            <p class="text-blue-200 text-sm mb-4">
              42% региональных дорог требуют капитального ремонта. Увеличилось количество ДТП на 12% за последний год.
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-blue-300">Приоритет: Средний</span>
              <span class="text-blue-300">Статус: Финансирование</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Деятельность ГФИ -->
      <section class="mt-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <span>👨‍💼</span>
          <span>Деятельность Главного федерального инспектора</span>
        </h2>
        <div class="glass rounded-2xl p-6 border border-white/20">
          <div class="space-y-6">
            <div 
              v-for="activity in gfiActivities" 
              :key="activity.id"
              class="flex items-start space-x-4 pb-6 border-b border-white/10 last:border-b-0 last:pb-0"
            >
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-xl">📋</span>
              </div>
              <div class="flex-1">
                <h3 class="text-white font-semibold text-lg mb-2">{{ activity.title }}</h3>
                <p class="text-blue-200 text-sm mb-3">{{ activity.description }}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-blue-300">{{ activity.date }}</span>
                  <span class="text-green-300 bg-green-500/20 px-2 py-1 rounded-full">{{ activity.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Закрытый раздел -->
    <div v-else>
      <div v-if="hasAccess">
        <!-- Аналитические отчеты -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <span>📊</span>
            <span>Аналитические отчеты</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="glass rounded-2xl p-6 border border-purple-400/30 bg-purple-500/10">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-xl">💰</span>
                </div>
                <h3 class="text-white font-bold text-lg">Экономические показатели за Q3 2025</h3>
              </div>
              <p class="text-purple-200 text-sm mb-4">
                Детальный анализ ВРП, инвестиционной активности и промышленного производства региона. Включает сравнительный анализ с соседними регионами и прогноз на Q4 2025.
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-purple-300">Конфиденциально</span>
                <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold">
                  Скачать PDF
                </button>
              </div>
            </div>

            <div class="glass rounded-2xl p-6 border border-pink-400/30 bg-pink-500/10">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-xl">👥</span>
                </div>
                <h3 class="text-white font-bold text-lg">Социальная сфера: проблемы и решения</h3>
              </div>
              <p class="text-pink-200 text-sm mb-4">
                Анализ демографической ситуации, здравоохранения, образования и социальной защиты. Рекомендации по оптимизации социальных программ.
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-pink-300">Для служебного пользования</span>
                <button class="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold">
                  Скачать PDF
                </button>
              </div>
            </div>

            <div class="glass rounded-2xl p-6 border border-blue-400/30 bg-blue-500/10">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🏛️</span>
                </div>
                <h3 class="text-white font-bold text-lg">Общественно-политическая обстановка</h3>
              </div>
              <p class="text-blue-200 text-sm mb-4">
                Мониторинг политических процессов, анализ электоральных настроений и оценка социальной стабильности в регионе.
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-blue-300">Секретно</span>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold">
                  Скачать PDF
                </button>
              </div>
            </div>

            <div class="glass rounded-2xl p-6 border border-green-400/30 bg-green-500/10">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-xl">📈</span>
                </div>
                <h3 class="text-white font-bold text-lg">Прогноз развития на 2026 год</h3>
              </div>
              <p class="text-green-200 text-sm mb-4">
                Стратегический прогноз социально-экономического развития Курской области с учетом федеральных трендов и региональных особенностей.
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-green-300">Конфиденциально</span>
                <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold">
                  Скачать PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Статистические данные -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <span>📋</span>
            <span>Статистические данные</span>
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="glass rounded-xl p-4 text-center border border-blue-400/30 bg-blue-500/10">
              <div class="text-2xl font-bold text-white mb-1">+2.3%</div>
              <div class="text-blue-200 text-xs">ВРП рост</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-green-400/30 bg-green-500/10">
              <div class="text-2xl font-bold text-white mb-1">-8.3%</div>
              <div class="text-green-200 text-xs">Рождаемость</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-yellow-400/30 bg-yellow-500/10">
              <div class="text-2xl font-bold text-white mb-1">4.2%</div>
              <div class="text-yellow-200 text-xs">Безработица</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-red-400/30 bg-red-500/10">
              <div class="text-2xl font-bold text-white mb-1">+12%</div>
              <div class="text-red-200 text-xs">Инфляция</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-purple-400/30 bg-purple-500/10">
              <div class="text-2xl font-bold text-white mb-1">15.8%</div>
              <div class="text-purple-200 text-xs">Бюджетный дефицит</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-pink-400/30 bg-pink-500/10">
              <div class="text-2xl font-bold text-white mb-1">-3.7%</div>
              <div class="text-pink-200 text-xs">Миграционный отток</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-indigo-400/30 bg-indigo-500/10">
              <div class="text-2xl font-bold text-white mb-1">+5.1%</div>
              <div class="text-indigo-200 text-xs">Инвестиции</div>
            </div>
            <div class="glass rounded-xl p-4 text-center border border-teal-400/30 bg-teal-500/10">
              <div class="text-2xl font-bold text-white mb-1">87.3%</div>
              <div class="text-teal-200 text-xs">Исполнение бюджета</div>
            </div>
          </div>
        </section>

        <!-- Ключевые показатели -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <span>🎯</span>
            <span>Ключевые показатели развития</span>
          </h2>
          <div class="glass rounded-2xl p-6 border border-white/20">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-white mb-2">63%</div>
                <div class="text-blue-200 text-sm">Уровень цифровизации</div>
                <div class="text-blue-300 text-xs mt-1">+8% с начала года</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white mb-2">42</div>
                <div class="text-green-200 text-sm">Индекс развития</div>
                <div class="text-green-300 text-xs mt-1">место в РФ</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white mb-2">78%</div>
                <div class="text-purple-200 text-sm">Доверие власти</div>
                <div class="text-purple-300 text-xs mt-1">по опросам</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Сообщение о недостаточных правах -->
      <div v-else class="text-center py-12">
        <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-3xl">🔒</span>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Доступ ограничен</h3>
        <p class="text-red-200 mb-6">
          Этот раздел доступен только администраторам системы. 
          Для получения доступа обратитесь к системному администратору.
        </p>
        <router-link 
          to="/situation/open"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          Перейти к открытому разделу
        </router-link>
      </div>
    </div>

    <!-- Модальное окно для новостей -->
    <NewsModal 
      :news="selectedNews"
      :show="showNewsModal"
      @close="closeNewsModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NewsCard from '@/components/ui/NewsCard.vue'
import NewsModal from '@/components/ui/NewsModal.vue'

const route = useRoute()
const authStore = useAuthStore()
const showNewsModal = ref(false)
const selectedNews = ref(null)

const hasAccess = computed(() => {
  return authStore.hasAccess('admin')
})

// Данные одинаковые с главной страницей
const octoberNews = [
  {
    id: 1,
    title: 'Запуск новой программы поддержки молодых семей',
    summary: 'В области стартовала программа "Семейный капитал", направленная на улучшение демографической ситуации и поддержку рождаемости',
    fullContent: 'Программа "Семейный капитал" предусматривает единовременные выплаты при рождении второго и последующих детей, а также дополнительные меры поддержки для молодых семей. Общий объем финансирования программы составляет 2.8 млрд рублей на 2025-2027 годы. Программа включает в себя не только финансовую поддержку, но и комплекс социальных услуг, включая льготное жилье, образовательные программы и медицинское обслуживание.',
    date: '2025-10-28',
    category: 'Социальная политика',
    details: [
      'Единовременная выплата при рождении второго ребенка - 500,000 рублей',
      'При рождении третьего ребенка - 750,000 рублей',
      'Льготная ипотека под 3% годовых',
      'Компенсация 50% расходов на детский сад',
      'Бесплатное медицинское обслуживание для детей до 3 лет',
      'Программы дополнительного образования для родителей'
    ],
    statistics: {
      families: { value: '15,000+', label: 'Семей в программе' },
      budget: { value: '2.8 млрд ₽', label: 'Объем финансирования' },
      period: { value: '2025-2027', label: 'Период действия' }
    },
    contacts: {
      phone: { label: 'Горячая линия', value: '8-800-555-35-35' },
      email: { label: 'Email', value: 'family@kursk-region.ru' },
      address: { label: 'Адрес', value: 'г. Курск, ул. Ленина, 25' }
    }
  },
  {
    id: 2,
    title: 'Открытие IT-кластера в Курске',
    summary: 'В рамках нацпроекта "Цифровая экономика" открыт современный IT-кластер с инвестициями 2.5 млрд рублей',
    fullContent: 'Новый IT-кластер "Курск-Технополис" станет центром развития цифровых технологий в регионе. На площади 15,000 кв.м. разместятся офисы IT-компаний, коворкинг зоны, образовательные центры и исследовательские лаборатории. Кластер оснащен современным оборудованием и высокоскоростным интернетом. Уже заключены партнерские соглашения с ведущими технологическими компаниями страны.',
    date: '2025-10-25',
    category: 'Экономика',
    details: [
      'Общая площадь комплекса - 15,000 кв.м.',
      'Создано 1,200 новых рабочих мест',
      'Партнерство с 8 ведущими IT-вузами',
      'Акселерационная программа для стартапов',
      'Центр подготовки IT-специалистов',
      'Лаборатории искусственного интеллекта и big data'
    ],
    statistics: {
      jobs: { value: '1,200', label: 'Новых рабочих мест' },
      investment: { value: '2.5 млрд ₽', label: 'Объем инвестиций' },
      area: { value: '15,000 м²', label: 'Площадь кластера' }
    },
    contacts: {
      phone: { label: 'Телефон', value: '+7 (4712) 123-456' },
      email: { label: 'Email', value: 'it-cluster@kursk.ru' },
      director: { label: 'Директор', value: 'Иванов А.В.' }
    }
  },
  {
    id: 3,
    title: 'Рекордный урожай зерновых',
    summary: 'Аграрии области собрали 3.2 млн тонн зерновых - лучший показатель за последние 10 лет',
    fullContent: 'По итогам уборочной кампании 2025 года сельхозпроизводители Курской области собрали рекордные 3.2 млн тонн зерновых культур. Урожайность составила 45 ц/га, что на 15% выше средних показателей за последние 5 лет. Особенно высокие результаты показали хозяйства Курского, Щигровского и Льговского районов.',
    date: '2025-10-20',
    category: 'Сельское хозяйство',
    details: [
      'Валовой сбор зерновых - 3.2 млн тонн',
      'Урожайность - 45 ц/га',
      'Площадь уборки - 710,000 га',
      'Экспорт зерна увеличен на 25%',
      'Введены в оборот 12,000 га заброшенных земель'
    ],
    statistics: {
      harvest: { value: '3.2 млн т', label: 'Валовой сбор' },
      productivity: { value: '45 ц/га', label: 'Урожайность' },
      export: { value: '+25%', label: 'Рост экспорта' }
    },
    contacts: {
      phone: { label: 'Отдел сельского хозяйства', value: '+7 (4712) 234-567' },
      email: { label: 'Email', value: 'agriculture@kursk-region.ru' }
    }
  }
]

const gfiActivities = [
  {
    id: 1,
    title: 'Инспекция социальных объектов',
    description: 'Проверка хода строительства детских садов и школ в рамках национальных проектов',
    date: '25.10.2025',
    status: 'Завершено'
  },
  {
    id: 2,
    title: 'Рабочая встреча с предпринимателями',
    description: 'Обсуждение мер поддержки малого и среднего бизнеса в условиях экономических вызовов',
    date: '22.10.2025',
    status: 'В работе'
  },
  {
    id: 3,
    title: 'Мониторинг дорожных работ',
    description: 'Контроль за исполнением федеральной программы "Безопасные качественные дороги"',
    date: '18.10.2025',
    status: 'Завершено'
  },
  {
    id: 4,
    title: 'Координационное совещание по демографии',
    description: 'Обсуждение мер по улучшению демографической ситуации в регионе',
    date: '15.10.2025',
    status: 'Планирование'
  }
]

const openNewsModal = (news) => {
  selectedNews.value = news
  showNewsModal.value = true
}

const closeNewsModal = () => {
  showNewsModal.value = false
  selectedNews.value = null
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