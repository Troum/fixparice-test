<script setup lang="ts">
import { useApi } from '~/composable/useApi'
import { useConfirm } from '~/composable/useConfirm'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { getVacancy, deleteVacancy: apiDeleteVacancy } = useApi()
const { confirm } = useConfirm()

const id = route.params.id as string

const vacancy = ref()
const loading = ref(true)
const error = ref(null)

const expandFields = ref('created_at,updated_at')

const fetchVacancy = async () => {
  loading.value = true
  error.value = null

  try {
    vacancy.value = await getVacancy(id, expandFields.value)
  } catch (err: any) {
    error.value = err
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось загрузить вакансию',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchVacancy()
})

const editVacancy = () => {
  router.push(`/demo/${id}/edit`)
}

const deleteVacancy = () => {
  confirm(
    'Удаление вакансии',
    'Вы уверены, что хотите удалить эту вакансию? Это действие нельзя отменить.',
    'Удалить',
    async () => {
      try {
        await apiDeleteVacancy(id)
        toast.add({
          title: 'Успех',
          description: 'Вакансия удалена',
          color: 'success'
        })
        router.push('/demo')
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

// Форматирование данных
const formatSalary = (salary: number) => {
  return salary ? `${new Intl.NumberFormat('ru-RU').format(salary)} ₽` : 'Не указана'
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString('ru-RU')
}

const getStatusText = (status: number) => {
  return status === 1 ? 'Активная' : 'Архивная'
}

const getStatusColor = (status: number): any => {
  return status === 1 ? 'success' : 'error'
}
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

      <UCard v-else-if="error" class="border-red-200">
        <div class="text-center py-8">
          <div class="text-red-500 mb-4">
            <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto" />
          </div>
          <h3 class="text-lg font-semibold text-red-700 mb-2">Ошибка загрузки</h3>
          <p class="text-gray-600 mb-4">Не удалось загрузить информацию о вакансии</p>
          <UButton @click="fetchVacancy" color="error" variant="outline">
            Попробовать снова
          </UButton>
        </div>
      </UCard>

      <div v-else-if="vacancy" class="space-y-6">
        <UCard>
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ vacancy.title }}</h1>
              <div class="flex items-center gap-4">
                <UBadge
                  :color="getStatusColor(vacancy.status)"
                  variant="subtle"
                  size="lg"
                >
                  {{ getStatusText(vacancy.status) }}
                </UBadge>
                <span class="text-2xl font-semibold text-green-600">
                  {{ formatSalary(vacancy.salary) }}
                </span>
              </div>
            </div>

            <div class="flex gap-2">
              <UButton
                icon="i-lucide-edit"
                color="info"
                variant="outline"
                @click="editVacancy"
              >
                Редактировать
              </UButton>
              <UButton
                icon="i-lucide-trash"
                color="error"
                variant="outline"
                @click="deleteVacancy"
              >
                Удалить
              </UButton>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Описание вакансии</h2>
          </template>

          <div class="prose max-w-none">
            <p class="text-gray-700 leading-relaxed">
              {{ vacancy.description || 'Описание отсутствует' }}
            </p>
          </div>
        </UCard>

        <!-- Дополнительная информация -->
        <UCard v-if="vacancy.created_at || vacancy.updated_at">
          <template #header>
            <h2 class="text-xl font-semibold">Дополнительная информация</h2>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-if="vacancy.created_at">
              <dt class="text-sm font-medium text-gray-500 mb-1">Дата создания</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(vacancy.created_at) }}</dd>
            </div>

            <div v-if="vacancy.updated_at">
              <dt class="text-sm font-medium text-gray-500 mb-1">Последнее обновление</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(vacancy.updated_at) }}</dd>
            </div>

            <div>
              <dt class="text-sm font-medium text-gray-500 mb-1">ID вакансии</dt>
              <dd class="text-sm text-gray-900">#{{ vacancy.id }}</dd>
            </div>
          </div>
        </UCard>

        <!-- Параметры отображения -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Настройки отображения</h2>
          </template>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Дополнительные поля
              </label>
              <USelect
                v-model="expandFields"
                placeholder="Только основные поля"
                :items="[
                  { label: 'С датами создания и обновления', value: 'created_at,updated_at' },
                  { label: 'Только дата создания', value: 'created_at' },
                  { label: 'Только дата обновления', value: 'updated_at' }
                ]"
                @change="fetchVacancy"
              />
            </div>

            <UButton
              icon="i-lucide-refresh-cw"
              variant="outline"
              @click="fetchVacancy"
            >
              Обновить данные
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
