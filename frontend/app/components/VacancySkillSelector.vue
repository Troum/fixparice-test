<script setup lang="ts">
import type { SkillInterface } from '~/interfaces/VacancyInterface'
import { useApi } from '~/composable/useApi'

interface Props {
  modelValue: boolean
  selectedSkills: Array<{ id: number; required: boolean; level?: string }>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [skill: SkillInterface]
}>()

// API
const { getSkills, getSkillCategories } = useApi()

// Управление модалкой (Nuxt UI v3 — v-model:open)
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

// Данные
const skills = ref<SkillInterface[]>([])
const categories = ref<Record<string, string>>({})
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<'all' | string>('all')

// Опции категорий под USelect v3
const categoryOptions = computed(() => [
  { label: 'Все категории', value: 'all' },
  ...Object.entries(categories.value).map(([value, label]) => ({ label, value }))
])

// Фильтрация
const filteredSkills = computed(() => {
  let list = skills.value

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.category_name.toLowerCase().includes(q)
    )
  }

  if (selectedCategory.value !== 'all') {
    list = list.filter(s => s.category === selectedCategory.value)
  }

  return list
})

// Помощники
const isSelected = (id: number) => props.selectedSkills.some(s => s.id === id)

const toggleSkill = (skill: SkillInterface) => {
  if (!isSelected(skill.id)) emit('select', skill)
}

// Ленивая загрузка при открытии
watch(isOpen, async (open) => {
  if (open && skills.value.length === 0) {
    loading.value = true
    try {
      const [skillsRes, categoriesRes] = await Promise.all([await getSkills() as any, await getSkillCategories() as any])
      skills.value = skillsRes.items || []
      categories.value = categoriesRes.categories || {}
    } catch (e) {
      console.error('Error loading skills:', e)
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <!-- Nuxt UI v3 -->
  <UModal v-model:open="isOpen" :ui="{ body: 'p-4 sm:p-6', footer: 'justify-between' }">
    <template #header="{ close }">
      <div class="flex items-center justify-between w-full">
        <h3 class="text-lg font-semibold text-highlighted">Выбор навыков</h3>
        <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="sm" aria-label="Закрыть" @click="close" />
      </div>
    </template>

    <template #body>
      <div class="space-y-4">
        <!-- Поиск + фильтр -->
        <div class="flex gap-3">
          <UInput
              v-model="searchQuery"
              placeholder="Поиск навыков..."
              class="flex-1"
              icon="i-lucide-search"
              variant="outline"
          />

          <USelect
              v-model="selectedCategory"
              :items="categoryOptions"
              placeholder="Все категории"
              class="w-56"
          />
        </div>

        <!-- Список навыков -->
        <div class="max-h-96 overflow-y-auto">
          <div v-if="loading" class="text-center py-8">
            <UIcon name="i-lucide-loader-circle" class="w-6 h-6 animate-spin mx-auto mb-2" />
            <p class="text-muted">Загрузка навыков…</p>
          </div>

          <div v-else-if="filteredSkills.length === 0" class="text-center py-8 text-muted">
            Навыки не найдены
          </div>

          <div v-else class="space-y-2">
            <div
                v-for="skill in filteredSkills"
                :key="skill.id"
                class="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10 cursor-pointer transition"
                :class="{
                'bg-primary/10 border-primary': isSelected(skill.id)
              }"
                @click="toggleSkill(skill)"
            >
              <div class="flex-1">
                <div class="font-medium">{{ skill.name }}</div>
                <div class="text-sm text-muted">{{ skill.category_name }}</div>
              </div>

              <UIcon
                  v-if="isSelected(skill.id)"
                  name="i-lucide-check"
                  class="w-5 h-5 text-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <span class="text-sm text-muted">Выбрано: {{ selectedSkills.length }}</span>
      <div class="flex gap-2">
        <UButton color="neutral" variant="outline" @click="close">Готово</UButton>
      </div>
    </template>
  </UModal>
</template>
