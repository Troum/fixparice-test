import { useApi } from '~/composable/useApi'
import { useAppStore } from '~/store/useAppStore'

export function useDemo() {
  const { login } = useApi()
  const appStore = useAppStore()

  const autoDemoLogin = async () => {
    try {
      const response = await login({
        email: 'demo@example.com',
        password: 'demo123',
        device_name: 'Demo Session',
        expires_in: 3600
      })

      if (response.result === 'success') {
        appStore.setUser(response.data.user)
        appStore.setToken({
          access_token: response.data.access_token,
          token_type: response.data.token_type,
          expires_at: response.data.expires_at
        })

        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const isDemoUser = computed(() => {
    const user = appStore.getUser
    return user?.email === 'demo@example.com'
  })

  const getDemoNotification = () => {
    return {
      title: 'Демо режим',
      description: 'Вы находитесь в демо режиме с правами менеджера. Все функции доступны для тестирования.',
      color: 'info',
      timeout: 5000,
      actions: [{
        label: 'Понятно',
        click: () => {}
      }]
    }
  }

  return {
    autoDemoLogin,
    isDemoUser,
    getDemoNotification
  }
}
