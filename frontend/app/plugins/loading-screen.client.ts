import {useLoadingScreen} from "~/composable/useLoadingScreen";

export default defineNuxtPlugin(async () => {
  const { show, hide, setMessage, setProgress } = useLoadingScreen()

  if (import.meta.client) {
    const hasShownLoading = sessionStorage.getItem('hasShownLoading')

    if (!hasShownLoading) {
      show('Инициализация приложения', true)

      const steps = [
        { message: 'Инициализация приложения', progress: 20 },
        { message: 'Загрузка компонентов', progress: 40 },
        { message: 'Подключение к API', progress: 60 },
        { message: 'Проверка аутентификации', progress: 80 },
        { message: 'Готово!', progress: 100 }
      ]

      for (let i = 0; i < steps.length; i++) {
        setMessage(steps[i]?.message)
        setProgress(steps[i]?.progress)
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      setTimeout(() => {
        hide()
        sessionStorage.setItem('hasShownLoading', 'true')
      }, 500)
    }
  }
})
