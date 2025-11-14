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
          <div class="text-3xl font-bold text-green-600 mb-2">{{ totalPopulation.toLocaleString() }} чел.</div>
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

      <!-- Сетка муниципальных образований с прокруткой -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            Муниципальные образования 
            <span class="text-blue-600">({{ filteredMunicipalities.length }})</span>
          </h2>
          <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
            Найдено: {{ filteredMunicipalities.length }} из {{ totalMunicipalities }}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
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

        <!-- Сообщение если ничего не найдено -->
        <div 
          v-if="filteredMunicipalities.length === 0"
          class="text-center py-12 text-gray-500"
        >
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg font-medium">Муниципальные образования не найдены</p>
          <p class="text-sm mt-2">Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      </div>

      <!-- Интерактивная карта -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <svg class="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Интерактивная карта муниципальных образований
          </h2>
          <div class="flex gap-2">
            <button 
              @click="resetMapView"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Сбросить вид
            </button>
            <button 
              @click="toggleSatelliteView"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              {{ satelliteView ? 'Схема' : 'Спутник' }}
            </button>
          </div>
        </div>
        
        <!-- Контейнер для карты -->
        <div ref="mapContainer" class="w-full h-96 rounded-xl overflow-hidden shadow-lg relative border border-gray-200">
          <!-- Здесь будет отрисовываться карта -->
        </div>

        <!-- Легенда карты -->
        <div class="mt-4 flex flex-wrap gap-4 justify-center">
          <div class="flex items-center">
            <div class="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Городские округа</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Муниципальные районы</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Городские поселения</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Сельские поселения</span>
          </div>
        </div>

        <!-- Информация о выбранном муниципалитете -->
        <div v-if="selectedMapMunicipality" class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-2">
                {{ selectedMapMunicipality.name }}
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span class="text-blue-600 font-medium">Тип:</span>
                  <p>{{ selectedMapMunicipality.type }}</p>
                </div>
                <div>
                  <span class="text-blue-600 font-medium">Население:</span>
                  <p>{{ selectedMapMunicipality.population.toLocaleString() }} чел.</p>
                </div>
                <div>
                  <span class="text-blue-600 font-medium">Площадь:</span>
                  <p>{{ selectedMapMunicipality.area }} км²</p>
                </div>
                <div>
                  <span class="text-blue-600 font-medium">Глава:</span>
                  <p>{{ selectedMapMunicipality.head }}</p>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              
              <button 
                @click="selectedMapMunicipality = null"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для карточки -->
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

    <!-- Модальное окно для карты -->
    <div v-if="selectedMapModalMunicipality" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center">
              <svg class="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ selectedMapModalMunicipality.name }} - Детальная информация
            </h2>
            <button @click="closeMapModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Левая колонка - основная информация -->
            <div>
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                <h3 class="text-lg font-semibold text-blue-800 mb-4">Основные характеристики</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Тип муниципального образования:</span>
                    <span class="font-semibold text-blue-700">{{ selectedMapModalMunicipality.type }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Численность населения:</span>
                    <span class="font-semibold text-green-700">{{ selectedMapModalMunicipality.population.toLocaleString() }} чел.</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Территория:</span>
                    <span class="font-semibold text-purple-700">{{ selectedMapModalMunicipality.area }} км²</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Плотность населения:</span>
                    <span class="font-semibold text-orange-700">
                      {{ selectedMapModalMunicipality.details?.density || Math.round(selectedMapModalMunicipality.population / selectedMapModalMunicipality.area) }} чел/км²
                    </span>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-green-800 mb-4">Руководство</h3>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p class="font-semibold text-gray-800">Глава муниципального образования</p>
                      <p class="text-gray-600">{{ selectedMapModalMunicipality.head }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Правая колонка - дополнительная информация -->
            <div>
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 mb-6">
                <h3 class="text-lg font-semibold text-purple-800 mb-4">Контактные данные</h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-purple-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Телефон</p>
                      <p class="text-gray-600">+7 (4712) 123-456</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-purple-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Электронная почта</p>
                      <p class="text-gray-600">admin@{{ selectedMapModalMunicipality.name.toLowerCase().replace(/\s+/g, '-') }}.ru</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-purple-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p class="font-medium text-gray-800">Адрес</p>
                      <p class="text-gray-600">г. {{ selectedMapModalMunicipality.name.includes('город') ? selectedMapModalMunicipality.name.replace('город ', '') : selectedMapModalMunicipality.name }}, ул. Центральная, 1</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-orange-800 mb-4">Статистика</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-orange-600">
                      {{ selectedMapModalMunicipality.details?.settlements || '15' }}
                    </div>
                    <div class="text-sm text-gray-600">населённых пунктов</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-orange-600">
                      {{ selectedMapModalMunicipality.details?.density || Math.round(selectedMapModalMunicipality.population / selectedMapModalMunicipality.area) }}
                    </div>
                    <div class="text-sm text-gray-600">чел/км² плотность</div>
                  </div>
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useDataStore } from '@/stores/data'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Исправление для иконок Leaflet в Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const dataStore = useDataStore()
const searchQuery = ref('')
const selectedType = ref('')
const sortBy = ref('name')
const selectedMunicipality = ref(null)
const selectedMapMunicipality = ref(null)
const selectedMapModalMunicipality = ref(null)
const mapContainer = ref(null)
const satelliteView = ref(false)

let map = null
let markers = []

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

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.type.toLowerCase().includes(query) ||
      m.head.toLowerCase().includes(query)
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(m => m.type === selectedType.value)
  }

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

// Получение цвета маркера для карты
const getMarkerColor = (type) => {
  const colors = {
    'городской округ': '#3b82f6', // blue-500
    'муниципальный район': '#10b981', // green-500
    'городское поселение': '#8b5cf6', // purple-500
    'сельское поселение': '#f59e0b' // orange-500
  }
  return colors[type] || '#6b7280'
}

// Создание кастомных иконок для маркеров
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}

// Инициализация карты
const initMap = async () => {
  await nextTick()
  
  if (!mapContainer.value) return

  try {
    // Уничтожаем старую карту если существует
    if (map) {
      map.remove()
    }

    // Создаем карту
    map = L.map(mapContainer.value, {
      attributionControl: false // Отключаем стандартный контроль атрибуции
    }).setView([51.7304, 36.1926], 9) // Центр Курской области

    // Добавляем слой OpenStreetMap
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    })

    // Добавляем слой спутниковых снимков
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, Maxar, Earthstar Geographics',
      maxZoom: 18
    })

    // Добавляем основной слой
    osmLayer.addTo(map)

    // Сохраняем ссылки на слои
    map.osmLayer = osmLayer
    map.satelliteLayer = satelliteLayer

    // Добавляем маркеры для муниципалитетов
    addMunicipalityMarkers()

    

  } catch (error) {
    console.error('Ошибка инициализации карты:', error)
  }
}

// Добавление маркеров муниципалитетов
const addMunicipalityMarkers = () => {
  // Очищаем старые маркеры
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  dataStore.municipalities.forEach(municipality => {
    // Генерируем случайные координаты в пределах Курской области
    const lat = 51.5 + Math.random() * 0.5 // 51.5 - 52.0
    const lng = 35.5 + Math.random() * 1.5 // 35.5 - 37.0

    const color = getMarkerColor(municipality.type)
    const icon = createCustomIcon(color)

    const marker = L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-lg mb-2">${municipality.name}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>Тип:</strong> ${municipality.type}</p>
            <p><strong>Население:</strong> ${municipality.population.toLocaleString()} чел.</p>
            <p><strong>Площадь:</strong> ${municipality.area} км²</p>
            <p><strong>Глава:</strong> ${municipality.head}</p>
          </div>
          
        </div>
      `)

    // Обработчики событий для маркера
    marker.on('mouseover', () => {
      selectedMapMunicipality.value = municipality
    })

    marker.on('mouseout', () => {
      // Не сбрасываем сразу, чтобы пользователь мог прочитать информацию
      setTimeout(() => {
        if (selectedMapMunicipality.value?.id === municipality.id) {
          selectedMapMunicipality.value = null
        }
      }, 3000)
    })

    markers.push(marker)
  })

  // Обработчик для кнопки в popup
  mapContainer.value.addEventListener('openMapModal', (event) => {
    openMapModal(event.detail)
  })
}

// Открытие модального окна для карты
const openMapModal = (municipality) => {
  selectedMapModalMunicipality.value = municipality
}

// Закрытие модального окна для карты
const closeMapModal = () => {
  selectedMapModalMunicipality.value = null
}

// Открытие модального окна для карточки
const openModal = (municipality) => {
  selectedMunicipality.value = municipality
}

// Закрытие модального окна для карточки
const closeModal = () => {
  selectedMunicipality.value = null
}

// Сброс вида карты
const resetMapView = () => {
  if (map) {
    map.setView([51.7304, 36.1926], 9)
    selectedMapMunicipality.value = null
  }
}

// Переключение вида карты
const toggleSatelliteView = () => {
  satelliteView.value = !satelliteView.value
  
  if (map) {
    if (satelliteView.value) {
      map.removeLayer(map.osmLayer)
      map.satelliteLayer.addTo(map)
    } else {
      map.removeLayer(map.satelliteLayer)
      map.osmLayer.addTo(map)
    }
  }
}

// Закрытие модальных окон по ESC
onMounted(() => {
  initMap()
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (selectedMunicipality.value) {
        closeModal()
      }
      if (selectedMapModalMunicipality.value) {
        closeMapModal()
      }
    }
  })
})

onUnmounted(() => {
  // Очистка карты при размонтировании компонента
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.custom-scrollbar {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Стили для кастомных маркеров */
:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
}

/* Стили для убранной нижней полосы */
:deep(.leaflet-control-attribution) {
  background: rgba(255, 255, 255, 0.8) !important;
  font-size: 10px !important;
  padding: 2px 5px !important;
}
</style>