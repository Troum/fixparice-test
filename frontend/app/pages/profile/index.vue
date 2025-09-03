<script setup lang="ts">
import { useAuth } from '~/composable/useAuth'
import { useRbac } from '~/composable/useRbac'

const { user, logout } = useAuth()
const { getRoleDisplayName, getRoleBadgeColor } = useRbac()

useHead({
  title: 'Профиль пользователя'
})

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString('ru-RU')
}
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Навигация -->
      <div class="mb-6">
        <UButton
          icon="i-lucide-arrow-left"
          variant="ghost"
          @click="$router.push('/jobs')"
        >
          Назад к вакансиям
        </UButton>
      </div>

      <!-- Заголовок -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Профиль пользователя</h1>
        <p class="text-gray-600">Информация об аккаунте и правах доступа</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Основная информация -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="i-lucide-user" class="w-5 h-5" />
              <h3 class="text-lg font-semibold">Основная информация</h3>
            </div>
          </template>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full flex items-center justify-center">
                <Icon name="i-lucide-user" class="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900">{{ user?.username }}</h4>
                <p class="text-gray-600">{{ user?.email }}</p>
                <UBadge
                  :color="getRoleBadgeColor()"
                  variant="subtle"
                  class="mt-1"
                >
                  {{ getRoleDisplayName() }}
                </UBadge>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <dt class="text-sm font-medium text-gray-500">ID пользователя</dt>
                <dd class="text-sm text-gray-900">#{{ user?.id }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Статус</dt>
                <dd class="text-sm text-gray-900">
                  <UBadge
                    :color="user?.status === 1 ? 'success' : 'error'"
                    variant="subtle"
                  >
                    {{ user?.status === 1 ? 'Активный' : 'Неактивный' }}
                  </UBadge>
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Дата регистрации</dt>
                <dd class="text-sm text-gray-900">{{ user?.created_at ? formatDate(user.created_at) : '-' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Последнее обновление</dt>
                <dd class="text-sm text-gray-900">{{ user?.updated_at ? formatDate(user.updated_at) : '-' }}</dd>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Информация о роли -->
        <RoleInfo />
      </div>

      <!-- Действия -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-lucide-settings" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Действия</h3>
          </div>
        </template>

        <div class="flex gap-3">
          <UButton
            icon="i-lucide-log-out"
            color="error"
            variant="outline"
            @click="logout"
          >
            Выйти из системы
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
