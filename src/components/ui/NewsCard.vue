<template>
  <div class="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
    <div class="flex items-start justify-between mb-4">
      <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {{ news.category }}
      </span>
      <span class="text-blue-200 text-sm">{{ formatDate(news.date) }}</span>
    </div>
    
    <h3 class="text-white font-bold text-lg mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
      {{ news.title }}
    </h3>
    
    <p class="text-blue-100 text-sm mb-4 line-clamp-3">
      {{ news.summary }}
    </p>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span class="text-green-300 text-xs">Актуально</span>
      </div>
      <button class="text-blue-300 hover:text-white text-sm font-semibold transition-colors flex items-center space-x-1">
        <span>Подробнее</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>