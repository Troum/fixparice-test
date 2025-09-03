<script setup lang="ts">
import type {InferType} from 'yup'
import {object, string} from 'yup'
import type {FormSubmitEvent} from '@nuxt/ui'
import {useApi} from "~/composable/useApi";
import {useAppStore} from "~/store/useAppStore";
import type {SuccessResponse} from "~/interfaces/SuccessResponse";

const schema = object({
  email: string()
      .email('Недействительный email')
      .required('Поле обязательно для заполнения'),
  password: string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Поле обязательно для заполнения')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const toast = useToast()
const { login } = useApi()
const onSubmit = (event: FormSubmitEvent<Schema>) => {
  login(event.data)
      .then((response: SuccessResponse) => {

        useAppStore().setUser(response.data?.user)
        useAppStore().setToken({
          access_token: response.data?.access_token,
          token_type: response.data?.token_type,
          expires_at: response.data?.expires_at,
        })

        useRouter()
            .push('/jobs')
            .then(() => toast.add({title: 'Завершено успешно!', description: 'Успешно вошли в систему', color: 'success'}))
      })
}


definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Вход в систему'
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen w-full">
    <UForm :schema="schema" :state="state" class="space-y-4 w-[480px]" @submit="onSubmit">
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex items-center justify-center">
            <span class="text-2xl">Вход в панель администрирования</span>
          </div>
        </template>
        <div class="flex flex-col items-center justify-center gap-y-4">
          <UFormField label="Логин для входа" name="email" class="w-full">
            <UInput v-model="state.email" placeholder="Введите email"/>
          </UFormField>

          <UFormField label="Пароль для входа" name="password" class="w-full">
            <UInput v-model="state.password" type="password" placeholder="Введите пароль"/>
          </UFormField>
        </div>
        <template #footer>
          <div class="flex items-center justify-end">
            <UButton trailing-icon="i-lucide-log-in" size="lg" type="submit">
              Войти
            </UButton>
          </div>
          <div class="flex items-center justify-center py-1">
            <RouterLink class="underline text-sm" to="/">На главную</RouterLink>
          </div>
        </template>
      </UCard>
    </UForm>
  </div>
</template>
