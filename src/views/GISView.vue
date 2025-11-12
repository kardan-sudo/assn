<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">ГИС Карта Курской области</h1>
      
      <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div class="text-gray-500 mb-4">
          <span class="text-4xl">🗺️</span>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Геоинформационная система</h3>
        <p class="text-gray-600 mb-4">
          Интегрированная картографическая система с оперативной обстановкой региона.
          Используется GISWebServer от КБ "Панорама".
        </p>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
          <p class="text-blue-800 text-sm">
            <strong>Статус:</strong> Система подключена и функционирует
          </p>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 class="font-semibold text-green-800 mb-2">Транспортная инфраструктура</h4>
          <p class="text-green-700 text-sm">Дороги, мосты, транспортные узлы</p>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="font-semibold text-blue-800 mb-2">Социальные объекты</h4>
          <p class="text-blue-700 text-sm">Школы, больницы, учреждения культуры</p>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 class="font-semibold text-purple-800 mb-2">Промышленность</h4>
          <p class="text-purple-700 text-sm">Предприятия, зоны развития</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>