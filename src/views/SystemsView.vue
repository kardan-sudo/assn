<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Информационно-аналитические системы</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span class="text-blue-600 text-xl">⚖️</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">ИПС «Законодательство России»</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Информационно-правовая система, содержащая банк правовых актов Курской области и федерального законодательства.
          </p>
          <a 
            href="http://pravo.gov.ru" 
            target="_blank"
            class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Перейти к системе
          </a>
        </div>

        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span class="text-green-600 text-xl">📊</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Статистическая отчетность</h2>
          </div>
          <p class="text-gray-600 mb-4">
            Система сбора и анализа статистических данных по социально-экономическому развитию региона.
          </p>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Открыть отчеты
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>