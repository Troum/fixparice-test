import { useAuth } from '~/composable/useAuth'
import { useDemo } from '~/composable/useDemo'
import { useLoadingScreen } from '~/composable/useLoadingScreen'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Применяется только к demo маршрутам
  if (!to.path.startsWith('/demo')) {
    return
  }

  const { user, token } = useAuth()
  const { autoDemoLogin, isDemoUser } = useDemo()
  const { show, hide, setMessage, setProgress } = useLoadingScreen()

  // Если уже авторизован под demo пользователем, продолжаем
  if (isDemoUser.value && token.value?.access_token) {
    return
  }

  try {
    // Показываем загрузочный экран для демо
    show('Подготовка демо режима', true)
    setProgress(20)
    
    await new Promise(resolve => setTimeout(resolve, 300))
    setMessage('Авторизация под demo пользователем')
    setProgress(50)
    
    const success = await autoDemoLogin()
    setProgress(80)
    
    if (!success) {
      throw new Error('Demo login failed')
    }
    
    setMessage('Демо готово!')
    setProgress(100)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    hide()
    
    console.log('Demo user auto-login successful')
  } catch (error) {
    hide()
    console.error('Demo auto-login failed:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Демо недоступен. Попробуйте позже или войдите вручную.'
    })
  }
})
