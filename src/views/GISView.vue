<template>
  <div class="space-y-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">ГИС Карта Курской области</h1>
          <p class="text-gray-600">Интегрированная картографическая система с оперативной обстановкой региона</p>
        </div>
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
      <div ref="mapContainer" class="w-full h-[600px] rounded-xl overflow-hidden shadow-lg relative border border-gray-200 mb-6">
        <!-- Здесь будет отрисовываться карта -->
      </div>

      <!-- Статистика ЧС -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-red-600">{{ emergencyStats.active }}</div>
          <div class="text-sm text-red-700">Активных ЧС</div>
        </div>
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">{{ emergencyStats.liquidated }}</div>
          <div class="text-sm text-orange-700">Ликвидировано</div>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ emergencyStats.working }}</div>
          <div class="text-sm text-yellow-700">В работе</div>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{{ emergencyStats.total }}</div>
          <div class="text-sm text-blue-700">Всего за сутки</div>
        </div>
      </div>

      <!-- Панель управления слоями -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Управление слоями</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="transport" 
              v-model="activeLayers.transport" 
              class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label for="transport" class="text-sm text-gray-700">Транспорт</label>
          </div>
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="social" 
              v-model="activeLayers.social" 
              class="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            >
            <label for="social" class="text-sm text-gray-700">Социальные объекты</label>
          </div>
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="industry" 
              v-model="activeLayers.industry" 
              class="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            >
            <label for="industry" class="text-sm text-gray-700">Промышленность</label>
          </div>
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="emergency" 
              v-model="activeLayers.emergency" 
              class="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            >
            <label for="emergency" class="text-sm text-gray-700">ЧС и происшествия</label>
          </div>
        </div>
      </div>



      <!-- Список активных ЧС -->
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" v-if="activeEmergencies.length > 0">
        <h3 class="text-lg font-semibold text-red-800 mb-4">🚨 Активные чрезвычайные ситуации</h3>
        <div class="space-y-2">
          <div 
            v-for="emergency in activeEmergencies" 
            :key="emergency.id"
            class="bg-white border border-red-300 rounded p-3 flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-red-700">{{ emergency.name }}</p>
              <p class="text-sm text-gray-600">{{ emergency.type }} • {{ emergency.address }}</p>
            </div>
            <span class="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {{ emergency.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Информационные блоки -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span class="text-green-600">🚗</span>
            </div>
            <h4 class="font-semibold text-green-800">Транспортная инфраструктура</h4>
          </div>
          <ul class="text-green-700 text-sm space-y-1">
            <li>• Автодороги федерального значения</li>
            <li>• Железнодорожные узлы</li>
            <li>• Мосты и путепроводы</li>
            <li>• Транспортные развязки</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span class="text-blue-600">🏥</span>
            </div>
            <h4 class="font-semibold text-blue-800">Социальные объекты</h4>
          </div>
          <ul class="text-blue-700 text-sm space-y-1">
            <li>• Школы и детские сады</li>
            <li>• Больницы и поликлиники</li>
            <li>• Учреждения культуры</li>
            <li>• Спортивные объекты</li>
          </ul>
        </div>
        
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <span class="text-purple-600">🏭</span>
            </div>
            <h4 class="font-semibold text-purple-800">Промышленность</h4>
          </div>
          <ul class="text-purple-700 text-sm space-y-1">
            <li>• Крупные предприятия</li>
            <li>• Промышленные зоны</li>
            <li>• Склады и логистика</li>
            <li>• Зоны развития</li>
          </ul>
        </div>
      </div>

      <!-- Легенда карты -->
      <div class="bg-gray-50 rounded-lg p-4 mt-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Легенда карты</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex items-center">
            <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Транспортные объекты</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Социальные объекты</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Промышленность</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Чрезвычайные ситуации</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Исправление для иконок Leaflet в Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const mapContainer = ref(null)
const satelliteView = ref(false)
const currentTime = ref('')
const activeLayers = ref({
  transport: true,
  social: true,
  industry: true,
  emergency: true
})

// Данные о чрезвычайных ситуациях
const emergencyObjects = ref([
  // Пожары
  { id: 1, lat: 51.7254, lng: 36.1826, name: 'Пожар в жилом доме', type: 'Пожар', icon: '🔥', status: 'Тушение', address: 'ул. Ленина, 45', severity: 'high' },
  { id: 2, lat: 51.7354, lng: 36.2226, name: 'Возгорание склада', type: 'Пожар', icon: '🔥', status: 'Локализация', address: 'промзона Северная', severity: 'high' },
  { id: 3, lat: 51.7154, lng: 36.1926, name: 'Задымление в подвале', type: 'Пожар', icon: '🔥', status: 'Расследование', address: 'ул. Кирова, 12', severity: 'medium' },
  { id: 4, lat: 51.7454, lng: 36.1626, name: 'Лесной пожар', type: 'Пожар', icon: '🔥', status: 'Тушение', address: 'Солнцевский район', severity: 'high' },
  
  // Взрывы
  { id: 5, lat: 51.7554, lng: 36.2026, name: 'Взрыв газового баллона', type: 'Взрыв', icon: '💥', status: 'Ликвидация', address: 'ул. Энгельса, 78', severity: 'high' },
  { id: 6, lat: 51.7654, lng: 36.1726, name: 'Хлопок на производстве', type: 'Взрыв', icon: '💥', status: 'Расследование', address: 'завод "Прогресс"', severity: 'medium' },
  { id: 7, lat: 51.7054, lng: 36.2126, name: 'Взрыв бытового газа', type: 'Взрыв', icon: '💥', status: 'Ликвидировано', address: 'ул. Дзержинского, 33', severity: 'high' },
  
  // Обвалы
  { id: 8, lat: 51.7354, lng: 36.2426, name: 'Обвал кровли ТЦ', type: 'Обвал', icon: '🏚️', status: 'Эвакуация', address: 'ТЦ "Центральный"', severity: 'high' },
  { id: 9, lat: 51.7254, lng: 36.1526, name: 'Оползень на трассе', type: 'Обвал', icon: '🏚️', status: 'Расчистка', address: 'трасса М2, 125 км', severity: 'medium' },
  { id: 10, lat: 51.7454, lng: 36.1326, name: 'Обвал грунта', type: 'Обвал', icon: '🏚️', status: 'Оцепление', address: 'строительная площадка', severity: 'low' },
  
  // ДТП
  { id: 11, lat: 51.7154, lng: 36.1726, name: 'Массовое ДТП', type: 'ДТП', icon: '🚗', status: 'Скорая помощь', address: 'перекресток ул. Ленина/К. Маркса', severity: 'high' },
  { id: 12, lat: 51.7554, lng: 36.1826, name: 'Столкновение фур', type: 'ДТП', icon: '🚛', status: 'Разбор затора', address: 'объездная дорога', severity: 'medium' },
  { id: 13, lat: 51.7654, lng: 36.1926, name: 'Наезд на пешехода', type: 'ДТП', icon: '🚶', status: 'Расследование', address: 'ул. Радищева, 15', severity: 'medium' },
  
  // Коммунальные аварии
  { id: 14, lat: 51.7354, lng: 36.1626, name: 'Прорыв водопровода', type: 'Коммунальная авария', icon: '💧', status: 'Ремонт', address: 'ул. Сумская, 25', severity: 'medium' },
  { id: 15, lat: 51.7254, lng: 36.2026, name: 'Обрыв ЛЭП', type: 'Коммунальная авария', icon: '⚡', status: 'Восстановление', address: 'микрорайон Химволокно', severity: 'high' },
  { id: 16, lat: 51.7154, lng: 36.2226, name: 'Утечка газа', type: 'Коммунальная авария', icon: '⛽', status: 'Локализация', address: 'ул. 50 лет Октября, 8', severity: 'high' },
  
  // Природные ЧС
  { id: 17, lat: 51.7454, lng: 36.2426, name: 'Ураганный ветер', type: 'Стихийное бедствие', icon: '🌪️', status: 'Мониторинг', address: 'Курский район', severity: 'medium' },
  { id: 18, lat: 51.7054, lng: 36.1626, name: 'Паводок', type: 'Стихийное бедствие', icon: '🌊', status: 'Наблюдение', address: 'река Сейм', severity: 'low' },
  { id: 19, lat: 51.7554, lng: 36.2426, name: 'Гололед', type: 'Стихийное бедствие', icon: '❄️', status: 'Обработка дорог', address: 'центр города', severity: 'medium' },
  
  // Техногенные аварии
  { id: 20, lat: 51.7654, lng: 36.2226, name: 'Разлив химикатов', type: 'Техногенная авария', icon: '☣️', status: 'Локализация', address: 'химкомбинат', severity: 'high' },
  { id: 21, lat: 51.7154, lng: 36.2426, name: 'Авария на котельной', type: 'Техногенная авария', icon: '🏭', status: 'Ремонт', address: 'ТЭЦ-1', severity: 'medium' },
  { id: 22, lat: 51.7354, lng: 36.1326, name: 'Сбой системы связи', type: 'Техногенная авария', icon: '📡', status: 'Восстановление', address: 'телевышка', severity: 'low' },
  
  // Медицинские ЧС
  { id: 23, lat: 51.7254, lng: 36.1726, name: 'Массовое отравление', type: 'Медицинская ЧС', icon: '🏥', status: 'Госпитализация', address: 'кафе "Восток"', severity: 'high' },
  { id: 24, lat: 51.7454, lng: 36.1926, name: 'COVID-19 вспышка', type: 'Медицинская ЧС', icon: '🦠', status: 'Карантин', address: 'общежитие КГУ', severity: 'medium' }
])

let map = null
let markers = []

// Статистика ЧС
const emergencyStats = computed(() => {
  const active = emergencyObjects.value.filter(e => e.status !== 'Ликвидировано').length
  const liquidated = emergencyObjects.value.filter(e => e.status === 'Ликвидировано').length
  const working = emergencyObjects.value.filter(e => e.status === 'В работе' || e.status === 'Тушение' || e.status === 'Локализация').length
  
  return {
    active,
    liquidated,
    working,
    total: emergencyObjects.value.length
  }
})

// Активные ЧС
const activeEmergencies = computed(() => {
  return emergencyObjects.value
    .filter(e => e.status !== 'Ликвидировано')
    .slice(0, 5) // Показываем только 5 последних
})

// Обновление времени
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

// Создание кастомных иконок для ЧС
const createEmergencyIcon = (severity, iconText = '') => {
  const colors = {
    high: '#ef4444',
    medium: '#f59e0b', 
    low: '#3b82f6'
  }
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${colors[severity]};
        width: 28px;
        height: 28px;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        color: white;
        animation: pulse 2s infinite;
      ">${iconText}</div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      </style>
    `,
    className: 'emergency-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  })
}

// Создание обычных иконок
const createCustomIcon = (color, iconText = '') => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
      ">${iconText}</div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })
}

// Инициализация карты
const initMap = async () => {
  await nextTick()
  
  if (!mapContainer.value) return

  try {
    if (map) {
      map.remove()
    }

    map = L.map(mapContainer.value, {
      attributionControl: false
    }).setView([51.7304, 36.1926], 10)

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    })

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, Maxar, Earthstar Geographics',
      maxZoom: 18
    })

    osmLayer.addTo(map)

    map.osmLayer = osmLayer
    map.satelliteLayer = satelliteLayer

    addOperationalObjects()



  } catch (error) {
    console.error('Ошибка инициализации карты:', error)
  }
}

// Добавление объектов оперативной обстановки
const addOperationalObjects = () => {
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  // Транспортные объекты
  if (activeLayers.value.transport) {
    const transportObjects = [
      { lat: 51.7504, lng: 36.1926, name: 'Автовокзал "Курск"', type: 'transport', icon: '🚌' },
      { lat: 51.7204, lng: 36.1626, name: 'Ж/д вокзал Курск', type: 'transport', icon: '🚂' },
      { lat: 51.7404, lng: 36.2226, name: 'Мост через Тускарь', type: 'transport', icon: '🌉' },
    ]

    transportObjects.forEach(obj => {
      const marker = L.marker([obj.lat, obj.lng], {
        icon: createCustomIcon('#10b981', obj.icon)
      }).addTo(map).bindPopup(createPopup(obj, 'Транспортный объект', 'Работает в штатном режиме'))
      markers.push(marker)
    })
  }

  // Социальные объекты
  if (activeLayers.value.social) {
    const socialObjects = [
      { lat: 51.7604, lng: 36.1726, name: 'Областная больница', type: 'social', icon: '🏥' },
      { lat: 51.7304, lng: 36.1826, name: 'Школа №1', type: 'social', icon: '🏫' },
    ]

    socialObjects.forEach(obj => {
      const marker = L.marker([obj.lat, obj.lng], {
        icon: createCustomIcon('#3b82f6', obj.icon)
      }).addTo(map).bindPopup(createPopup(obj, 'Социальный объект', 'Режим работы: 08:00 - 20:00'))
      markers.push(marker)
    })
  }

  // Промышленные объекты
  if (activeLayers.value.industry) {
    const industryObjects = [
      { lat: 51.7804, lng: 36.2326, name: 'Курская АЭС', type: 'industry', icon: '⚡' },
      { lat: 51.7104, lng: 36.2526, name: 'Завод "Прибор"', type: 'industry', icon: '🏭' },
    ]

    industryObjects.forEach(obj => {
      const marker = L.marker([obj.lat, obj.lng], {
        icon: createCustomIcon('#8b5cf6', obj.icon)
      }).addTo(map).bindPopup(createPopup(obj, 'Промышленный объект', 'Производство активное'))
      markers.push(marker)
    })
  }

  // Чрезвычайные ситуации
  if (activeLayers.value.emergency) {
    emergencyObjects.value.forEach(emergency => {
      const marker = L.marker([emergency.lat, emergency.lng], {
        icon: createEmergencyIcon(emergency.severity, emergency.icon)
      }).addTo(map).bindPopup(createEmergencyPopup(emergency))
      markers.push(marker)
    })
  }
}

// Создание popup для обычных объектов
const createPopup = (obj, type, status) => {
  return `
    <div class="p-2 min-w-[200px]">
      <h3 class="font-bold text-lg mb-2">${obj.name}</h3>
      <p class="text-sm text-gray-600"><strong>Тип:</strong> ${type}</p>
      <p class="text-sm text-gray-600"><strong>Статус:</strong> ${status}</p>
    </div>
  `
}

// Создание popup для ЧС
const createEmergencyPopup = (emergency) => {
  const severityColors = {
    high: 'text-red-600',
    medium: 'text-orange-600',
    low: 'text-blue-600'
  }
  
  return `
    <div class="p-3 min-w-[250px]">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-lg">${emergency.name}</h3>
        <span class="text-2xl">${emergency.icon}</span>
      </div>
      <div class="space-y-1 text-sm">
        <p><strong>Тип:</strong> ${emergency.type}</p>
        <p><strong>Статус:</strong> <span class="font-semibold ${severityColors[emergency.severity]}">${emergency.status}</span></p>
        <p><strong>Адрес:</strong> ${emergency.address}</p>
        <p><strong>Время:</strong> ${currentTime.value}</p>
        <p><strong>Важность:</strong> 
          <span class="font-semibold ${severityColors[emergency.severity]}">
            ${emergency.severity === 'high' ? 'Высокая' : emergency.severity === 'medium' ? 'Средняя' : 'Низкая'}
          </span>
        </p>
      </div>
    </div>
  `
}

// Сброс вида карты
const resetMapView = () => {
  if (map) {
    map.setView([51.7304, 36.1926], 10)
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

// Наблюдатель за изменениями активных слоев
watch(activeLayers, () => {
  addOperationalObjects()
}, { deep: true })

// Инициализация
onMounted(() => {
  initMap()
  updateTime()
  setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* Стили для кастомных маркеров */
:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
}

:deep(.emergency-marker) {
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