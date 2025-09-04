<!-- components/VacancyCard.vue -->
<template>
  <UCard :class="[{ 'opacity-75 bg-muted/30': vacancy.status === 0 }]">
    <!-- HEADER -->
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-highlighted">{{ vacancy.title }}</h3>
          <div v-if="vacancy.company_name" class="text-sm text-muted mt-1">
            {{ vacancy.company_name }}
            <span v-if="vacancy.company_industry"> • {{ vacancy.company_industry }}</span>
          </div>
        </div>

        <UBadge
            :color="vacancy.status === 1 ? 'primary' : 'neutral'"
            :variant="vacancy.status === 1 ? 'soft' : 'subtle'"
            class="shrink-0"
        >
          {{ vacancy.status_text || (vacancy.status === 1 ? 'Активная' : 'Архивная') }}
        </UBadge>
      </div>
    </template>

    <!-- BODY -->
    <div class="space-y-4">
      <!-- Зарплата -->
      <div v-if="vacancy.salary" class="flex items-center text-2xl font-bold text-emerald-600">
        <UIcon name="i-mdi-currency-rub" class="size-6 mr-2" />
        <span>{{ formatSalary(vacancy.salary) }}</span>
      </div>

      <!-- Локация и тип работы -->
      <div class="flex flex-wrap gap-4 text-sm text-muted">
        <div v-if="vacancy.location" class="flex items-center">
          <UIcon name="i-lucide-map-pin" class="size-4 mr-1" />
          <span>{{ vacancy.location.full_name }}</span>
        </div>
        <div v-if="vacancy.position_type_name" class="flex items-center">
          <UIcon name="i-lucide-briefcase" class="size-4 mr-1" />
          <span>{{ vacancy.position_type_name }}</span>
        </div>
        <div v-if="vacancy.experience_required" class="flex items-center">
          <UIcon name="i-lucide-clock" class="size-4 mr-1" />
          <span>{{ vacancy.experience_required }}</span>
        </div>
      </div>

      <!-- Описание -->
      <div class="text-sm leading-relaxed text-foreground">
        <div v-if="vacancy.description" class="line-clamp-3">
          <TiptapRendererComponent :content="vacancy.description" />
        </div>
        <p v-else-if="vacancy.requirements_text" class="line-clamp-3 text-muted-foreground">
          {{ vacancy.requirements_text }}
        </p>
      </div>

      <!-- Навыки -->
      <div v-if="vacancy.skills?.length" class="mt-3">
        <div class="flex flex-wrap gap-2">
          <UBadge
              v-for="skill in vacancy.skills.slice(0, 4)"
              :key="skill.id"
              size="xs"
              :color="skill.required ? 'primary' : 'neutral'"
              variant="soft"
              class="font-medium"
          >
            {{ skill.name }}
            <span v-if="skill.level_name" class="ml-1 text-xs opacity-75">
              ({{ skill.level_name }})
            </span>
          </UBadge>

          <UBadge
              v-if="vacancy.skills.length > 4"
              size="xs"
              color="neutral"
              variant="subtle"
          >
            +{{ vacancy.skills.length - 4 }}
          </UBadge>
        </div>
      </div>

      <!-- Преимущества -->
      <div v-if="vacancy.benefits?.length" class="mt-3">
        <div class="flex flex-wrap gap-3">
          <span
              v-for="benefit in vacancy.benefits.slice(0, 3)"
              :key="benefit.id"
              class="flex items-center text-xs text-muted"
          >
            <UIcon name="i-lucide-gift" class="size-4 mr-1" />
            {{ benefit.name }}
            <span v-if="benefit.value" class="ml-1 opacity-75">
              ({{ benefit.value }})
            </span>
          </span>

          <span v-if="vacancy.benefits.length > 3" class="text-xs text-muted">
            +{{ vacancy.benefits.length - 3 }} ещё
          </span>
        </div>
      </div>

      <!-- Условия работы -->
      <div v-if="vacancy.work_schedule || vacancy.team_size || vacancy.vacation_days" class="mt-3">
        <div class="flex flex-wrap gap-3 text-xs text-muted">
          <span v-if="vacancy.work_schedule" class="flex items-center">
            <UIcon name="i-lucide-clock" class="size-4 mr-1" />
            {{ vacancy.work_schedule }}
          </span>
          <span v-if="vacancy.team_size" class="flex items-center">
            <UIcon name="i-lucide-users" class="size-4 mr-1" />
            Команда {{ vacancy.team_size }} чел.
          </span>
          <span v-if="vacancy.vacation_days" class="flex items-center">
            <UIcon name="i-lucide-calendar" class="size-4 mr-1" />
            Отпуск {{ vacancy.vacation_days }} дней
          </span>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <template #footer>
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center text-sm text-muted">
          <UIcon name="i-lucide-calendar" class="size-4 mr-1" />
          <span>{{ formatDate(vacancy.created_at) }}</span>
          <!-- <NuxtTime :datetime="vacancy.created_at * 1000" locale="ru-RU" year="numeric" month="2-digit" day="2-digit" /> -->
        </div>

        <div class="flex gap-2">
          <UButton
              variant="ghost"
              size="sm"
              icon="i-lucide-eye"
              label="Подробнее"
              @click="$emit('view', vacancy.id)"
          />
          <UButton
              color="primary"
              size="sm"
              icon="i-lucide-pencil"
              label="Редактировать"
              @click="$emit('edit', vacancy.id)"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { VacancyInterface } from '~/interfaces/VacancyInterface'

interface Props {
  vacancy: VacancyInterface
}

defineProps<Props>()

defineEmits<{
  view: [id: number]
  edit: [id: number]
}>()

const formatSalary = (salary?: number | null): string => {
  if (!salary && salary !== 0) return '—'
  return new Intl.NumberFormat('ru-RU').format(salary) + ' ₽'
}

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return ''
  return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
