<script setup lang="ts">
import { useRbac } from '~/composable/useRbac'

const { 
  userRole, 
  getRoleDisplayName, 
  getRoleBadgeColor,
  canViewVacancies,
  canCreateVacancies,
  canUpdateVacancies,
  canDeleteVacancies,
  canViewStats,
  canManageUsers
} = useRbac()

const permissions = computed(() => {
  const perms = []
  if (canViewVacancies.value) perms.push('Просмотр вакансий')
  if (canCreateVacancies.value) perms.push('Создание вакансий')
  if (canUpdateVacancies.value) perms.push('Редактирование вакансий')
  if (canDeleteVacancies.value) perms.push('Удаление вакансий')
  if (canViewStats.value) perms.push('Просмотр статистики')
  if (canManageUsers.value) perms.push('Управление пользователями')
  return perms
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <Icon name="i-lucide-shield-check" class="w-5 h-5" />
        <h3 class="text-lg font-semibold">Информация о роли</h3>
      </div>
    </template>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Текущая роль</label>
        <UBadge 
          :color="getRoleBadgeColor()" 
          variant="subtle" 
          size="lg"
          class="flex items-center gap-2 w-fit"
        >
          <Icon name="i-lucide-user-check" class="w-4 h-4" />
          {{ getRoleDisplayName() }}
        </UBadge>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Доступные действия</label>
        <div class="space-y-2">
          <div v-for="permission in permissions" :key="permission" class="flex items-center gap-2">
            <Icon name="i-lucide-check" class="w-4 h-4 text-green-600" />
            <span class="text-sm text-gray-700">{{ permission }}</span>
          </div>
          <div v-if="permissions.length === 0" class="text-sm text-gray-500 italic">
            Нет доступных действий
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
