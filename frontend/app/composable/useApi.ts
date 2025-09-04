import {useAppStore} from "~/store/useAppStore";
import type {SuccessResponse} from "~/interfaces/SuccessResponse";

export function useApi() {
    const config = useRuntimeConfig()

    function getAuthHeaders(): Record<string, string> {
        const appStore = useAppStore()
        const token = appStore.getToken?.access_token
        const tokenType = appStore.getToken?.token_type
        return token ? { Authorization: `${tokenType} ${token}` } : {}
    }

    function buildBaseHeaders(requiresAuth: boolean = false): Record<string, string> {
        const base: Record<string, string> = { Accept: 'application/json' }
        const auth = requiresAuth ? getAuthHeaders() : {}
        return { ...base, ...auth }
    }

    async function get<T = unknown>(endpoint: string, requiresAuth: boolean = false): Promise<T> {
        const url = `${config.public.apiBase}/${endpoint}`
        const headers = buildBaseHeaders(requiresAuth)

        try {
            return await $fetch(url, {
                headers,
            })
        } catch (error) {
            throw error
        }
    }

    async function post<T = unknown>(
        endpoint: string,
        data: any,
        requiresAuth: boolean = false,
        isFormData: boolean = false
    ): Promise<T> {
        const headers: Record<string, string> = buildBaseHeaders(requiresAuth)

        if (!isFormData && !(data instanceof FormData)) {
            headers['Content-Type'] = 'application/json'
        }

        return await $fetch(`${config.public.apiBase}/${endpoint}`, {
            method: 'POST',
            body: data,
            headers,
        })
    }

    async function patch<T = unknown>(
        endpoint: string,
        data: any,
        requiresAuth: boolean = false,
    ): Promise<T> {
        const headers: Record<string, string> = buildBaseHeaders(requiresAuth)

        headers['Content-Type'] = 'application/json'

        return await $fetch(`${config.public.apiBase}/${endpoint}`, {
            method: 'PATCH',
            body: data,
            headers,
        })
    }
    async function del<T = unknown>(endpoint: string, requiresAuth: boolean = false): Promise<T> {
        return await $fetch(`${config.public.apiBase}/${endpoint}`, {
            method: 'DELETE',
            headers: buildBaseHeaders(requiresAuth),
        })
    }

    async function login(data: Record<string, unknown>): Promise<any> {
        return await post('auth/login', data)
    }

    async function logout(): Promise<any> {
        return await post('auth/logout', {}, true)
    }

    async function logoutAll(): Promise<any> {
        return await post('auth/logout-all', {}, true)
    }

    async function me(): Promise<SuccessResponse> {
        return await get('auth/me', true)
    }

    async function refresh() {
        return await get('auth/refresh', true)
    }

    async function tokens() {
        return await get('auth/tokens', true)
    }

    async function getVacanciesStats() {
        return await get('vacancies/stats', true)
    }

    async function getVacancy(id: string | number, expand?: string[]) {
        const expandParam = expand ? expand.join(',') : 'location,skills,benefits,responsibilities'
        return await get(`vacancies/${id}?expand=${expandParam}`, true)
    }

    async function createVacancy(data: Record<string, unknown>) {
        return await post('vacancies', data, true)
    }

    async function updateVacancy(id: string | number, data: Record<string, unknown>) {
        return await patch(`vacancies/${id}`, data, true)
    }

    async function deleteVacancy(id: string | number) {
        return await del(`vacancies/${id}`, true)
    }

    // Справочники
    async function getLocations() {
        return await get('locations', false)
    }

    async function getSkills(category?: string) {
        const params = category ? `?category=${category}` : ''
        return await get(`skills${params}`, false)
    }

    async function getSkillCategories() {
        return await get('skills/categories', false)
    }

    async function getBenefits(type?: string) {
        const params = type ? `?type=${type}` : ''
        return await get(`benefits${params}`, false)
    }

    async function getBenefitTypes() {
        return await get('benefits/types', false)
    }

    const usePaginatedData = <T = any>(endpoint: string, requiresAuth: boolean = false) => {
        const data = ref<{items: T[], links: {}, meta: {}}>()
        const pending = ref(false)
        const error = ref<Error | null>(null)

        const fetchData = async (params?: {
            page?: number,
            perPage?: number,
            sort?: string,
            [key: string]: any
        }) => {
            pending.value = true
            error.value = null

            try {
                let url = endpoint
                if (params) {
                    const searchParams = new URLSearchParams()
                    Object.entries(params).forEach(([key, value]) => {
                        if (value !== undefined && value !== null) {
                            searchParams.append(key, String(value))
                        }
                    })
                    url = `${endpoint}?${searchParams.toString()}`
                }
                data.value = await get<{items: T[], links: {}, meta: {}}>(url, requiresAuth)
            } catch (err: any) {
                error.value = err
            } finally {
                pending.value = false
            }
        }

        return {
            data: readonly(data),
            pending: readonly(pending),
            error: readonly(error),
            fetchData,
            items: computed(() => data.value?.items ?? []),
            meta: computed(() => data.value?.meta ?? {}),
            links: computed(() => data.value?.links ?? {})
        }
    }

    return {
        login,
        logout,
        me,
        get,
        post,
        put: patch,  // Для совместимости
        patch,       // Основной метод обновления
        delete: del,
        usePaginatedData,
        // Вакансии
        getVacanciesStats,
        getVacancy,
        createVacancy,
        updateVacancy,
        deleteVacancy,
        // Справочники
        getLocations,
        getSkills,
        getSkillCategories,
        getBenefits,
        getBenefitTypes,
        // Авторизация
        refresh,
        tokens
    }
}
