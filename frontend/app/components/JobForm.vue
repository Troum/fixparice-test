<script setup lang="ts">
import type {InferType} from 'yup'
import * as yup from 'yup'
import type {FormSubmitEvent} from '@nuxt/ui'
import TiptapEditorComponent from "~/components/TiptapEditorComponent.vue";
import {useUtility} from "~/composable/useUtility";

const {validateTiptapContent} = useUtility()

const schema = yup.object({
  title: yup
      .string()
      .required('Название вакансии обязательно')
      .min(3, 'Название должно содержать минимум 3 символа')
      .max(255, 'Название не должно превышать 255 символов'),
  description: yup
      .mixed()
      .required('Содержимое обязательно')
      .test('content-validation', 'Содержимое не может быть пустым', validateTiptapContent),
  salary: yup
      .number()
      .required('Зарплата обязательна')
      .min(1, 'Зарплата должна быть больше 0')
      .integer('Зарплата должна быть целым числом'),
  status: yup
      .number()
      .required('Статус обязателен')
      .oneOf([0, 1], 'Некорректный статус')
})

type JobFormData = InferType<typeof schema>

interface Props {
  initialData?: Partial<JobFormData>
  isEdit?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  isEdit: false,
  loading: false
})

const emit = defineEmits<{
  submit: [data: JobFormData]
  cancel: []
}>()

const state = reactive<JobFormData>({
  title: props.initialData.title || '',
  description: props.initialData.description || '',
  salary: props.initialData.salary || 0,
  status: props.initialData.status ?? 1
})

const statusOptions = [
  {label: 'Активная', value: 1},
  {label: 'Архивная', value: 0}
]

const onSubmit = (event: FormSubmitEvent<JobFormData>) => {
  emit('submit', event.data)
}

const handleCancel = () => {
  emit('cancel')
}

watch(() => props.initialData, (newData) => {
  Object.assign(state, {
    title: newData.title || '',
    description: newData.description || '',
    salary: newData.salary || null,
    status: newData.status ?? 1
  })
}, {deep: true})
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          {{ isEdit ? 'Редактирование вакансии' : 'Создание новой вакансии' }}
        </h2>
      </template>
      <template #default>
        <div class="flex flex-col gap-y-4">
          <UFormField label="Название вакансии" name="title" required>
            <UInput
                v-model="state.title"
                placeholder="Введите название вакансии"
            />
          </UFormField>

          <UFormField label="Описание" name="description" required>
            <ClientOnly>
              <TiptapEditorComponent
                  v-model="state.description"
                  placeholder="Опишите требования к кандидату, обязанности и условия работы"
                  min-height="300px"/>
            </ClientOnly>
          </UFormField>

          <UFormField label="Зарплата (₽)" name="salary" required help="Укажите размер заработной платы в рублях">
            <UInputNumber
                class="w-full"
                v-model="state.salary"
                :min="1000"
                :step="500"
                :default-value="50000"
                placeholder="50000"
                :format-options="{
                  style: 'decimal',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                  useGrouping: true
                }"
            />
          </UFormField>

          <UFormField label="Статус" name="status" required>
            <USelect
                v-model="state.status"
                :items="statusOptions"
            />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <UButton
              type="button"
              variant="outline"
              @click="handleCancel"
              :disabled="loading"
          >
            Отмена
          </UButton>
          <UButton
              type="submit"
              :loading="loading"
              :disabled="loading"
          >
            {{ isEdit ? 'Сохранить изменения' : 'Создать вакансию' }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>
