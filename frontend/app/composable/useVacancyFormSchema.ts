import type {TiptapContent, VacancyInterface} from '~/interfaces/VacancyInterface'
import {VACANCY_STATUS} from '~/interfaces/VacancyInterface'

export function useVacancyFormSchema() {
  return {
    // Основные поля
    title: {
      default: '',
      get: (src: VacancyInterface | null) => src?.title || '',
    },

    description: {
      default: () => null as TiptapContent | null,
      get: (src: VacancyInterface | null) => src?.description || null,
    },

    salary: {
      default: () => null as number | null,
      get: (src: VacancyInterface | null) => src?.salary || null,
      cast: (value: any) => value ? parseInt(value) : null,
    },

    status: {
      default: VACANCY_STATUS.ACTIVE,
      get: (src: VacancyInterface | null) => (src?.status ?? VACANCY_STATUS.ACTIVE),
      set: (value: number, draft: any) => {
        draft.status = value
      },
    },

    location_id: {
      default: 5,
      get: (src: VacancyInterface | null) => src?.location?.id || 5,
      set: (value: number, draft: any) => {
        draft.location_id = value
      },
    },

    position_type: {
      default: 'none',
      get: (src: VacancyInterface | null) => src?.position_type || 'none',
      set: (value: string, draft: any) => {
        draft.position_type = value === 'none' ? null : value
      },
    },

    experience_required: {
      default: '',
      get: (src: VacancyInterface | null) => src?.experience_required || '',
    },

    education_required: {
      default: '',
      get: (src: VacancyInterface | null) => src?.education_required || '',
    },

    // Информация о компании
    company_name: {
      default: '',
      get: (src: VacancyInterface | null) => src?.company_name || '',
    },

    company_size: {
      default: '',
      get: (src: VacancyInterface | null) => src?.company_size || '',
    },

    company_industry: {
      default: '',
      get: (src: VacancyInterface | null) => src?.company_industry || '',
    },

    company_website: {
      default: '',
      get: (src: VacancyInterface | null) => src?.company_website || '',
    },

    // Условия работы
    work_schedule: {
      default: '',
      get: (src: VacancyInterface | null) => src?.work_schedule || '',
    },

    work_office: {
      default: '',
      get: (src: VacancyInterface | null) => src?.work_office || '',
    },

    team_size: {
      default: () => null as number | null,
      get: (src: VacancyInterface | null) => src?.team_size || null,
      cast: (value: any) => value ? parseInt(value) : null,
    },

    // Дополнительная информация
    probation_period: {
      default: '',
      get: (src: VacancyInterface | null) => src?.probation_period || '',
    },

    vacation_days: {
      default: () => null as number | null,
      get: (src: VacancyInterface | null) => src?.vacation_days || null,
      cast: (value: any) => value ? parseInt(value) : null,
    },

    growth_opportunities: {
      default: '',
      get: (src: VacancyInterface | null) => src?.growth_opportunities || '',
    },

    requirements_text: {
      default: '',
      get: (src: VacancyInterface | null) => src?.requirements_text || '',
    },

    // Связанные данные
    skills: {
      default: () => [] as Array<{ id: number; required: boolean; level?: string }>,
      get: (src: VacancyInterface | null) =>
          src?.skills?.map(skill => ({
            id: skill.id,
            required: skill.required,
            level: skill.level || 'none'
          })) || [],
      set: (value: Array<{ id: number; required?: boolean; level?: string }>, draft: any) => {
        draft.skills = value.map(skill => ({
          id: skill.id,
          required: skill.required ?? false, // Если не указано - считаем необязательным
          level: skill.level === 'none' ? null : skill.level
        }))
      },
    },

    benefits: {
      default: () => [] as Array<{ id: number; value?: string }>,
      get: (src: VacancyInterface | null) =>
          src?.benefits?.map(benefit => ({
            id: benefit.id,
            value: benefit.value
          })) || [],
    },

    responsibilities: {
      default: () => [] as string[],
      get: (src: VacancyInterface | null) =>
          src?.responsibilities?.map(r => r.title) || [],
    },
  }
}
