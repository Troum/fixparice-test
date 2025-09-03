import { useAuth } from '~/composable/useAuth'

export default defineNuxtPlugin(() => {
  if (process.server) return

  const { isTokenExpiringSoon, getCurrentUser, logout, token } = useAuth()
  
  // Проверяем токен каждые 5 минут
  const checkInterval = 5 * 60 * 1000 // 5 минут в миллисекундах
  
  const intervalId = setInterval(async () => {
    // Если токена нет, очищаем интервал
    if (!token.value?.access_token) {
      clearInterval(intervalId)
      return
    }

    // Если токен скоро истечет (в течение 10 минут), пытаемся обновить информацию
    if (isTokenExpiringSoon(600)) { // 10 минут
      try {
        await getCurrentUser()
        console.log('Token check: User info refreshed')
      } catch (error: any) {
        console.warn('Token check failed:', error)
        
        // Если ошибка аутентификации, выходим
        if (error?.status === 401 || error?.status === 403) {
          await logout()
          clearInterval(intervalId)
        }
      }
    }
  }, checkInterval)

  // Очищаем интервал при закрытии приложения
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId)
    })
  }
})
