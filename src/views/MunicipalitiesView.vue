<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Муниципальные образования Курской области</h1>
      
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск муниципального образования..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="municipality in filteredMunicipalities"
          :key="municipality.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 class="text-lg font-semibold text-blue-800 mb-2">{{ municipality.name }}</h3>
          <div class="space-y-2 text-sm text-gray-600">
            <p><strong>Тип:</strong> {{ municipality.type }}</p>
            <p><strong>Население:</strong> {{ municipality.population.toLocaleString() }} чел.</p>
            <p><strong>Площадь:</strong> {{ municipality.area }} км²</p>
            <p><strong>Глава:</strong> {{ municipality.head }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()
const searchQuery = ref('')

const filteredMunicipalities = computed(() => {
  if (!searchQuery.value) {
    return dataStore.municipalities
  }
  
  const query = searchQuery.value.toLowerCase()
  return dataStore.municipalities.filter(m => 
    m.name.toLowerCase().includes(query) ||
    m.type.toLowerCase().includes(query) ||
    m.head.toLowerCase().includes(query)
  )
})
</script>