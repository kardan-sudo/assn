<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- Заголовок -->
      <div class="flex items-center mb-8">
        <div class="w-4 h-12 bg-blue-500 rounded-full mr-4"></div>
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Законодательная власть Курской области</h1>
          <p class="text-gray-600 mt-2">Представительные органы государственной власти, осуществляющие законодательные функции</p>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="grid grid-cols-1 gap-6">
        <div
          v-for="body in governmentBodies.legislative"
          :key="body.name"
          class="border border-blue-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 transition-all duration-300 shadow-sm hover:shadow-lg group"
        >
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-xl font-semibold text-blue-800 group-hover:text-blue-900">{{ body.name }}</h3>
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span class="text-blue-600 text-lg">📜</span>
            </div>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <div>
                <span class="text-blue-700 font-medium text-sm">Руководитель:</span>
                <p class="text-gray-800">{{ body.head }}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <span class="text-blue-700 font-medium text-sm">Адрес:</span>
                <p class="text-gray-800">{{ body.address }}</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <div>
                <span class="text-blue-700 font-medium text-sm">Телефон:</span>
                <p class="text-gray-800">{{ body.phone }}</p>
              </div>
            </div>
          </div>
          
          <p class="text-gray-600 text-sm mt-4 leading-relaxed border-t border-blue-100 pt-4">{{ body.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()
const governmentBodies = dataStore.governmentBodies
</script>