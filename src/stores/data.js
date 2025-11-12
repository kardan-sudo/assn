// stores/data.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  // Муниципальные образования Курской области
  const municipalities = ref([
    {
      id: 1,
      name: 'город Курск',
      type: 'городской округ',
      population: 450000,
      area: 190,
      head: 'Иванов А.С.'
    },
    {
      id: 2,
      name: 'Железногорский район',
      type: 'муниципальный район',
      population: 125000,
      area: 2912,
      head: 'Петров В.И.'
    }
    // ... остальные муниципальные образования
  ])

  // Государственные органы
  const governmentBodies = ref({
    executive: [
      {
        name: 'Губернатор Курской области',
        head: 'Роман Владимирович Старовойт',
        description: 'Высшее должностное лицо области'
      }
    ],
    legislative: [
      {
        name: 'Курская областная Дума',
        head: 'Николай Иванович Жеребилов',
        description: 'Законодательный орган власти'
      }
    ],
    judicial: [
      {
        name: 'Курский областной суд',
        head: 'Сергей Владимирович Ломоносов',
        description: 'Высший судебный орган области'
      }
    ]
  })

  // Сотрудники (только для авторизованных)
  const staff = ref([
    {
      id: 1,
      name: 'Смирнов А.В.',
      position: 'Начальник управления',
      department: 'Информационно-аналитическое управление',
      phone: '+7 (4712) 123-456'
    }
  ])

  return {
    municipalities,
    governmentBodies,
    staff
  }
})