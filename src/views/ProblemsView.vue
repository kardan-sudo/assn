<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">
        ⚠️ Актуальные проблемы субъекта
      </h1>

    </div>

    <!-- Контент страницы -->
    <section>
      <div class="flex items-center justify-between mb-6">

        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
            <span class="text-red-300 text-sm">Высокий приоритет</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span class="text-yellow-300 text-sm">Средний приоритет</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Демографическая ситуация -->
        <div class="glass rounded-2xl p-6 border border-red-400/30 bg-red-500/10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">📉</span>
              </div>
              <h3 class="text-white font-bold text-lg">Демографическая ситуация</h3>
            </div>
            <span class="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-xs font-semibold">Критично</span>
          </div>
          <p class="text-red-200 text-sm mb-4">
            Снижение рождаемости на 8.3% по сравнению с 2024 годом. Естественная убыль населения составляет 6.7 человек на 1000 жителей. Миграционный отток увеличился на 12% за последний год.
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-red-300">Приоритет</span>
              <span class="text-white font-semibold">Высокий</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-red-300">Статус</span>
              <span class="text-white">В работе</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-red-300">Срок решения</span>
              <span class="text-white">2026 Q2</span>
            </div>
          </div>
        </div>

        <!-- Промышленный рост -->
        <div class="glass rounded-2xl p-6 border border-yellow-400/30 bg-yellow-500/10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🏭</span>
              </div>
              <h3 class="text-white font-bold text-lg">Промышленный рост</h3>
            </div>
            <span class="bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold">Средний</span>
          </div>
          <p class="text-yellow-200 text-sm mb-4">
            Замедление темпов роста промышленного производства до 2.1%. Необходима модернизация предприятий и привлечение инвестиций. Уровень износа основных фондов составляет 45%.
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-yellow-300">Приоритет</span>
              <span class="text-white font-semibold">Средний</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-yellow-300">Статус</span>
              <span class="text-white">Анализ</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-yellow-300">Срок решения</span>
              <span class="text-white">2026 Q4</span>
            </div>
          </div>
        </div>

        <!-- Здравоохранение -->
        <div class="glass rounded-2xl p-6 border border-orange-400/30 bg-orange-500/10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🏥</span>
              </div>
              <h3 class="text-white font-bold text-lg">Здравоохранение</h3>
            </div>
            <span class="bg-orange-500/30 text-orange-200 px-3 py-1 rounded-full text-xs font-semibold">Высокий</span>
          </div>
          <p class="text-orange-200 text-sm mb-4">
            Дефицит узких специалистов в районных больницах. Очередь на плановую госпитализацию достигает 3-4 месяцев. Оснащенность медицинским оборудованием - 65% от нормы.
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-orange-300">Приоритет</span>
              <span class="text-white font-semibold">Высокий</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-orange-300">Статус</span>
              <span class="text-white">Планирование</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-orange-300">Срок решения</span>
              <span class="text-white">2025 Q4</span>
            </div>
          </div>
        </div>

        <!-- Дорожная инфраструктура -->
        <div class="glass rounded-2xl p-6 border border-blue-400/30 bg-blue-500/10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🛣️</span>
              </div>
              <h3 class="text-white font-bold text-lg">Дорожная инфраструктура</h3>
            </div>
            <span class="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">Средний</span>
          </div>
          <p class="text-blue-200 text-sm mb-4">
            42% региональных дорог требуют капитального ремонта. Увеличилось количество ДТП на 12% за последний год. Транспортная доступность сельских населенных пунктов - 78%.
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-blue-300">Приоритет</span>
              <span class="text-white font-semibold">Средний</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-blue-300">Статус</span>
              <span class="text-white">Финансирование</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-blue-300">Срок решения</span>
              <span class="text-white">2026 Q1</span>
            </div>
          </div>
        </div>

        <!-- Образование -->
        <div class="glass rounded-2xl p-6 border border-purple-400/30 bg-purple-500/10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🎓</span>
              </div>
              <h3 class="text-white font-bold text-lg">Качество образования</h3>
            </div>
            <span class="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs font-semibold">Средний</span>
          </div>
          <p class="text-purple-200 text-sm mb-4">
            Нехватка квалифицированных педагогических кадров в сельских школах. Средний балл ЕГЭ ниже среднего по РФ на 8%. Оснащенность школ современным оборудованием - 58%.
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-purple-300">Приоритет</span>
              <span class="text-white font-semibold">Средний</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-purple-300">Статус</span>
              <span class="text-white">Разработка</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-purple-300">Срок решения</span>
              <span class="text-white">2026 Q3</span>
            </div>
          </div>
        </div>

        <!-- ЖКХ -->
        <div class="glass rounded-2xl p-6 border border-green-400/30 bg-green-500/10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span class="text-xl">🏘️</span>
              </div>
              <h3 class="text-white font-bold text-lg">Жилищно-коммунальное хозяйство</h3>
            </div>
            <span class="bg-green-500/30 text-green-200 px-3 py-1 rounded-full text-xs font-semibold">Низкий</span>
          </div>
          <p class="text-green-200 text-sm mb-4">
            Высокий уровень износа коммунальных сетей - до 68% в отдельных муниципалитетах. Рост тарифов на 15% при снижении качества услуг. Аварийность увеличилась на 22%.
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="text-green-300">Приоритет</span>
              <span class="text-white font-semibold">Низкий</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-green-300">Статус</span>
              <span class="text-white">Мониторинг</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-green-300">Срок решения</span>
              <span class="text-white">2027 Q1</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Статистика проблем -->
    <section class="glass rounded-2xl p-6 border border-white/20">
      <h3 class="text-xl font-bold text-white mb-6">📊 Общая статистика проблем</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4 bg-red-500/10 rounded-xl border border-red-400/30">
          <div class="text-3xl font-bold text-white mb-2">3</div>
          <div class="text-red-200 text-sm">Критические проблемы</div>
        </div>
        <div class="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
          <div class="text-3xl font-bold text-white mb-2">8</div>
          <div class="text-yellow-200 text-sm">Всего проблем</div>
        </div>
        <div class="text-center p-4 bg-green-500/10 rounded-xl border border-green-400/30">
          <div class="text-3xl font-bold text-white mb-2">42%</div>
          <div class="text-green-200 text-sm">В стадии решения</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const openTabs = [
  { path: '/situation/open/events', title: 'Обзор событий', icon: '📅' },
  { path: '/situation/open/problems', title: 'Актуальные проблемы', icon: '⚠️' },
  { path: '/situation/open/gfi', title: 'Деятельность ГФИ', icon: '👨‍💼' }
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