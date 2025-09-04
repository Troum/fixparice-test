<script setup lang="ts">
import { z } from 'zod'
import type {
  VacancyInterface,
  VacancyFormData,
  LocationInterface,
  SkillInterface,
  BenefitInterface
} from '~/interfaces/VacancyInterface'
import { VACANCY_STATUS, POSITION_TYPES, SKILL_LEVELS } from '~/interfaces/VacancyInterface'
import { useVacancyFormSchema } from "~/composable/useVacancyFormSchema"
import { useApi } from "~/composable/useApi"
import { useFormBuilder } from "~/composable/useFormBuilder"

interface Props {
  vacancy?: VacancyInterface
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: VacancyFormData]
  cancel: []
}>()

// Composables
const { getLocations, getSkills, getBenefits } = useApi()

// Реактивные данные
const isEdit = computed(() => !!props.vacancy)
const showSkillSelector = ref(false)
const showBenefitSelector = ref(false)

// Справочники
const locations = ref<LocationInterface[]>([])
const skills = ref<SkillInterface[]>([])
const benefits = ref<BenefitInterface[]>([])

// Используем FormBuilder
const vacancyRef = toRef(props, 'vacancy')
const vacancyFormSchema = useVacancyFormSchema()
const {
  form: formData,
  touched,
  dirty,
  setField,
  resetToSource,
  resetToDefaults,
  toPayload
} = useFormBuilder(vacancyRef, vacancyFormSchema)

// Опции для селектов
const locationOptions = computed(() => locations.value.map(loc => ({ label: loc.name, value: loc.id })))

const positionTypeOptions = [
  { label: 'Не указано', value: POSITION_TYPES.NONE },
  { label: 'Полная занятость', value: POSITION_TYPES.FULL_TIME },
  { label: 'Частичная занятость', value: POSITION_TYPES.PART_TIME },
  { label: 'Контракт', value: POSITION_TYPES.CONTRACT },
  { label: 'Стажировка', value: POSITION_TYPES.INTERNSHIP }
]

const statusOptions = [
  { label: 'Активная', value: VACANCY_STATUS.ACTIVE },
  { label: 'Архивная', value: VACANCY_STATUS.ARCHIVED }
]

const skillLevelOptions = [
  { label: 'Не указано', value: POSITION_TYPES.NONE },
  { label: 'Junior', value: SKILL_LEVELS.JUNIOR },
  { label: 'Middle', value: SKILL_LEVELS.MIDDLE },
  { label: 'Senior', value: SKILL_LEVELS.SENIOR },
  { label: 'Lead', value: SKILL_LEVELS.LEAD }
]

// Валидация
const schema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  salary: z.number().min(1, 'Зарплата должна быть больше 0'),
  status: z.number()
})

const isFormValid = computed(() => {
  return formData.title && formData.salary && formData.salary > 0
})

// Методы для работы с навыками
const getSkillName = (id: number) => skills.value.find(s => s.id === id)?.name || ''
const getSkillCategory = (id: number) => skills.value.find(s => s.id === id)?.category_name || ''

const addSkill = (skill: SkillInterface) => {
  if (!formData.skills?.some(s => s.id === skill.id)) {
    const newSkills = [...(formData.skills || []), {
      id: skill.id,
      required: true,
      level: SKILL_LEVELS.MIDDLE
    }]
    setField('skills', newSkills)
  }
}

const removeSkill = (index: number) => {
  const newSkills = [...(formData.skills || [])]
  newSkills.splice(index, 1)
  setField('skills', newSkills)
}

// Методы для работы с льготами
const getBenefitName = (id: number) => benefits.value.find(b => b.id === id)?.name || ''
const getBenefitType = (id: number) => benefits.value.find(b => b.id === id)?.type_name || ''

const addBenefit = (benefit: BenefitInterface) => {
  if (!formData.benefits?.some(b => b.id === benefit.id)) {
    const newBenefits = [...(formData.benefits || []), {
      id: benefit.id,
      value: ''
    }]
    setField('benefits', newBenefits)
  }
}

const removeBenefit = (index: number) => {
  const newBenefits = [...(formData.benefits || [])]
  newBenefits.splice(index, 1)
  setField('benefits', newBenefits)
}

// Методы для работы с обязанностями
const addResponsibility = () => {
  const newResponsibilities = [...(formData.responsibilities || []), '']
  setField('responsibilities', newResponsibilities)
}

const removeResponsibility = (index: number) => {
  const newResponsibilities = [...(formData.responsibilities || [])]
  newResponsibilities.splice(index, 1)
  setField('responsibilities', newResponsibilities)
}

// Методы для сброса формы
const handleReset = () => {
  if (isEdit.value) {
    resetToSource()
  } else {
    resetToDefaults()
  }
}

// Отправка формы
const onSubmit = () => {
  if (isFormValid.value) {
    const payload = toPayload()
    emit('submit', payload)
  }
}

// Загрузка справочников
onMounted(async () => {
  try {
    const [locationsRes, skillsRes, benefitsRes] = await Promise.all([
      await getLocations() as any,
      await getSkills() as any,
      await getBenefits() as any
    ])

    locations.value = locationsRes.items
    skills.value = skillsRes.items
    benefits.value = benefitsRes.items
  } catch (error) {
    console.error('Error loading reference data:', error)
  }
})
</script>
<template>
  <div class="vacancy-form">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-gray-900">
          {{ isEdit ? 'Редактировать вакансию' : 'Создать вакансию' }}
        </h2>
      </template>

      <UForm
        :schema="schema"
        :state="formData"
        @submit="onSubmit"
        class="space-y-6"
      >
        <!-- Основная информация -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Название вакансии" name="title" required>
            <UInput
              v-model="formData.title"
              placeholder="Например: Senior PHP Developer"
            />
          </UFormField>

          <UFormField label="Зарплата (₽)" name="salary" required>
            <UInputNumber class="w-full"
              v-model.number="formData.salary"
              placeholder="200000"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormField label="Локация" name="location_id">
            <USelect
              v-model="formData.location_id"
              :items="locationOptions"
              placeholder="Выберите локацию"
              value-attribute="value"
              option-attribute="label"
            />
          </UFormField>

          <UFormField label="Тип позиции" name="position_type">
            <USelect
              v-model="formData.position_type"
              :items="positionTypeOptions"
              placeholder="Выберите тип"
              value-attribute="value"
              option-attribute="label"
            />
          </UFormField>

          <UFormField label="Статус" name="status">
            <USelect
              v-model="formData.status"
              :items="statusOptions"
              value-attribute="value"
              option-attribute="label"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Требуемый опыт" name="experience_required">
            <UInput
              v-model="formData.experience_required"
              placeholder="3-5 лет"
            />
          </UFormField>

          <UFormField label="Требуемое образование" name="education_required">
            <UInput
              v-model="formData.education_required"
              placeholder="Высшее техническое"
            />
          </UFormField>
        </div>

        <!-- Описание вакансии (Tiptap) -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Описание вакансии</h3>
          </template>

          <UFormField label="Подробное описание" name="description">
            <TiptapEditorComponent
              v-model="formData.description"
              placeholder="Введите подробное описание вакансии..."
            />
          </UFormField>
        </UCard>

        <!-- Информация о компании -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Информация о компании</h3>
          </template>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Название компании" name="company_name">
                <UInput v-model="formData.company_name" placeholder="ООО 'ТехКорп'" />
              </UFormField>

              <UFormField label="Сайт компании" name="company_website">
                <UInput v-model="formData.company_website" placeholder="https://example.com" />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Размер компании" name="company_size">
                <UInput v-model="formData.company_size" placeholder="50-100 сотрудников" />
              </UFormField>

              <UFormField label="Отрасль" name="company_industry">
                <UInput v-model="formData.company_industry" placeholder="IT, Финтех, E-commerce" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <!-- Условия работы -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Условия работы</h3>
          </template>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UFormField label="График работы" name="work_schedule">
                <UInput v-model="formData.work_schedule" placeholder="Полный день, гибкий график" />
              </UFormField>

              <UFormField label="Описание офиса" name="work_office">
                <UInput v-model="formData.work_office" placeholder="Современный офис в центре" />
              </UFormField>

              <UFormField label="Размер команды" name="team_size">
                <UInputNumber v-model.number="formData.team_size" placeholder="8" />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UFormField label="Испытательный срок" name="probation_period">
                <UInput v-model="formData.probation_period" placeholder="3 месяца" />
              </UFormField>

              <UFormField label="Дни отпуска" name="vacation_days">
                <UInputNumber v-model.number="formData.vacation_days" placeholder="28" />
              </UFormField>

              <UFormField label="Возможности развития" name="growth_opportunities">
                <UInput v-model="formData.growth_opportunities" placeholder="Карьерный рост, обучение" />
              </UFormField>
            </div>
            <div class="w-full">
              <UFormField class="w-full" label="Дополнительные требования" name="requirements_text">
                <UTextarea
                    v-model="formData.requirements_text"
                    placeholder="Дополнительные требования к кандидату..."
                    :rows="3"
                />
              </UFormField>
            </div>
          </div>
        </UCard>

        <!-- Навыки -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">Навыки</h3>
              <UButton @click="showSkillSelector = true" size="sm" variant="outline">
                <UIcon name="i-lucide-plus" class="w-4 h-4 mr-1" />
                Добавить навык
              </UButton>
            </div>
          </template>

          <div v-if="formData.skills?.length" class="space-y-3">
            <div
              v-for="(skill, index) in formData.skills"
              :key="skill.id"
              class="flex items-center gap-4 p-3 border rounded-lg"
            >
              <div class="flex-1">
                <span class="font-medium">{{ getSkillName(skill.id) }}</span>
                <span class="text-sm text-gray-500 ml-2">({{ getSkillCategory(skill.id) }})</span>
              </div>

              <USelect
                v-model="skill.level"
                :items="skillLevelOptions"
                placeholder="Уровень"
                size="sm"
                class="w-32"
                value-attribute="value"
                option-attribute="label"
              />

              <USwitch
                v-model="skill.required"
              />
              <span class="text-sm text-gray-600 w-20">{{ skill.required ? 'Обязательный' : 'Желательный' }}</span>

              <UButton
                @click="removeSkill(index)"
                color="error"
                variant="ghost"
                size="sm"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </UButton>
            </div>
          </div>

          <div v-else class="text-gray-500 text-center py-8">
            Навыки не добавлены
          </div>
        </UCard>

        <!-- Льготы -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">Льготы и преимущества</h3>
              <UButton @click="showBenefitSelector = true" size="sm" variant="outline">
                <UIcon name="i-lucide-plus" class="w-4 h-4 mr-1" />
                Добавить льготу
              </UButton>
            </div>
          </template>

          <div v-if="formData.benefits?.length" class="space-y-3">
            <div
              v-for="(benefit, index) in formData.benefits"
              :key="benefit.id"
              class="flex items-center gap-4 p-3 border rounded-lg"
            >
              <div class="flex-1">
                <span class="font-medium">{{ getBenefitName(benefit.id) }}</span>
                <span class="text-sm text-gray-500 ml-2">({{ getBenefitType(benefit.id) }})</span>
              </div>

              <UInput
                v-model="benefit.value"
                placeholder="Значение (необязательно)"
                size="sm"
                class="w-48"
              />

              <UButton
                @click="removeBenefit(index)"
                color="error"
                variant="ghost"
                size="sm"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </UButton>
            </div>
          </div>

          <div v-else class="text-gray-500 text-center py-8">
            Льготы не добавлены
          </div>
        </UCard>

        <!-- Обязанности -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">Обязанности</h3>
              <UButton @click="addResponsibility" size="sm" variant="outline">
                <UIcon name="i-lucide-plus" class="w-4 h-4 mr-1" />
                Добавить обязанность
              </UButton>
            </div>
          </template>

          <div v-if="formData.responsibilities?.length" class="space-y-3">
            <div
              v-for="(responsibility, index) in formData.responsibilities"
              :key="index"
              class="flex items-start gap-4"
            >
              <span class="text-gray-400 mt-3 text-sm">{{ index + 1 }}.</span>
              <UInput
                v-model="formData.responsibilities[index]"
                placeholder="Описание обязанности"
                class="flex-1"
              />
              <UButton
                @click="removeResponsibility(index)"
                color="error"
                variant="ghost"
                size="sm"
                class="mt-1"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </UButton>
            </div>
          </div>

          <div v-else class="text-gray-500 text-center py-8">
            Обязанности не добавлены
          </div>
        </UCard>

        <!-- Индикаторы состояния формы -->
        <div v-if="touched || dirty" class="flex items-center gap-4 text-sm text-gray-600 border-t pt-4">
          <div v-if="touched" class="flex items-center gap-1">
            <UIcon name="i-lucide-edit" class="w-4 h-4" />
            <span>Форма изменена</span>
          </div>
          <div v-if="dirty" class="flex items-center gap-1">
            <UIcon name="i-lucide-circle-dot" class="w-4 h-4 text-orange-500" />
            <span>Есть несохраненные изменения</span>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="flex justify-between items-center pt-6">
          <div class="flex gap-2">
            <UButton
              @click="handleReset"
              variant="ghost"
              size="sm"
              :disabled="loading || (!touched && !dirty)"
            >
              <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4 mr-1" />
              {{ isEdit ? 'Сбросить к оригиналу' : 'Очистить форму' }}
            </UButton>
          </div>

          <div class="flex gap-3">
            <UButton
              @click="$emit('cancel')"
              variant="outline"
              :disabled="loading"
            >
              Отмена
            </UButton>
            <UButton
              type="submit"
              :loading="loading"
              :disabled="!isFormValid"
            >
              {{ isEdit ? 'Сохранить изменения' : 'Создать вакансию' }}
            </UButton>
          </div>
        </div>
      </UForm>
    </UCard>

    <!-- Модальные окна для выбора навыков и льгот -->
    <VacancySkillSelector
      v-model="showSkillSelector"
      :selected-skills="formData.skills || []"
      @select="addSkill"
    />

    <VacancyBenefitSelector
      v-model="showBenefitSelector"
      :selected-benefits="formData.benefits || []"
      @select="addBenefit"
    />
  </div>
</template>
