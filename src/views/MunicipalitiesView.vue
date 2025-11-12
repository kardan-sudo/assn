<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          🏛️ Муниципальные образования Курской области
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Полная информация о муниципальных образованиях, демографии, экономике и руководстве региона
        </p>
      </div>

      <!-- Общая статистика -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ totalMunicipalities }}</div>
          <div class="text-gray-600 font-medium">Муниципальных образований</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
          <div class="text-3xl font-bold text-green-600 mb-2">1.08 млн. чел.</div>
          <div class="text-gray-600 font-medium">Общее население</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500">
          <div class="text-3xl font-bold text-purple-600 mb-2">{{ totalArea.toLocaleString() }} км²</div>
          <div class="text-gray-600 font-medium">Общая площадь</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-orange-500">
          <div class="text-3xl font-bold text-orange-600 mb-2">28</div>
          <div class="text-gray-600 font-medium">Районов</div>
        </div>
      </div>

      <!-- Поиск и фильтры -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div class="flex-1 w-full">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск муниципального образования, главы..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
            </div>
          </div>
          
          <div class="flex gap-3 w-full lg:w-auto">
            <select 
              v-model="selectedType"
              class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
            >
              <option value="">Все типы</option>
              <option value="городской округ">Городские округа</option>
              <option value="муниципальный район">Муниципальные районы</option>
              <option value="городское поселение">Городские поселения</option>
              <option value="сельское поселение">Сельские поселения</option>
            </select>
            
            <select 
              v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
            >
              <option value="name">По названию</option>
              <option value="population">По населению</option>
              <option value="area">По площади</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Сетка муниципальных образований -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        <div
          v-for="municipality in filteredMunicipalities"
          :key="municipality.id"
          class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
        >
          <!-- Заголовок карточки -->
          <div 
            class="h-3"
            :class="getMunicipalityColor(municipality.type)"
          ></div>
          
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-1">{{ municipality.name }}</h3>
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {{ municipality.type }}
                </span>
              </div>
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {{ municipality.id }}
              </div>
            </div>

            <!-- Основная информация -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-semibold">{{ municipality.population.toLocaleString() }}</span>
                <span class="text-sm ml-1">человек</span>
              </div>
              
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-semibold">{{ municipality.area }}</span>
                <span class="text-sm ml-1">км²</span>
              </div>
              
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-medium">{{ municipality.head }}</span>
              </div>
            </div>

            <!-- Дополнительная информация -->
            <div v-if="municipality.details" class="border-t border-gray-100 pt-4">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="text-center">
                  <div class="font-bold text-gray-800">{{ municipality.details.settlements }}</div>
                  <div class="text-gray-500">населённых пунктов</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-gray-800">{{ municipality.details.density }} чел/км²</div>
                  <div class="text-gray-500">плотность</div>
                </div>
              </div>
            </div>

            <!-- Кнопка подробнее -->
            <button 
              @click="openModal(municipality)"
              class="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>

      <!-- Карта региона -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg class="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Географическое расположение
        </h2>
        <div class="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p>Интерактивная карта муниципальных образований Курской области</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="selectedMunicipality" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ selectedMunicipality.name }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Основная информация</h3>
              <div class="space-y-3">
                <div class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-600">Тип:</span>
                  <span class="font-semibold">{{ selectedMunicipality.type }}</span>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-600">Население:</span>
                  <span class="font-semibold">{{ selectedMunicipality.population.toLocaleString() }} чел.</span>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-600">Площадь:</span>
                  <span class="font-semibold">{{ selectedMunicipality.area }} км²</span>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-600">Глава:</span>
                  <span class="font-semibold">{{ selectedMunicipality.head }}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Контактная информация</h3>
              <div class="space-y-3">
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+7 (4712) 123-456</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>admin@{{ selectedMunicipality.name.toLowerCase().replace(/\s+/g, '-') }}.ru</span>
                </div>
                <div class="flex items-start text-gray-600">
                  <svg class="w-5 h-5 mr-3 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>г. {{ selectedMunicipality.name.includes('город') ? selectedMunicipality.name.replace('город ', '') : selectedMunicipality.name }}, ул. Центральная, 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()
const searchQuery = ref('')
const selectedType = ref('')
const sortBy = ref('name')
const selectedMunicipality = ref(null)

// Общая статистика
const totalMunicipalities = computed(() => dataStore.municipalities.length)
const totalPopulation = computed(() => 
  dataStore.municipalities.reduce((sum, m) => sum + m.population, 0)
)
const totalArea = computed(() => 
  dataStore.municipalities.reduce((sum, m) => sum + m.area, 0)
)

// Фильтрация и сортировка
const filteredMunicipalities = computed(() => {
  let filtered = dataStore.municipalities

  // Фильтрация по поисковому запросу
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.type.toLowerCase().includes(query) ||
      m.head.toLowerCase().includes(query)
    )
  }

  // Фильтрация по типу
  if (selectedType.value) {
    filtered = filtered.filter(m => m.type === selectedType.value)
  }

  // Сортировка
  filtered = [...filtered].sort((a, b) => {
    if (sortBy.value === 'population') {
      return b.population - a.population
    } else if (sortBy.value === 'area') {
      return b.area - a.area
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

// Цвета для типов муниципальных образований
const getMunicipalityColor = (type) => {
  const colors = {
    'городской округ': 'bg-gradient-to-r from-blue-500 to-blue-600',
    'муниципальный район': 'bg-gradient-to-r from-green-500 to-green-600',
    'городское поселение': 'bg-gradient-to-r from-purple-500 to-purple-600',
    'сельское поселение': 'bg-gradient-to-r from-orange-500 to-orange-600'
  }
  return colors[type] || 'bg-gradient-to-r from-gray-500 to-gray-600'
}

// Модальное окно
const openModal = (municipality) => {
  selectedMunicipality.value = municipality
}

const closeModal = () => {
  selectedMunicipality.value = null
}

// Закрытие модального окна по ESC
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && selectedMunicipality.value) {
      closeModal()
    }
  })
})
</script>