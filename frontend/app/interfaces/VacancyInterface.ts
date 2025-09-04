// Tiptap content blocks для description поля
export interface TiptapContent {
  type: string
  content?: TiptapContent[]
  text?: string
  attrs?: Record<string, any>
  marks?: Array<{
    type: string
    attrs?: Record<string, any>
  }>
}

// Локация
export interface LocationInterface {
  id: number
  name: string
  country?: string
  city?: string
  remote_available: boolean
  created_at?: Date
  updated_at?: Date
}

// Навык
export interface SkillInterface {
  id: number
  name: string
  category: string
  category_name: string
}

// Навык в вакансии
export interface VacancySkillInterface {
  id: number
  name: string
  category: string
  category_name: string
  required: boolean
  level?: string
  level_name?: string
}

// "Плюшки"
export interface BenefitInterface {
  id: number
  name: string
  description?: string
  type: string
  type_name: string
}

// "Плюшки" в вакансии
export interface VacancyBenefitInterface {
  id: number
  name: string
  type: string
  type_name: string
  value?: string
}
export interface ResponsibilityInterface {
  id: number
  title: string
  description?: string
  sort_order: number
}
export interface VacancyInterface {
  id: number
  title: string
  description: TiptapContent | null
  salary: number
  status: number
  status_text?: string
  position_type?: string
  position_type_name?: string
  experience_required?: string
  education_required?: string
  // Информация о компании
  company_name?: string
  company_size?: string
  company_industry?: string
  company_website?: string
  // Условия работы
  work_schedule?: string
  work_office?: string
  team_size?: number
  // Дополнительная информация
  probation_period?: string
  vacation_days?: number
  growth_opportunities?: string
  requirements_text?: string
  // Связанные данные
  location?: LocationInterface
  skills?: VacancySkillInterface[]
  benefits?: VacancyBenefitInterface[]
  responsibilities?: ResponsibilityInterface[]
  created_at?: number
  updated_at?: number
}

// Форма создания/редактирования вакансии
export interface VacancyFormData {
  title: string
  description: TiptapContent | any
  salary: number | null
  status: number
  location_id?: number | null
  position_type?: string
  experience_required?: string
  education_required?: string
  // Информация о компании
  company_name?: string
  company_size?: string
  company_industry?: string
  company_website?: string
  // Условия работы
  work_schedule?: string
  work_office?: string
  team_size?: number | null
  // Дополнительная информация
  probation_period?: string
  vacation_days?: number | null
  growth_opportunities?: string
  requirements_text?: string
  // Связанные данные
  skills?: Array<{
    id: number
    required: boolean
    level?: string
  }>
  benefits?: Array<{
    id: number
    value?: string
  }>
  responsibilities?: string[]
}

// Ответ API со списком вакансий
export interface VacancyListResponse {
  items: VacancyInterface[]
  meta: {
    totalCount: number
    pageCount: number
    currentPage: number
    perPage: number
  }
  links: {
    self: string
    first: string
    last: string
  }
}

// Статистика вакансий
export interface VacancyStatsInterface {
  total: number
  active: number
  archived: number
  this_month: number
}

// Справочники
export interface LocationListResponse {
  items: LocationInterface[]
}

export interface SkillListResponse {
  items: SkillInterface[]
  categories: Record<string, string>
}

export interface BenefitListResponse {
  items: BenefitInterface[]
  types: Record<string, string>
}

// Константы
export const VACANCY_STATUS = {
  ACTIVE: 1,
  ARCHIVED: 0
} as const

export const POSITION_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
  NONE: 'none',
} as const

export const SKILL_LEVELS = {
  JUNIOR: 'junior',
  MIDDLE: 'middle',
  SENIOR: 'senior',
  LEAD: 'lead',
  NONE: 'none',
} as const
