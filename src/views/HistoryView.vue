<template>
  <div class="space-y-8 animate-fade-in-up">
    <!-- Герой-секция -->
    <section class="relative glass rounded-2xl overflow-hidden border border-white/20">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
      <div class="relative z-20 p-8 md:p-12">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">История Курской области</h1>
          <p class="text-blue-200 text-lg md:text-xl mb-6">
            Богатое наследие от древних времен до современности
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <span class="bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-sm">Образована в 1934</span>
            <span class="bg-purple-500/30 text-purple-100 px-3 py-1 rounded-full text-sm">Центральный ФО</span>
            <span class="bg-green-500/30 text-green-100 px-3 py-1 rounded-full text-sm">Курская битва 1943</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Основная информация -->
    <section class="glass rounded-2xl p-8 border border-white/20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-bold text-white mb-4">Курская область сегодня</h2>
          <p class="text-blue-200 text-lg leading-relaxed mb-6">
            Курская область — развитый промышленно-аграрный регион в составе Центрального федерального округа, 
            образованный 13 июня 1934 года. Административный центр — город Курск, впервые упомянутый в летописях в 1032 году.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">1.08M</div>
              <div class="text-blue-300 text-sm">Население</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">30,000</div>
              <div class="text-blue-300 text-sm">км² Площадь</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">28</div>
              <div class="text-blue-300 text-sm">Муниципалитетов</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">1934</div>
              <div class="text-blue-300 text-sm">Год основания</div>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="glass rounded-xl p-4 border border-white/20">
            <img 
              :src="kurskCoatOfArms" 
              alt="Курский край"
              class="w-full h-64 object-cover rounded-lg"
            >
            <p class="text-blue-200 text-sm text-center mt-3">Живописные пейзажи Курской области</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Таймлайн истории -->
    <section class="glass rounded-2xl p-8 border border-white/20">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Исторический таймлайн</h2>
      
      <div class="space-y-8">
        <!-- Древняя история -->
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">🦌</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <h3 class="text-xl font-bold text-white">Древняя история</h3>
              <span class="bg-yellow-500/30 text-yellow-100 px-2 py-1 rounded-full text-sm">до X века</span>
            </div>
            <p class="text-blue-200 mb-4">
              Территория области была заселена с древнейших времён. Археологические находки свидетельствуют 
              о присутствии здесь людей уже в каменном веке. Обнаружены стоянки древних людей, курганы 
              и городища различных археологических культур.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img 
              :src="kurskCoatOfArms1"
                alt="Археологические находки"
                class="w-full h-32 object-cover rounded-lg"
              >
              <img 
              :src="kurskCoatOfArms2"
                alt="Древние курганы"
                class="w-full h-32 object-cover rounded-lg"
              >
            </div>
          </div>
        </div>

        <!-- Курское княжество -->
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">🏰</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <h3 class="text-xl font-bold text-white">Курское княжество</h3>
              <span class="bg-green-500/30 text-green-100 px-2 py-1 rounded-full text-sm">XI-XIII века</span>
            </div>
            <p class="text-blue-200 mb-4">
              В XI-XIII веках территория входила в состав Черниговского, затем Переяславского княжеств. 
              Город Курск впервые упоминается в летописи в 1032 году. Княжество играло важную роль 
              в защите южных рубежей Древней Руси от кочевников.
            </p>
            <div class="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
              <p class="text-green-200 text-sm italic">
                "Курск град велик и мног людьми..." — из древнерусских летописей
              </p>
            </div>
          </div>
        </div>

        <!-- Российская империя -->
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">👑</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <h3 class="text-xl font-bold text-white">Российская империя</h3>
              <span class="bg-blue-500/30 text-blue-100 px-2 py-1 rounded-full text-sm">XVIII-XX века</span>
            </div>
            <p class="text-blue-200 mb-4">
              С XVIII века Курская губерния становится важным agricultural и trade регионом. 
              Развивается промышленность, строятся железные дороги. В 1780 году утверждается герб Курской губернии.
            </p>
            <img 
            :src="kurskCoatOfArms3"
              alt="Историческая архитектура Курска"
              class="w-full h-48 object-cover rounded-lg"
            >
          </div>
        </div>

        <!-- Курская битва -->
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">⚔️</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <h3 class="text-xl font-bold text-white">Курская битва</h3>
              <span class="bg-red-500/30 text-red-100 px-2 py-1 rounded-full text-sm">1943 год</span>
            </div>
            <p class="text-blue-200 mb-4">
              В годы Великой Отечественной войны на территории области произошло знаменитое Курское сражение — 
              одна из ключевых битв войны. Сражение на Курской дуге стало переломным моментом в войне 
              и крупнейшим танковым сражением в истории.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <h4 class="text-white font-semibold mb-2">Прохоровское сражение</h4>
                <p class="text-red-200 text-sm">Крупнейшее танковое сражение Второй мировой войны</p>
              </div>
              <div class="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <h4 class="text-white font-semibold mb-2">Переломный момент</h4>
                <p class="text-red-200 text-sm">Стратегическая инициатива перешла к Красной Армии</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Современность -->
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
            <span class="text-2xl">🏭</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <h3 class="text-xl font-bold text-white">Современность</h3>
              <span class="bg-purple-500/30 text-purple-100 px-2 py-1 rounded-full text-sm">XXI век</span>
            </div>
            <p class="text-blue-200 mb-4">
              Сегодня Курская область — развитый промышленно-аграрный регион с богатым историческим 
              и культурным наследием. Область известна Курской магнитной аномалией — крупнейшим 
              железорудным бассейном в мире.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-white mb-1">🥇</div>
                <div class="text-blue-200 text-sm">КМА</div>
                <div class="text-blue-300 text-xs">Крупнейший железорудный бассейн</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white mb-1">🌾</div>
                <div class="text-blue-200 text-sm">Агропром</div>
                <div class="text-blue-300 text-xs">Ведущий аграрный регион</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white mb-1">🏛️</div>
                <div class="text-blue-200 text-sm">Культура</div>
                <div class="text-blue-300 text-xs">Богатое наследие</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Достопримечательности -->
    <section class="glass rounded-2xl p-8 border border-white/20">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Культурное наследие</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <span class="text-xl">⛪</span>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Коренная пустынь</h3>
          <p class="text-blue-200 text-sm mb-4">
            Знаменитый мужской монастырь, место обретения Курской Коренной иконы Божией Матери
          </p>
          <div class="flex items-center text-blue-300 text-xs">
            <span>🎯 Религиозный центр</span>
          </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300">
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <span class="text-xl">🎭</span>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Курский драмтеатр</h3>
          <p class="text-blue-200 text-sm mb-4">
            Один из старейших театров России, основанный в 1792 году
          </p>
          <div class="flex items-center text-green-300 text-xs">
            <span>🏛️ Культурное наследие</span>
          </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <span class="text-xl">⚔️</span>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Триумфальная арка</h3>
          <p class="text-blue-200 text-sm mb-4">
            Мемориальный комплекс в честь победы в Курской битве
          </p>
          <div class="flex items-center text-purple-300 text-xs">
            <span>🎖️ Военная история</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Интересные факты -->
    <section class="glass rounded-2xl p-8 border border-white/20">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Интересные факты</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
          <h3 class="text-white font-bold text-lg mb-3 flex items-center">
            <span class="text-xl mr-2">🧲</span>
            Курская магнитная аномалия
          </h3>
          <p class="text-yellow-200 text-sm">
            Крупнейший в мире железорудный бассейн. Запасы руды оцениваются в 200-210 миллиардов тонн.
          </p>
        </div>

        <div class="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
          <h3 class="text-white font-bold text-lg mb-3 flex items-center">
            <span class="text-xl mr-2">🎵</span>
            Курский соловей
          </h3>
          <p class="text-blue-200 text-sm">
            Особая порода соловьев, известная своим уникальным пением. Символ Курского края.
          </p>
        </div>

        <div class="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
          <h3 class="text-white font-bold text-lg mb-3 flex items-center">
            <span class="text-xl mr-2">📚</span>
            Литературное наследие
          </h3>
          <p class="text-green-200 text-sm">
            Родина писателей А.П. Гайдара, Е.И. Носова, К.Д. Воробьева.
          </p>
        </div>

        <div class="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
          <h3 class="text-white font-bold text-lg mb-3 flex items-center">
            <span class="text-xl mr-2">🌾</span>
            Аграрный потенциал
          </h3>
          <p class="text-purple-200 text-sm">
            Входит в тройку лидеров ЦФО по производству сахарной свеклы и зерновых.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import kurskCoatOfArms from '@/assets/images/main_kursk-one-day.95mpd7.jpg'
import kurskCoatOfArms1 from '@/assets/images/suzhdanskij-klad-kurskoj-oblasti.jpg'
import kurskCoatOfArms2 from '@/assets/images/65648e95eff72839bfd2b1f6e3f9ce0a7.jpg'
import kurskCoatOfArms3 from '@/assets/images/KVR_000133_07833_1_t218_183616.jpg'

onMounted(() => {
  // Можно добавить анимации при скролле
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

/* Плавные переходы для карточек */
.bg-white {
  transition: all 0.3s ease;
}

.bg-white:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
</style>