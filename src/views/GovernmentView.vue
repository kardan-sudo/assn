<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Государственные органы Курской области</h1>

      <!-- Исполнительная власть -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-green-800 mb-4">Исполнительная власть</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="body in governmentBodies.executive"
            :key="body.name"
            class="border border-green-200 rounded-lg p-4 bg-green-50"
          >
            <h3 class="text-lg font-semibold text-green-800 mb-2">{{ body.name }}</h3>
            <p class="text-gray-700"><strong>Руководитель:</strong> {{ body.head }}</p>
            <p class="text-gray-600 text-sm mt-2">{{ body.description }}</p>
          </div>
        </div>
      </section>

      <!-- Законодательная власть -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-blue-800 mb-4">Законодательная власть</h2>
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="body in governmentBodies.legislative"
            :key="body.name"
            class="border border-blue-200 rounded-lg p-4 bg-blue-50"
          >
            <h3 class="text-lg font-semibold text-blue-800 mb-2">{{ body.name }}</h3>
            <p class="text-gray-700"><strong>Руководитель:</strong> {{ body.head }}</p>
            <p class="text-gray-600 text-sm mt-2">{{ body.description }}</p>
          </div>
        </div>
      </section>

      <!-- Судебная власть -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-purple-800 mb-4">Судебная власть</h2>
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="body in governmentBodies.judicial"
            :key="body.name"
            class="border border-purple-200 rounded-lg p-4 bg-purple-50"
          >
            <h3 class="text-lg font-semibold text-purple-800 mb-2">{{ body.name }}</h3>
            <p class="text-gray-700"><strong>Руководитель:</strong> {{ body.head }}</p>
            <p class="text-gray-600 text-sm mt-2">{{ body.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()
const governmentBodies = dataStore.governmentBodies
</script>