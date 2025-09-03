import { useAppStore } from '~/store/useAppStore'
import { useApi } from '~/composable/useApi'

export function useAuth() {
    const appStore = useAppStore()
    const { me, logout: apiLogout } = useApi()

    const isTokenExpired = (): boolean => {
        const tokenData = appStore.getToken
        if (!tokenData?.expires_at) return true

        const now = Math.floor(Date.now() / 1000)
        return now >= tokenData.expires_at
    }

    const isTokenExpiringSoon = (seconds: number = 300): boolean => {
        const tokenData = appStore.getToken
        if (!tokenData?.expires_at) return true

        const now = Math.floor(Date.now() / 1000)
        return (tokenData.expires_at - now) <= seconds
    }

    const isAuthenticated = (): boolean => {
        const token = appStore.getToken
        const user = appStore.getUser

        return !!(token?.access_token && user && !isTokenExpired())
    }

    const getCurrentUser = async () => {
        try {
            const response = await me()
            appStore.setUser((response as any).data)
            return (response as any).data
        } catch (error) {
            console.error('Failed to get current user:', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await apiLogout()
        } catch (error) {
            console.warn('API logout failed:', error)
        } finally {
            appStore.logout()
            await navigateTo('/login')
        }
    }

    const checkAuth = async (): Promise<boolean> => {
        if (!appStore.getToken?.access_token) {
            return false
        }

        if (isTokenExpired()) {
            await logout()
            return false
        }

        try {
            await getCurrentUser()
            return true
        } catch (error: any) {
            if (error?.status === 401 || error?.status === 403) {
                await logout()
                return false
            }
            throw error
        }
    }

    const getTokenTimeRemaining = (): number => {
        const tokenData = appStore.getToken
        if (!tokenData?.expires_at) return 0

        const now = Math.floor(Date.now() / 1000)
        return Math.max(0, tokenData.expires_at - now)
    }

    const getTokenTimeRemainingFormatted = (): string => {
        const seconds = getTokenTimeRemaining()

        if (seconds === 0) return 'Истек'

        const days = Math.floor(seconds / 86400)
        const hours = Math.floor((seconds % 86400) / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)

        if (days > 0) return `${days}д ${hours}ч`
        if (hours > 0) return `${hours}ч ${minutes}м`
        return `${minutes}м`
    }

    return {
        isAuthenticated,
        isTokenExpired,
        isTokenExpiringSoon,
        getTokenTimeRemaining,
        getTokenTimeRemainingFormatted,

        getCurrentUser,
        checkAuth,
        logout,

        user: computed(() => appStore.getUser),
        token: computed(() => appStore.getToken)
    }
}
