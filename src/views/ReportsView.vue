<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">
        📊 Аналитические отчеты
      </h1>
      <p class="text-purple-200 text-lg">
        Конфиденциальные аналитические материалы и отчеты по развитию региона
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
          <span>📊</span>
          <span>Аналитические отчеты и исследования</span>
        </h2>
        <div class="flex items-center space-x-3">
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
            <span>📥</span>
            <span>Экспорт всех отчетов</span>
          </button>
        </div>
      </div>

      <!-- Фильтры -->
      <div class="glass rounded-2xl p-4 border border-white/20 mb-6">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <span class="text-purple-300 text-sm">Фильтр по типу:</span>
            <select class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
              <option>Все отчеты</option>
              <option>Экономические</option>
              <option>Социальные</option>
              <option>Политические</option>
              <option>Прогнозные</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-purple-300 text-sm">Период:</span>
            <select class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
              <option>2025 год</option>
              <option>2024 год</option>
              <option>2023 год</option>
              <option>Все время</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Экономические показатели -->
        <div class="glass rounded-2xl p-6 border border-purple-400/30 bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">💰</span>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">Экономические показатели за 2025</h3>
                <p class="text-purple-300 text-xs">Обновлено: 25.10.2025</p>
              </div>
            </div>
            <span class="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-xs font-semibold">Конфиденциально</span>
          </div>
          <p class="text-purple-200 text-sm mb-4">
            Детальный анализ ВРП, инвестиционной активности и промышленного производства региона. Включает сравнительный анализ с соседними регионами и прогноз на 2026.
          </p>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center text-xs">
              <span class="text-purple-300">Объем:</span>
              <span class="text-white">45 страниц</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-purple-300">Данные до:</span>
              <span class="text-white">Q3 2025</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-purple-300">Статус:</span>
              <span class="text-green-300">Актуально</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📄</span>
                <span>Просмотр</span>
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📥</span>
                <span>PDF</span>
              </button>
            </div>
            <span class="text-purple-300 text-xs">v2.1</span>
          </div>
        </div>

        <!-- Социальная сфера -->
        <div class="glass rounded-2xl p-6 border border-pink-400/30 bg-pink-500/10 hover:border-pink-400/50 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">👥</span>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">Социальная сфера: проблемы и решения</h3>
                <p class="text-pink-300 text-xs">Обновлено: 20.10.2025</p>
              </div>
            </div>
            <span class="bg-pink-500/30 text-pink-200 px-2 py-1 rounded text-xs font-semibold">ДСП</span>
          </div>
          <p class="text-pink-200 text-sm mb-4">
            Анализ демографической ситуации, здравоохранения, образования и социальной защиты. Рекомендации по оптимизации социальных программ.
          </p>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center text-xs">
              <span class="text-pink-300">Объем:</span>
              <span class="text-white">62 страницы</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-pink-300">Данные до:</span>
              <span class="text-white">Q2 2025</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-pink-300">Статус:</span>
              <span class="text-green-300">Актуально</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button class="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📄</span>
                <span>Просмотр</span>
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📥</span>
                <span>PDF</span>
              </button>
            </div>
            <span class="text-pink-300 text-xs">v1.4</span>
          </div>
        </div>

        <!-- Общественно-политическая обстановка -->
        <div class="glass rounded-2xl p-6 border border-blue-400/30 bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">🏛️</span>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">Общественно-политическая обстановка</h3>
                <p class="text-blue-300 text-xs">Обновлено: 18.10.2025</p>
              </div>
            </div>
            <span class="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs font-semibold">Секретно</span>
          </div>
          <p class="text-blue-200 text-sm mb-4">
            Мониторинг политических процессов, анализ электоральных настроений и оценка социальной стабильности в регионе.
          </p>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center text-xs">
              <span class="text-blue-300">Объем:</span>
              <span class="text-white">38 страниц</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-blue-300">Данные до:</span>
              <span class="text-white">Q3 2025</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-blue-300">Статус:</span>
              <span class="text-green-300">Актуально</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📄</span>
                <span>Просмотр</span>
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📥</span>
                <span>PDF</span>
              </button>
            </div>
            <span class="text-blue-300 text-xs">v3.2</span>
          </div>
        </div>

        <!-- Прогноз развития -->
        <div class="glass rounded-2xl p-6 border border-green-400/30 bg-green-500/10 hover:border-green-400/50 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">📈</span>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">Прогноз развития на 2026 год</h3>
                <p class="text-green-300 text-xs">Обновлено: 15.10.2025</p>
              </div>
            </div>
            <span class="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs font-semibold">Конфиденциально</span>
          </div>
          <p class="text-green-200 text-sm mb-4">
            Стратегический прогноз социально-экономического развития Курской области с учетом федеральных трендов и региональных особенностей.
          </p>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center text-xs">
              <span class="text-green-300">Объем:</span>
              <span class="text-white">78 страниц</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-green-300">Данные до:</span>
              <span class="text-white">Q3 2025</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-green-300">Статус:</span>
              <span class="text-yellow-300">На утверждении</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📄</span>
                <span>Просмотр</span>
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📥</span>
                <span>PDF</span>
              </button>
            </div>
            <span class="text-green-300 text-xs">v1.0</span>
          </div>
        </div>

        <!-- Инвестиционный климат -->
        <div class="glass rounded-2xl p-6 border border-yellow-400/30 bg-yellow-500/10 hover:border-yellow-400/50 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">💼</span>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">Инвестиционный климат региона</h3>
                <p class="text-yellow-300 text-xs">Обновлено: 10.10.2025</p>
              </div>
            </div>
            <span class="bg-yellow-500/30 text-yellow-200 px-2 py-1 rounded text-xs font-semibold">ДСП</span>
          </div>
          <p class="text-yellow-200 text-sm mb-4">
            Анализ инвестиционной привлекательности, оценка рисков и рекомендации по улучшению инвестиционного климата.
          </p>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center text-xs">
              <span class="text-yellow-300">Объем:</span>
              <span class="text-white">54 страницы</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-yellow-300">Данные до:</span>
              <span class="text-white">Q2 2025</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-yellow-300">Статус:</span>
              <span class="text-green-300">Актуально</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📄</span>
                <span>Просмотр</span>
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📥</span>
                <span>PDF</span>
              </button>
            </div>
            <span class="text-yellow-300 text-xs">v2.3</span>
          </div>
        </div>

        <!-- Бюджетный анализ -->
        <div class="glass rounded-2xl p-6 border border-red-400/30 bg-red-500/10 hover:border-red-400/50 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <span class="text-xl">📋</span>
              </div>
              <div>
                <h3 class="text-white font-bold text-lg">Анализ исполнения бюджета 2025</h3>
                <p class="text-red-300 text-xs">Обновлено: 05.10.2025</p>
              </div>
            </div>
            <span class="bg-red-500/30 text-red-200 px-2 py-1 rounded text-xs font-semibold">Секретно</span>
          </div>
          <p class="text-red-200 text-sm mb-4">
            Детальный анализ доходной и расходной частей бюджета, оценка эффективности бюджетных расходов.
          </p>
          <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center text-xs">
              <span class="text-red-300">Объем:</span>
              <span class="text-white">67 страниц</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-red-300">Данные до:</span>
              <span class="text-white">Q3 2025</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-red-300">Статус:</span>
              <span class="text-green-300">Актуально</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📄</span>
                <span>Просмотр</span>
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center space-x-2">
                <span>📥</span>
                <span>PDF</span>
              </button>
            </div>
            <span class="text-red-300 text-xs">v1.8</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Статистика отчетов -->
    <section class="glass rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-6">📈 Статистика аналитических материалов</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
          <div class="text-2xl font-bold text-white mb-1">12</div>
          <div class="text-purple-200 text-xs">Всего отчетов</div>
        </div>
        <div class="text-center p-4 bg-green-500/10 rounded-xl border border-green-400/30">
          <div class="text-2xl font-bold text-white mb-1">8</div>
          <div class="text-green-200 text-xs">Актуальные</div>
        </div>
        <div class="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
          <div class="text-2xl font-bold text-white mb-1">3</div>
          <div class="text-blue-200 text-xs">Секретные</div>
        </div>
        <div class="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
          <div class="text-2xl font-bold text-white mb-1">486</div>
          <div class="text-yellow-200 text-xs">Страниц всего</div>
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