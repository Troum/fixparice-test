<script setup lang="ts">
import { useAuth } from '~/composable/useAuth'

const router = useRouter()
const { user } = useAuth()

useHead({
  title: 'Система управления вакансиями',
  meta: [
    { name: 'description', content: 'Современная платформа для управления вакансиями с удобным API' }
  ]
})

const features = [
  {
    icon: 'i-lucide-briefcase',
    title: 'Управление вакансиями',
    description: 'Создавайте, редактируйте и управляйте вакансиями с помощью интуитивного интерфейса'
  },
  {
    icon: 'i-lucide-search',
    title: 'Мощный поиск',
    description: 'Находите нужные вакансии с помощью продвинутых фильтров и сортировки'
  },
  {
    icon: 'i-lucide-chart-bar',
    title: 'Аналитика',
    description: 'Отслеживайте статистику и получайте insights по вашим вакансиям'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Безопасность',
    description: 'Надежная система аутентификации с токенами доступа и RBAC контролем ролей'
  },
  {
    icon: 'i-lucide-zap',
    title: 'REST API',
    description: 'Полнофункциональный API для интеграции с внешними системами'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Адаптивность',
    description: 'Отзывчивый дизайн, который отлично работает на всех устройствах'
  }
]

const stats = [
  { label: 'Активных вакансий', value: '150+', icon: 'i-lucide-trending-up' },
  { label: 'Пользователей', value: '50+', icon: 'i-lucide-users' },
  { label: 'API запросов/день', value: '10k+', icon: 'i-lucide-activity' },
  { label: 'Время отклика', value: '<100ms', icon: 'i-lucide-zap' }
]
</script>

<template>
  <div class="min-h-screen">
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <div class="text-center">
          <div class="flex justify-center mb-8">
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-xl">
                <UIcon name="i-lucide-briefcase" class="w-10 h-10 text-white" />
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-check" class="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h1 class="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Система управления
            <span class="bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent">
              вакансиями
            </span>
          </h1>

          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Современная платформа для эффективного управления вакансиями с мощным REST API,
            продвинутой аналитикой и интуитивным интерфейсом
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              size="lg"
              icon="i-lucide-arrow-right"
              trailing
              @click="router.push(user ? '/jobs' : '/login')"
              class="px-8 py-3"
            >
              {{ user ? 'Перейти к вакансиям' : 'Войти в систему' }}
            </UButton>

            <UButton
              size="lg"
              variant="outline"
              icon="i-lucide-play-circle"
              @click="router.push('/demo')"
              class="px-8 py-3"
            >
              Демо
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white border-y">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="flex justify-center mb-3">
              <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <UIcon :name="stat.icon" class="w-6 h-6 text-slate-600" />
              </div>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ stat.value }}</div>
            <div class="text-sm text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Почему выбирают нашу платформу?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы создали современное решение, которое объединяет простоту использования
            с мощными возможностями для профессионалов
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                <UIcon :name="feature.icon" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ feature.title }}</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-slate-700 to-gray-800">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Готовы начать?
        </h2>
        <p class="text-xl text-slate-200 mb-8">
          Присоединяйтесь к современной системе управления вакансиями уже сегодня
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            size="lg"
            variant="solid"
            color="neutral"
            icon="i-lucide-rocket"
            @click="router.push(user ? '/jobs' : '/login')"
            class="px-8 py-3"
          >
            {{ user ? 'Открыть панель' : 'Войти' }}
          </UButton>

                      <UButton
              size="lg"
              variant="outline"
              color="neutral"
              icon="i-lucide-play-circle"
              @click="router.push('/demo')"
              class="px-8 py-3"
            >
              Попробовать демо
            </UButton>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-briefcase" class="w-4 h-4 text-white" />
              </div>
              <span class="text-lg font-semibold">JobManager</span>
            </div>
            <p class="text-gray-400 mb-4 max-w-md">
              Современная система управления вакансиями, созданная с использованием
              передовых технологий Yii2 и Nuxt 3.
            </p>
          </div>

          <div>
            <h3 class="font-semibold mb-4">Технологии</h3>
            <ul class="space-y-2 text-gray-400">
              <li>Yii2 Framework</li>
              <li>Nuxt 3</li>
              <li>TypeScript</li>
              <li>REST API</li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-4">Возможности</h3>
            <ul class="space-y-2 text-gray-400">
              <li>CRUD операции</li>
              <li>Аутентификация</li>
              <li>Поиск и фильтры</li>
              <li>Аналитика</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 JobManager. Создано для демонстрации возможностей.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
