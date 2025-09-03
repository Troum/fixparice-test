export interface VacancyInterface {
  id: number
  title: string
  description: string
  salary: number
  status: number
  created_at?: number
  updated_at?: number
}

export interface VacancyFormData {
  title: string
  description: string
  salary: number | null
  status: number
}

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

export interface VacancyStatsInterface {
  total: number
  active: number
  archived: number
  this_month: number
}