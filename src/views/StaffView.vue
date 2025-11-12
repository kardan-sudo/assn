<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Заголовок -->
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">👥 Сотрудники</h1>
      <p class="text-blue-200 text-lg">Информационно-аналитическое подразделение</p>
    </div>

    <div v-if="hasAccess">
      <!-- Контент для администраторов -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="employee in staff"
          :key="employee.id"
          class="glass rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-xl font-semibold">
                {{ employee.name.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>
            <h3 class="text-white font-bold text-lg mb-2">{{ employee.name }}</h3>
            <p class="text-blue-300 font-medium mb-2">{{ employee.position }}</p>
            <p class="text-blue-200 text-sm mb-3">{{ employee.department }}</p>
            <p class="text-blue-100 text-sm">{{ employee.phone }}</p>
            <div class="mt-4 pt-4 border-t border-white/10">
              <p class="text-blue-300 text-xs">{{ employee.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Статистика отдела -->
      <div class="mt-8 glass rounded-2xl p-6 border border-white/20">
        <h2 class="text-xl font-bold text-white mb-4">Статистика отдела</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">{{ staff.length }}</div>
            <div class="text-blue-200 text-xs">Сотрудников</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">4</div>
            <div class="text-green-200 text-xs">Проекта</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">98%</div>
            <div class="text-yellow-200 text-xs">Эффективность</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-white mb-1">24/7</div>
            <div class="text-purple-200 text-xs">Поддержка</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Сообщение о недостаточных правах -->
    <div v-else class="text-center py-12">
      <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="text-3xl">🔒</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-3">Доступ ограничен</h3>
      <p class="text-red-200 mb-6">
        Раздел "Сотрудники" доступен только администраторам системы.
      </p>
      <router-link 
        to="/"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
      >
        На главную
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const hasAccess = computed(() => {
  return authStore.hasAccess('admin')
})

const staff = ref([
  {
    id: 1,
    name: 'Смирнов А.В.',
    position: 'Начальник управления',
    department: 'Информационно-аналитическое управление',
    phone: '+7 (4712) 123-456',
    email: 'smirnov@kursk-region.ru'
  },
  {
    id: 2,
    name: 'Петрова Е.С.',
    position: 'Ведущий аналитик',
    department: 'Информационно-аналитическое управление',
    phone: '+7 (4712) 123-457',
    email: 'petrova@kursk-region.ru'
  },
  {
    id: 3,
    name: 'Козлов М.П.',
    position: 'Старший специалист',
    department: 'Информационно-аналитическое управление',
    phone: '+7 (4712) 123-458',
    email: 'kozlov@kursk-region.ru'
  },
  {
    id: 4,
    name: 'Николаева С.И.',
    position: 'Специалист по данным',
    department: 'Информационно-аналитическое управление',
    phone: '+7 (4712) 123-459',
    email: 'nikolaeva@kursk-region.ru'
  },
  {
    id: 5,
    name: 'Волков Д.Н.',
    position: 'Системный администратор',
    department: 'Технический отдел',
    phone: '+7 (4712) 123-460',
    email: 'volkov@kursk-region.ru'
  },
  {
    id: 6,
    name: 'Орлова Т.К.',
    position: 'ГИС специалист',
    department: 'Геоинформационный отдел',
    phone: '+7 (4712) 123-461',
    email: 'orlova@kursk-region.ru'
  }
])

onMounted(() => {
  // Инициализация компонента
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
</style>