<script setup lang="ts">
import type { VacancyInterface } from '~/interfaces/VacancyInterface'
import {useConfirm} from "~/composable/useConfirm";
import {useApi} from "~/composable/useApi";
import {useRbac} from "~/composable/useRbac";

useHead({
  title: 'Демо - Просмотр вакансии'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { getVacancy, deleteVacancy: apiDeleteVacancy } = useApi()
const { confirm } = useConfirm()
const { canUpdateVacancies, canDeleteVacancies } = useRbac()

const id = parseInt(route.params.id as string)

const vacancy = ref<VacancyInterface | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const groupedSkills = computed(() => {
  if (!vacancy.value?.skills?.length) return []

  const groups = vacancy.value.skills.reduce((acc, skill) => {
    const category = skill.category_name || 'Другое'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, typeof vacancy.value.skills>)

  return Object.entries(groups).map(([name, skills]) => ({
    name,
    skills
  }))
})
const groupedBenefits = computed(() => {
  if (!vacancy.value?.benefits?.length) return []

  const groups = vacancy.value.benefits.reduce((acc, benefit) => {
    const type = benefit.type_name || 'Другое'
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(benefit)
    return acc
  }, {} as Record<string, typeof vacancy.value.benefits>)

  return Object.entries(groups).map(([name, benefits]) => ({
    name,
    benefits
  }))
})
const fetchVacancy = async () => {
  loading.value = true
  error.value = null

  try {
    vacancy.value = await getVacancy(id) as VacancyInterface
  } catch (err: any) {
    error.value = err.message || 'Не удалось загрузить вакансию'
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось загрузить вакансию',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Действия
const editVacancy = () => {
  router.push(`/demo/${id}/edit`)
}

const deleteVacancy = () => {
  confirm(
    'Удаление вакансии',
    `Вы уверены, что хотите удалить вакансию "${vacancy.value?.title}"? Это действие нельзя отменить.`,
    'Удалить',
    async () => {
      try {
        await apiDeleteVacancy(id)
        toast.add({
          title: 'Успех',
          description: 'Вакансия удалена',
          color: 'success'
        })
        router.push('/jobs')
      } catch (err) {
        toast.add({
          title: 'Ошибка',
          description: 'Не удалось удалить вакансию',
          color: 'error'
        })
      }
    }
  )
}

// Форматирование
const formatSalary = (salary: number) => {
  return salary ? `${new Intl.NumberFormat('ru-RU').format(salary)} ₽` : 'Не указана'
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString('ru-RU')
}

onMounted(() => {
  fetchVacancy()
})

watchEffect(() => {
  if (vacancy.value?.title) {
    useHead({
      title: `${vacancy.value.title} - Просмотр вакансии`
    })
  }
})
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Демо баннер -->
      <UAlert
          icon="i-lucide-eye"
          color="info"
          variant="subtle"
          title="Демо просмотр"
          description="Просмотр вакансии в демо режиме"
          class="mb-6"
      />

      <!-- Навигация -->
      <div class="mb-6">
        <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            @click="router.push('/demo')"
        >
          Назад к демо списку
        </UButton>
      </div>

      <InlineLoading
          v-if="loading"
          message="Загрузка демо вакансии"
          size="lg"
      />

      <!-- Ошибка -->
      <UCard v-else-if="error" class="border-red-200">
        <div class="text-center py-8">
          <div class="text-red-500 mb-4">
            <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto" />
          </div>
          <h3 class="text-lg font-semibold text-red-700 mb-2">Ошибка загрузки</h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <UButton @click="fetchVacancy" color="error" variant="outline">
            Попробовать снова
          </UButton>
        </div>
      </UCard>

      <!-- Содержимое вакансии -->
      <div v-else-if="vacancy" class="space-y-6">
        <!-- Заголовок -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ vacancy.title }}</h1>
                <UBadge
                    :color="vacancy.status === 1 ? 'primary' : 'neutral'"
                    :variant="vacancy.status === 1 ? 'soft' : 'subtle'"
                    size="lg"
                >
                  {{ vacancy.status_text }}
                </UBadge>
              </div>

              <!-- Действия -->
              <div class="flex gap-2">
                <UButton
                    v-if="canUpdateVacancies"
                    icon="i-lucide-edit"
                    @click="editVacancy"
                >
                  Редактировать
                </UButton>
                <UButton
                    v-if="canDeleteVacancies"
                    icon="i-lucide-trash"
                    color="error"
                    variant="outline"
                    @click="deleteVacancy"
                >
                  Удалить
                </UButton>
              </div>
            </div>
          </template>
          <template #default>
            <!-- Основная информация -->
            <div class="flex flex-col justify-center gap-y-2 items-start">
              <div class="flex items-center text-2xl font-bold text-green-600">
                <UIcon name="i-lucide-banknote" class="w-6 h-6 mr-2" />
                {{ formatSalary(vacancy.salary) }}
              </div>

              <div v-if="vacancy.location" class="flex items-center text-gray-600">
                <UIcon name="i-lucide-map-pin" class="w-5 h-5 mr-2" />
                <span>{{ vacancy.location.name }}</span>
              </div>

              <div v-if="vacancy.position_type_name" class="flex items-center text-gray-600">
                <UIcon name="i-lucide-briefcase" class="w-5 h-5 mr-2" />
                <span>{{ vacancy.position_type_name }}</span>
              </div>

              <div v-if="vacancy.experience_required" class="flex items-center text-gray-600">
                <UIcon name="i-lucide-clock" class="w-5 h-5 mr-2" />
                <span>{{ vacancy.experience_required }}</span>
              </div>
            </div>
          </template>
        </UCard>

        <!-- Описание -->
        <UCard v-if="vacancy.description">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-file-text" class="w-5 h-5 mr-2" />
              Описание вакансии
            </h2>
          </template>
          <div class="prose max-w-none">
            <TiptapRendererComponent :content="vacancy.description" />
          </div>
        </UCard>

        <!-- Информация о компании -->
        <UCard v-if="vacancy.company_name || vacancy.company_size || vacancy.company_industry">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-building" class="w-5 h-5 mr-2" />
              О компании
            </h2>
          </template>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-if="vacancy.company_name">
              <dt class="text-sm font-medium text-gray-500 mb-1">Название</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.company_name }}</dd>
            </div>
            <div v-if="vacancy.company_size">
              <dt class="text-sm font-medium text-gray-500 mb-1">Размер</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.company_size }}</dd>
            </div>
            <div v-if="vacancy.company_industry">
              <dt class="text-sm font-medium text-gray-500 mb-1">Отрасль</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.company_industry }}</dd>
            </div>
            <div v-if="vacancy.company_website">
              <dt class="text-sm font-medium text-gray-500 mb-1">Сайт</dt>
              <dd class="text-sm text-gray-900">
                <a :href="vacancy.company_website" target="_blank" class="text-blue-600 hover:underline">
                  {{ vacancy.company_website }}
                </a>
              </dd>
            </div>
          </div>
        </UCard>

        <!-- Условия работы -->
        <UCard v-if="vacancy.work_schedule || vacancy.work_office || vacancy.team_size">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-settings" class="w-5 h-5 mr-2" />
              Условия работы
            </h2>
          </template>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-if="vacancy.work_schedule">
              <dt class="text-sm font-medium text-gray-500 mb-1">График</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.work_schedule }}</dd>
            </div>
            <div v-if="vacancy.work_office">
              <dt class="text-sm font-medium text-gray-500 mb-1">Офис</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.work_office }}</dd>
            </div>
            <div v-if="vacancy.team_size">
              <dt class="text-sm font-medium text-gray-500 mb-1">Размер команды</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.team_size }} человек</dd>
            </div>
          </div>
        </UCard>

        <!-- Навыки -->
        <UCard v-if="vacancy.skills?.length">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-code" class="w-5 h-5 mr-2" />
              Требуемые навыки
            </h2>
          </template>
          <div class="space-y-4">
            <div
              v-for="category in groupedSkills"
              :key="category.name"
              class="space-y-2"
            >
              <h3 class="text-sm font-medium text-gray-700">{{ category.name }}</h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="skill in category.skills"
                  :key="skill.id"
                  :color="skill.required ? 'primary' : 'neutral'"
                  :variant="skill.required ? 'solid' : 'soft'"
                  size="md"
                  class="font-medium"
                >
                  {{ skill.name }}
                  <span v-if="skill.level_name" class="ml-1 opacity-75">
                    ({{ skill.level_name }})
                  </span>
                  <span v-if="!skill.required" class="ml-1 opacity-75">
                    (желательно)
                  </span>
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Льготы -->
        <UCard v-if="vacancy.benefits?.length">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-gift" class="w-5 h-5 mr-2" />
              Льготы и преимущества
            </h2>
          </template>
          <div class="space-y-4">
            <div
              v-for="type in groupedBenefits"
              :key="type.name"
              class="space-y-2"
            >
              <h3 class="text-sm font-medium text-gray-700">{{ type.name }}</h3>
              <div class="space-y-2">
                <div
                  v-for="benefit in type.benefits"
                  :key="benefit.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span class="font-medium">{{ benefit.name }}</span>
                  <span v-if="benefit.value" class="text-sm text-gray-600">
                    {{ benefit.value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Обязанности -->
        <UCard v-if="vacancy.responsibilities?.length">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-list" class="w-5 h-5 mr-2" />
              Обязанности
            </h2>
          </template>
          <div class="space-y-3">
            <div
              v-for="(responsibility, index) in vacancy.responsibilities"
              :key="responsibility.id"
              class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {{ index + 1 }}
              </span>
              <span class="text-gray-900">{{ responsibility.title }}</span>
            </div>
          </div>
        </UCard>

        <!-- Дополнительные требования -->
        <UCard v-if="vacancy.requirements_text">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-clipboard-check" class="w-5 h-5 mr-2" />
              Дополнительные требования
            </h2>
          </template>
          <div class="prose max-w-none">
            <p class="text-gray-700 leading-relaxed">{{ vacancy.requirements_text }}</p>
          </div>
        </UCard>

        <!-- Дополнительная информация -->
        <UCard v-if="vacancy.probation_period || vacancy.vacation_days || vacancy.growth_opportunities">
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-info" class="w-5 h-5 mr-2" />
              Дополнительная информация
            </h2>
          </template>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-if="vacancy.probation_period">
              <dt class="text-sm font-medium text-gray-500 mb-1">Испытательный срок</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.probation_period }}</dd>
            </div>
            <div v-if="vacancy.vacation_days">
              <dt class="text-sm font-medium text-gray-500 mb-1">Отпуск</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.vacation_days }} дней</dd>
            </div>
            <div v-if="vacancy.growth_opportunities">
              <dt class="text-sm font-medium text-gray-500 mb-1">Развитие</dt>
              <dd class="text-sm text-gray-900">{{ vacancy.growth_opportunities }}</dd>
            </div>
          </div>
        </UCard>

        <!-- Метаданные -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold flex items-center">
              <UIcon name="i-lucide-calendar" class="w-5 h-5 mr-2" />
              Информация о вакансии
            </h2>
          </template>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <dt class="text-sm font-medium text-gray-500 mb-1">ID вакансии</dt>
              <dd class="text-sm text-gray-900">#{{ vacancy.id }}</dd>
            </div>
            <div v-if="vacancy.created_at">
              <dt class="text-sm font-medium text-gray-500 mb-1">Дата создания</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(vacancy.created_at) }}</dd>
            </div>
            <div v-if="vacancy.updated_at">
              <dt class="text-sm font-medium text-gray-500 mb-1">Последнее обновление</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(vacancy.updated_at) }}</dd>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
