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
      head: 'Иванов А.С.',
      details: {
        settlements: 1,
        density: 2368
      }
    },
    {
      id: 2,
      name: 'Железногорский район',
      type: 'муниципальный район',
      population: 125000,
      area: 2912,
      head: 'Петров В.И.',
      details: {
        settlements: 96,
        density: 43
      }
    },
    {
      id: 3,
      name: 'Курский район',
      type: 'муниципальный район',
      population: 98000,
      area: 2905,
      head: 'Сидоров Н.П.',
      details: {
        settlements: 234,
        density: 34
      }
    },
    {
      id: 4,
      name: 'Льговский район',
      type: 'муниципальный район',
      population: 45600,
      area: 1067,
      head: 'Кузнецова Е.В.',
      details: {
        settlements: 78,
        density: 43
      }
    },
    {
      id: 5,
      name: 'Щигровский район',
      type: 'муниципальный район',
      population: 38900,
      area: 1665,
      head: 'Морозов Д.С.',
      details: {
        settlements: 123,
        density: 23
      }
    },
    {
      id: 6,
      name: 'Рыльский район',
      type: 'муниципальный район',
      population: 52100,
      area: 1505,
      head: 'Волков П.Н.',
      details: {
        settlements: 145,
        density: 35
      }
    },
    {
      id: 7,
      name: 'Дмитриевский район',
      type: 'муниципальный район',
      population: 23400,
      area: 1270,
      head: 'Лебедева О.И.',
      details: {
        settlements: 89,
        density: 18
      }
    },
    {
      id: 8,
      name: 'Фатежский район',
      type: 'муниципальный район',
      population: 18900,
      area: 1280,
      head: 'Соколов М.А.',
      details: {
        settlements: 67,
        density: 15
      }
    },
    {
      id: 9,
      name: 'город Железногорск',
      type: 'городской округ',
      population: 102000,
      area: 114,
      head: 'Новиков С.В.',
      details: {
        settlements: 1,
        density: 895
      }
    },
    {
      id: 10,
      name: 'Курчатовский район',
      type: 'муниципальный район',
      population: 67800,
      area: 679,
      head: 'Павлов А.К.',
      details: {
        settlements: 45,
        density: 100
      }
    },
    {
      id: 11,
      name: 'Горшеченский район',
      type: 'муниципальный район',
      population: 15600,
      area: 1400,
      head: 'Тихонов В.П.',
      details: {
        settlements: 56,
        density: 11
      }
    },
    {
      id: 12,
      name: 'Беловский район',
      type: 'муниципальный район',
      population: 13400,
      area: 950,
      head: 'Федоров И.Л.',
      details: {
        settlements: 34,
        density: 14
      }
    },
    {
      id: 13,
      name: 'Большесолдатский район',
      type: 'муниципальный район',
      population: 9800,
      area: 660,
      head: 'Никитина Л.М.',
      details: {
        settlements: 23,
        density: 15
      }
    },
    {
      id: 14,
      name: 'Глушковский район',
      type: 'муниципальный район',
      population: 18700,
      area: 851,
      head: 'Белов А.С.',
      details: {
        settlements: 45,
        density: 22
      }
    },
    {
      id: 15,
      name: 'Золотухинский район',
      type: 'муниципальный район',
      population: 23400,
      area: 1113,
      head: 'Киселева Т.В.',
      details: {
        settlements: 78,
        density: 21
      }
    },
    {
      id: 16,
      name: 'Касторенский район',
      type: 'муниципальный район',
      population: 15600,
      area: 1225,
      head: 'Орлов Д.Н.',
      details: {
        settlements: 56,
        density: 13
      }
    },
    {
      id: 17,
      name: 'Конышевский район',
      type: 'муниципальный район',
      population: 12300,
      area: 1137,
      head: 'Макаров С.П.',
      details: {
        settlements: 34,
        density: 11
      }
    },
    {
      id: 18,
      name: 'Кореневский район',
      type: 'муниципальный район',
      population: 19800,
      area: 893,
      head: 'Семенова Е.А.',
      details: {
        settlements: 67,
        density: 22
      }
    },
    {
      id: 19,
      name: 'Мантуровский район',
      type: 'муниципальный район',
      population: 11200,
      area: 1017,
      head: 'Виноградов П.С.',
      details: {
        settlements: 45,
        density: 11
      }
    },
    {
      id: 20,
      name: 'Медвенский район',
      type: 'муниципальный район',
      population: 16700,
      area: 1080,
      head: 'Алексеев Н.В.',
      details: {
        settlements: 56,
        density: 15
      }
    },
    {
      id: 21,
      name: 'Обоянский район',
      type: 'муниципальный район',
      population: 28900,
      area: 1130,
      head: 'Данилова И.К.',
      details: {
        settlements: 89,
        density: 26
      }
    },
    {
      id: 22,
      name: 'Октябрьский район',
      type: 'муниципальный район',
      population: 22300,
      area: 620,
      head: 'Егоров В.Л.',
      details: {
        settlements: 34,
        density: 36
      }
    },
    {
      id: 23,
      name: 'Поныровский район',
      type: 'муниципальный район',
      population: 9800,
      area: 690,
      head: 'Титова М.С.',
      details: {
        settlements: 23,
        density: 14
      }
    },
    {
      id: 24,
      name: 'Пристенский район',
      type: 'муниципальный район',
      population: 13400,
      area: 760,
      head: 'Сорокин А.Б.',
      details: {
        settlements: 45,
        density: 18
      }
    },
    {
      id: 25,
      name: 'Советский район',
      type: 'муниципальный район',
      population: 15600,
      area: 1160,
      head: 'Комаров Л.Н.',
      details: {
        settlements: 56,
        density: 13
      }
    },
    {
      id: 26,
      name: 'Солнцевский район',
      type: 'муниципальный район',
      population: 17800,
      area: 1032,
      head: 'Гаврилов С.М.',
      details: {
        settlements: 67,
        density: 17
      }
    },
    {
      id: 27,
      name: 'Суджанский район',
      type: 'муниципальный район',
      population: 26700,
      area: 996,
      head: 'Ларина О.П.',
      details: {
        settlements: 78,
        density: 27
      }
    },
    {
      id: 28,
      name: 'Тимский район',
      type: 'муниципальный район',
      population: 12300,
      area: 900,
      head: 'Фролов Д.В.',
      details: {
        settlements: 45,
        density: 14
      }
    },
    {
      id: 29,
      name: 'Хомутовский район',
      type: 'муниципальный район',
      population: 8900,
      area: 1170,
      head: 'Степанова Н.И.',
      details: {
        settlements: 34,
        density: 8
      }
    },
    {
      id: 30,
      name: 'Черемисиновский район',
      type: 'муниципальный район',
      population: 11200,
      area: 800,
      head: 'Кудрявцев А.Л.',
      details: {
        settlements: 23,
        density: 14
      }
    }
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