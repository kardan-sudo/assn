<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Информационно-аналитические системы
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Современные цифровые платформы для эффективного управления и анализа данных
        </p>
      </div>

      <!-- Карточки систем -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- ИПС «Законодательство России» -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
          <div class="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex items-start mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                <span class="text-2xl text-white">⚖️</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">ИПС «Законодательство России»</h2>
                <div class="flex items-center text-sm text-blue-600 font-medium">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Онлайн • Актуальная база
                </div>
              </div>
            </div>
            
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Полная база правовых актов Курской области и федерального законодательства с ежедневным обновлением и интеллектуальным поиском.
            </p>
            
            <div class="flex items-center justify-between">
              <a 
                href="http://pravo.gov.ru/ips/" 
                target="_blank"
                class="group/btn bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <span>Перейти к системе</span>
                <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <div class="text-sm text-gray-500">
                Официальный портал
              </div>
            </div>
          </div>
        </div>

        <!-- Статистическая отчетность -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
          <div class="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex items-start mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                <span class="text-2xl text-white">📊</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Статистическая отчетность</h2>
                <div class="flex items-center text-sm text-green-600 font-medium">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Аналитика • Реальном времени
                </div>
              </div>
            </div>
            
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Комплексная система сбора, анализа и визуализации статистических данных по социально-экономическому развитию региона.
            </p>
            
            <div class="flex items-center justify-between">
              <a 
                href="https://wciom.ru/" 
                target="_blank"
                class="group/btn bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <span>Перейти на портал</span>
                <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <div class="text-sm text-gray-500">
                ВЦИОМ
              </div>
            </div>
          </div>
        </div>

        <!-- Официальный портал Кремля -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
          <div class="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex items-start mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                <span class="text-2xl text-white">🏛️</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Официальный портал Кремля</h2>
                <div class="flex items-center text-sm text-red-600 font-medium">
                  <div class="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Государственный • Новости
                </div>
              </div>
            </div>
            
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Официальный сайт Президента России с актуальными новостями, указами и важными государственными документами.
            </p>
            
            <div class="flex items-center justify-between">
              <a 
                href="http://kremlin.ru/" 
                target="_blank"
                class="group/btn bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <span>Перейти на портал</span>
                <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <div class="text-sm text-gray-500">
                Президент России
              </div>
            </div>
          </div>
        </div>

        <!-- Портал Госуслуг -->
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
          <div class="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="flex items-start mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                <span class="text-2xl text-white">🛡️</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Портал Госуслуг</h2>
                <div class="flex items-center text-sm text-purple-600 font-medium">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Электронные услуги • Документы
                </div>
              </div>
            </div>
            
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Единый портал государственных и муниципальных услуг для граждан и организаций Российской Федерации.
            </p>
            
            <div class="flex items-center justify-between">
              <a 
                href="https://www.gosuslugi.ru/" 
                target="_blank"
                class="group/btn bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <span>Открыть Госуслуги</span>
                <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <div class="text-sm text-gray-500">
                Единый портал
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Дополнительная информация -->
      <div class="mt-12 text-center">
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Цифровая трансформация региона</h3>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto">
            Все системы интегрированы в единое информационное пространство Курской области 
            для обеспечения эффективного управления и предоставления качественных услуг населению.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>