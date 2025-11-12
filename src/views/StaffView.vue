<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Сотрудники информационно-аналитического подразделения</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="employee in staff"
          :key="employee.id"
          class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
        >
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-blue-600 text-xl font-semibold">
              {{ employee.name.split(' ').map(n => n[0]).join('') }}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ employee.name }}</h3>
          <p class="text-blue-600 font-medium mb-2">{{ employee.position }}</p>
          <p class="text-gray-600 text-sm mb-3">{{ employee.department }}</p>
          <p class="text-gray-500 text-sm">{{ employee.phone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()
const staff = dataStore.staff
</script>