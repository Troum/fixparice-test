<script setup lang="ts">
import type { VacancyFormData } from '~/interfaces/VacancyInterface'

definePageMeta({
  title: 'Создание вакансии'
})

const router = useRouter()
const toast = useToast()
const { createVacancy } = useApi()

const loading = ref(false)

const handleSubmit = async (formData: VacancyFormData) => {
  loading.value = true

  try {
    const response = await createVacancy(formData)

    toast.add({
      title: 'Успех!',
      description: 'Вакансия успешно создана',
      color: 'success'
    })

    router.push(`/jobs/${response.id}`)
  } catch (error: any) {
    console.error('Ошибка создания вакансии:', error)

    let errorMessage = 'Не удалось создать вакансию'

    if (error.data && error.data.errors) {
      const errors = error.data.errors
      if (Array.isArray(errors)) {
        errorMessage = errors.join(', ')
      } else if (typeof errors === 'object') {
        errorMessage = Object.values(errors).flat().join(', ')
      }
    }

    toast.add({
      title: 'Ошибка создания',
      description: errorMessage,
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/jobs')
}
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Хлебные крошки -->
      <div class="mb-6">
        <UButton
          icon="i-lucide-arrow-left"
          variant="ghost"
          @click="router.push('/jobs')"
        >
          Назад к списку
        </UButton>
      </div>

      <!-- Форма создания -->
      <VacancyForm
        :loading="loading"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />

      <!-- Подсказки -->
      <UCard class="mt-6 border-blue-200 bg-blue-50">
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-2">Советы по созданию эффективной вакансии:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Используйте четкое и привлекательное название должности</li>
              <li>Добавьте информацию о компании - это повышает доверие</li>
              <li>Укажите конкретные навыки с уровнями (Junior/Middle/Senior)</li>
              <li>Перечислите реальные льготы и преимущества</li>
              <li>Опишите основные обязанности в порядке важности</li>
              <li>Проверьте все данные перед публикацией</li>
            </ul>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>