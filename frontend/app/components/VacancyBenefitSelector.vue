<script setup lang="ts">
import type { BenefitInterface } from '~/interfaces/VacancyInterface'
import { useApi } from '~/composable/useApi'

interface Props {
  modelValue: boolean
  selectedBenefits: Array<{ id: number; value?: string }>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [benefit: BenefitInterface]
}>()

// API
const { getBenefits, getBenefitTypes } = useApi()

// Управление модалкой (Nuxt UI v3 — v-model:open)
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

// Состояние
const benefits = ref<BenefitInterface[]>([])
const types = ref<Record<string, string>>({})
const loading = ref(false)
const searchQuery = ref('')
const selectedType = ref<'all' | string>('all')

// Опции для USelect v3
const typeOptions = computed(() => [
  { label: 'Все типы', value: 'all' },
  ...Object.entries(types.value).map(([value, label]) => ({ label, value }))
])

// Фильтрация
const filteredBenefits = computed(() => {
  let list = benefits.value

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.type_name.toLowerCase().includes(q) ||
        (b.description && b.description.toLowerCase().includes(q))
    )
  }

  if (selectedType.value !== 'all') {
    list = list.filter(b => b.type === selectedType.value)
  }

  return list
})

// Helpers
const isSelected = (id: number) => props.selectedBenefits.some(b => b.id === id)

const toggleBenefit = (benefit: BenefitInterface) => {
  if (!isSelected(benefit.id)) emit('select', benefit)
}

// Ленивая загрузка при открытии
watch(isOpen, async (open) => {
  if (open && benefits.value.length === 0) {
    loading.value = true
    try {
      const [benefitsRes, typesRes] = await Promise.all([await getBenefits() as any, await getBenefitTypes() as any])
      benefits.value = benefitsRes?.items ?? []
      types.value = typesRes?.types ?? {}
    } catch (e) {
      console.error('Error loading benefits:', e)
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ body: 'p-4 sm:p-6', footer: 'justify-between' }">
    <template #header="{ close }">
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-semibold">Выбор льгот</h3>
        <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" aria-label="Закрыть" @click="close" />
      </div>
    </template>

    <template #body>
      <div class="space-y-4">
        <!-- Поиск и фильтр -->
        <div class="flex gap-3">
          <UInput
              v-model="searchQuery"
              placeholder="Поиск льгот..."
              class="flex-1"
              icon="i-lucide-search"
              variant="outline"
          />

          <USelect
              v-model="selectedType"
              :items="typeOptions"
              placeholder="Все типы"
              class="w-56"
          />
        </div>

        <!-- Список льгот -->
        <div class="max-h-96 overflow-y-auto">
          <div v-if="loading" class="text-center py-8">
            <UIcon name="i-lucide-loader-circle" class="w-6 h-6 animate-spin mx-auto mb-2" />
            <p class="text-muted">Загрузка льгот…</p>
          </div>

          <div v-else-if="filteredBenefits.length === 0" class="text-center py-8 text-muted">
            Льготы не найдены
          </div>

          <div v-else class="space-y-2">
            <div
                v-for="benefit in filteredBenefits"
                :key="benefit.id"
                class="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10 cursor-pointer transition"
                :class="{ 'bg-primary/10 border-primary': isSelected(benefit.id) }"
                @click="toggleBenefit(benefit)"
            >
              <div class="flex-1">
                <div class="font-medium">{{ benefit.name }}</div>
                <div class="text-sm text-muted">
                  {{ benefit.type_name }}
                  <span v-if="benefit.description"> • {{ benefit.description }}</span>
                </div>
              </div>

              <UIcon
                  v-if="isSelected(benefit.id)"
                  name="i-lucide-check"
                  class="w-5 h-5 text-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <span class="text-sm text-muted">Выбрано: {{ selectedBenefits.length }}</span>
      <div class="flex gap-2">
        <UButton color="neutral" variant="outline" @click="close">Готово</UButton>
      </div>
    </template>
  </UModal>
</template>
