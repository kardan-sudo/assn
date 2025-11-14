<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">
        📋 Статистика
      </h1>
      <p class="text-purple-200 text-lg">
        Детальная статистика и показатели социально-экономического развития
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
          <span>📋</span>
          <span>Статистические данные за 2025 год</span>
        </h2>
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2 bg-green-500/20 px-3 py-2 rounded-lg">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-300 text-sm">Данные обновлены</span>
          </div>
        </div>
      </div>

      <!-- Основные показатели -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="glass rounded-xl p-4 text-center border border-blue-400/30 bg-blue-500/10">
          <div class="text-2xl font-bold text-white mb-1">+2.3%</div>
          <div class="text-blue-200 text-xs">ВРП рост</div>
          <div class="text-blue-300 text-xs mt-1">к 2024 году</div>
        </div>
        <div class="glass rounded-xl p-4 text-center border border-green-400/30 bg-green-500/10">
          <div class="text-2xl font-bold text-white mb-1">-8.3%</div>
          <div class="text-green-200 text-xs">Рождаемость</div>
          <div class="text-green-300 text-xs mt-1">снижение</div>
        </div>
        <div class="glass rounded-xl p-4 text-center border border-yellow-400/30 bg-yellow-500/10">
          <div class="text-2xl font-bold text-white mb-1">4.2%</div>
          <div class="text-yellow-200 text-xs">Безработица</div>
          <div class="text-yellow-300 text-xs mt-1">уровень</div>
        </div>
        <div class="glass rounded-xl p-4 text-center border border-red-400/30 bg-red-500/10">
          <div class="text-2xl font-bold text-white mb-1">+12%</div>
          <div class="text-red-200 text-xs">Инфляция</div>
          <div class="text-red-300 text-xs mt-1">годовая</div>
        </div>
      </div>

      <!-- Дополнительные показатели -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      <!-- Ключевые показатели развития -->
      <div class="glass rounded-2xl p-6 border border-white/20 mb-8">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center space-x-3">
          <span>🎯</span>
          <span>Ключевые показатели развития</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/30">
            <div class="text-3xl font-bold text-white mb-2">63%</div>
            <div class="text-blue-200 text-sm font-semibold">Уровень цифровизации</div>
            <div class="text-blue-300 text-xs mt-2">+8% с начала года</div>
            <div class="w-full bg-blue-500/20 rounded-full h-2 mt-3">
              <div class="bg-blue-400 rounded-full h-2" style="width: 63%"></div>
            </div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30">
            <div class="text-3xl font-bold text-white mb-2">42</div>
            <div class="text-green-200 text-sm font-semibold">Индекс развития</div>
            <div class="text-green-300 text-xs mt-2">место в РФ</div>
            <div class="text-green-200 text-xs mt-2">+2 позиции за год</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/30">
            <div class="text-3xl font-bold text-white mb-2">78%</div>
            <div class="text-purple-200 text-sm font-semibold">Доверие власти</div>
            <div class="text-purple-300 text-xs mt-2">по опросам</div>
            <div class="text-purple-200 text-xs mt-2">+5% к прошлому году</div>
          </div>
        </div>
      </div>

      <!-- Детальная статистика по секторам -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Экономические показатели -->
        <div class="glass rounded-2xl p-6 border border-blue-400/30 bg-blue-500/10">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <span>💰</span>
            <span>Экономические показатели</span>
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <span class="text-blue-300">ВРП на душу населения</span>
              <span class="text-white font-semibold">458,000 ₽</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-blue-300">Промышленное производство</span>
              <span class="text-green-300 font-semibold">+2.1%</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-blue-300">Сельское хозяйство</span>
              <span class="text-green-300 font-semibold">+4.8%</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-blue-300">Розничная торговля</span>
              <span class="text-green-300 font-semibold">+3.2%</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-blue-300">Инвестиции в ОС</span>
              <span class="text-green-300 font-semibold">+5.1%</span>
            </div>
          </div>
        </div>

        <!-- Социальные показатели -->
        <div class="glass rounded-2xl p-6 border border-green-400/30 bg-green-500/10">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <span>👥</span>
            <span>Социальные показатели</span>
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-300">Численность населения</span>
              <span class="text-white font-semibold">1,087,500</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-300">Средняя зарплата</span>
              <span class="text-white font-semibold">42,800 ₽</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-300">Пенсии</span>
              <span class="text-white font-semibold">21,450 ₽</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-300">Ожидаемая продолжительность жизни</span>
              <span class="text-white font-semibold">71.2 года</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-300">Уровень бедности</span>
              <span class="text-red-300 font-semibold">12.8%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Региональные сравнения -->
      <div class="glass rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center space-x-3">
          <span>📊</span>
          <span>Сравнение с регионами ЦФО</span>
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-white/10">
                <th class="text-left py-3 text-purple-300 font-semibold">Регион</th>
                <th class="text-right py-3 text-purple-300 font-semibold">ВРП на душу, тыс. ₽</th>
                <th class="text-right py-3 text-purple-300 font-semibold">Инвестиции, %</th>
                <th class="text-right py-3 text-purple-300 font-semibold">Безработица, %</th>
                <th class="text-right py-3 text-purple-300 font-semibold">Рождаемость</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="region in regionalComparison" :key="region.name" class="border-b border-white/5 hover:bg-white/5">
                <td class="py-3 text-white font-medium">{{ region.name }}</td>
                <td class="py-3 text-right text-white">{{ region.gdp }}</td>
                <td class="py-3 text-right" :class="region.investment > 0 ? 'text-green-300' : 'text-red-300'">
                  {{ region.investment > 0 ? '+' : '' }}{{ region.investment }}%
                </td>
                <td class="py-3 text-right" :class="region.unemployment < 4 ? 'text-green-300' : 'text-red-300'">
                  {{ region.unemployment }}%
                </td>
                <td class="py-3 text-right" :class="region.birthRate > 1.5 ? 'text-green-300' : 'text-red-300'">
                  {{ region.birthRate }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Прогнозные показатели -->
    <section class="glass rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center space-x-3">
        <span>🔮</span>
        <span>Прогнозные показатели на 2026 год</span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
          <div class="text-lg font-bold text-white mb-1">+2.8%</div>
          <div class="text-blue-200 text-xs">Рост ВРП</div>
          <div class="text-blue-300 text-xs mt-1">прогноз</div>
        </div>
        <div class="text-center p-4 bg-green-500/10 rounded-xl border border-green-400/30">
          <div class="text-lg font-bold text-white mb-1">+6.5%</div>
          <div class="text-green-200 text-xs">Инвестиции</div>
          <div class="text-green-300 text-xs mt-1">прогноз</div>
        </div>
        <div class="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
          <div class="text-lg font-bold text-white mb-1">3.8%</div>
          <div class="text-yellow-200 text-xs">Безработица</div>
          <div class="text-yellow-300 text-xs mt-1">прогноз</div>
        </div>
        <div class="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/30">
          <div class="text-lg font-bold text-white mb-1">+8%</div>
          <div class="text-purple-200 text-xs">Реальные доходы</div>
          <div class="text-purple-300 text-xs mt-1">прогноз</div>
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

const regionalComparison = [
  { name: 'Курская область', gdp: '458', investment: 5.1, unemployment: 4.2, birthRate: 1.3 },
  { name: 'Белгородская область', gdp: '512', investment: 6.8, unemployment: 3.8, birthRate: 1.4 },
  { name: 'Воронежская область', gdp: '489', investment: 4.2, unemployment: 4.5, birthRate: 1.2 },
  { name: 'Липецкая область', gdp: '543', investment: 7.2, unemployment: 3.5, birthRate: 1.5 },
  { name: 'Орловская область', gdp: '398', investment: 2.8, unemployment: 5.1, birthRate: 1.1 },
  { name: 'Тамбовская область', gdp: '421', investment: 3.5, unemployment: 4.8, birthRate: 1.3 }
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