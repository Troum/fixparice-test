<script setup lang="ts">
import { useApi } from '~/composable/useApi'
import JobForm from '~/components/JobForm.vue'

const router = useRouter()
const toast = useToast()
const { createVacancy } = useApi()

const loading = ref(false)

const handleSubmit = async (formData: any) => {
  loading.value = true

  try {
    const response = await createVacancy(formData)

    toast.add({
      title: 'Успех!',
      description: 'Вакансия успешно создана',
      color: 'success'
    })

    if (response && (response as any).id) {
      router.push(`/demo/${(response as any).id}`)
    } else {
      router.push('/demo')
    }
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
  router.push('/demo')
}

definePageMeta({
  middleware: 'demo'
})

useHead({
  title: 'Демо - Создание вакансии'
})
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Демо баннер -->
      <UAlert
        icon="i-lucide-info"
        color="info"
        variant="subtle"
        title="Демо режим"
        description="Создание вакансии в демо режиме"
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

      <JobForm
        :loading="loading"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />

      <UCard class="mt-6 border-blue-200 bg-blue-50">
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-1">Советы по созданию вакансии:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Используйте четкое и понятное название должности</li>
              <li>Подробно опишите обязанности и требования</li>
              <li>Укажите реальный размер заработной платы</li>
              <li>Проверьте правописание перед публикацией</li>
            </ul>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
