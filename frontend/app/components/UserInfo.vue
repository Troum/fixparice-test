<script setup lang="ts">
import { useAuth } from '~/composable/useAuth'
import { useConfirm } from '~/composable/useConfirm'
import { useRbac } from '~/composable/useRbac'

const { user, token, getTokenTimeRemainingFormatted, getTokenTimeRemaining, logout } = useAuth()
const { confirm } = useConfirm()
const { getRoleDisplayName, getRoleBadgeColor } = useRbac()

const handleLogout = () => {
  confirm(
    'Подтверждение выхода',
    'После выхода вам потребуется снова войти в систему. Вы уверены?',
    'Выйти',
    async () => {
      await logout()
    }
  )
}

const getTokenStatusColor = () => {
  const timeRemaining = getTokenTimeRemaining()
  if (timeRemaining <= 0) return 'error'
  if (timeRemaining <= 1800) return 'error'
  if (timeRemaining <= 3600) return 'warning'
  if (timeRemaining <= 86400) return 'info'
  return 'success'
}

const getTokenStatusIcon = () => {
  const timeRemaining = getTokenTimeRemaining()
  if (timeRemaining <= 0) return 'i-lucide-x-circle'
  if (timeRemaining <= 3600) return 'i-lucide-alert-triangle'
  if (timeRemaining <= 86400) return 'i-lucide-clock'
  return 'i-lucide-shield-check'
}

const getTokenTooltipText = () => {
  const timeRemaining = getTokenTimeRemaining()
  if (timeRemaining <= 0) {
    return 'Токен истек'
  }
  if (timeRemaining <= 1800) {
    return `Критично: ${getTokenTimeRemainingFormatted()}`
  }
  if (timeRemaining <= 3600) {
    return `Истекает через: ${getTokenTimeRemainingFormatted()}`
  }
  if (timeRemaining <= 86400) {
    return `Истекает сегодня: ${getTokenTimeRemainingFormatted()}`
  }
  const expiryDate = new Date((token.value?.expires_at || 0) * 1000)
  return `Действителен до ${expiryDate.toLocaleDateString('ru-RU')}`
}
</script>

<template>
  <div v-if="user" class="flex items-center gap-4 p-2 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
    <div class="flex items-center gap-3">
      <div class="relative">
        <div class="w-10 h-10 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full flex items-center justify-center shadow-md">
          <UIcon name="i-lucide-user" class="w-5 h-5 text-white" />
        </div>
        <div
          class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors"
          :class="{
            'bg-green-600': getTokenStatusColor() === 'success',
            'bg-slate-500': getTokenStatusColor() === 'info',
            'bg-amber-600': getTokenStatusColor() === 'warning',
            'bg-red-600': getTokenStatusColor() === 'error'
          }"
        />
      </div>

      <div class="min-w-0 cursor-pointer" @click="$router.push('/profile')">
        <div class="font-semibold text-gray-900 truncate hover:text-slate-600 transition-colors">
          {{ user?.username || 'Пользователь' }}
        </div>
        <div>
          <div>
            <span class="text-gray-500 text-xs truncate">{{ user?.email || '' }}</span>
          </div>
          <UBadge
            :color="getRoleBadgeColor()"
            variant="subtle"
            size="xs"
          >
            {{ getRoleDisplayName() }}
          </UBadge>
        </div>
      </div>
    </div>

        <div v-if="token" class="flex items-center">
      <UTooltip :text="getTokenTooltipText()">
        <UBadge
          :color="getTokenStatusColor()"
          variant="subtle"
          class="flex items-center gap-1.5 cursor-help"
        >
          <UIcon :name="getTokenStatusIcon()" class="w-3 h-3" />
          <span class="text-xs">{{ getTokenTimeRemainingFormatted() }}</span>
        </UBadge>
      </UTooltip>
    </div>

    <UButton
      icon="i-lucide-log-out"
      variant="solid"
      size="sm"
      color="error"
      @click="handleLogout"
      class="hover:bg-red-600 transition-colors"
    >
      Выйти
    </UButton>
  </div>
</template>
