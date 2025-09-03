<script setup lang="ts">
import { useApi } from '~/composable/useApi'
import JobForm from '~/components/JobForm.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { getVacancy, updateVacancy } = useApi()

const id = route.params.id as string

const vacancy = ref()
const loading = ref(false)
const fetchLoading = ref(true)
const error = ref(null)

const fetchVacancy = async () => {
  fetchLoading.value = true
  error.value = null

  try {
    vacancy.value = await getVacancy(id)
  } catch (err: any) {
    error.value = err
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось загрузить данные вакансии',
      color: 'error'
    })
  } finally {
    fetchLoading.value = false
  }
}

const handleSubmit = async (formData: any) => {
  loading.value = true

  try {
    await updateVacancy(id, formData)

    toast.add({
      title: 'Успех!',
      description: 'Вакансия успешно обновлена',
      color: 'success'
    })

    router.push(`/demo/${id}`)
  } catch (error: any) {
    console.error('Ошибка обновления вакансии:', error)

    let errorMessage = 'Не удалось обновить вакансию'

    if (error.data && error.data.errors) {
      const errors = error.data.errors
      if (Array.isArray(errors)) {
        errorMessage = errors.join(', ')
      } else if (typeof errors === 'object') {
        errorMessage = Object.values(errors).flat().join(', ')
      }
    }

    toast.add({
      title: 'Ошибка обновления',
      description: errorMessage,
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push(`/demo/${id}`)
}

onMounted(() => {
  fetchVacancy()
})

definePageMeta({
  middleware: 'demo'
})

useHead({
  title: 'Демо - Редактирование вакансии'
})
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <UAlert
        icon="i-lucide-edit"
        color="info"
        variant="subtle"
        title="Демо редактирование"
        description="Редактирование вакансии в демо режиме"
        class="mb-6"
      />

      <div class="mb-6">
                <UButton
          icon="i-lucide-arrow-left"
          variant="ghost"
          @click="router.push(`/demo/${id}`)"
        >
          Назад к демо вакансии
        </UButton>
      </div>

      <div v-if="fetchLoading" class="flex justify-center items-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-gray-600">Загрузка данных вакансии...</p>
        </div>
      </div>

      <UCard v-else-if="error" class="border-red-200">
        <div class="text-center py-8">
          <div class="text-red-500 mb-4">
            <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto" />
          </div>
          <h3 class="text-lg font-semibold text-red-700 mb-2">Ошибка загрузки</h3>
          <p class="text-gray-600 mb-4">Не удалось загрузить данные вакансии для редактирования</p>
          <div class="space-x-2">
            <UButton @click="fetchVacancy" color="error" variant="outline">
              Попробовать снова
            </UButton>
            <UButton @click="router.push('/demo')" variant="ghost">
              К демо списку
            </UButton>
          </div>
        </div>
      </UCard>

      <div v-else-if="vacancy">
        <JobForm
          :initial-data="vacancy"
          :loading="loading"
          is-edit
          @submit="handleSubmit"
          @cancel="handleCancel"
        />

        <UCard v-if="vacancy.updated_at" class="mt-6 border-gray-200 bg-gray-50">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <UIcon name="i-lucide-clock" class="w-4 h-4" />
            <span>
              Последнее обновление: {{ new Date(vacancy.updated_at * 1000).toLocaleString('ru-RU') }}
            </span>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
