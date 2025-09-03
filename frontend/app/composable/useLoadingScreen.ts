const globalIsLoading = ref(false)
const globalMessage = ref('Загрузка...')
const globalProgress = ref(0)
const globalShowProgress = ref(false)

export function useLoadingScreen() {
  const isLoading = globalIsLoading
  const message = globalMessage
  const progress = globalProgress
  const showProgress = globalShowProgress

  const show = (msg?: string, withProgress?: boolean) => {
    isLoading.value = true
    if (msg) message.value = msg
    showProgress.value = !!withProgress
    progress.value = 0
    console.log('Loading screen shown:', msg)
  }

  const hide = () => {
    isLoading.value = false
    console.log('Loading screen hidden')
  }

  const setMessage = (msg: any) => {
    message.value = msg
  }

  const setProgress = (value: any) => {
    progress.value = Math.min(100, Math.max(0, value))
  }

  const incrementProgress = (step: number = 10) => {
    progress.value = Math.min(100, progress.value + step)
  }

  const autoHide = (delay: number = 2000) => {
    setTimeout(() => {
      hide()
    }, delay)
  }

  const simulateLoading = async (steps: any[], stepDelay: number = 500) => {
    showProgress.value = true
    progress.value = 0

    for (let i = 0; i < steps.length; i++) {
      setMessage(steps[i])
      setProgress((i + 1) / steps.length * 100)

      if (i < steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, stepDelay))
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300))
    hide()
  }

  return {
    isLoading: readonly(isLoading),
    message: readonly(message),
    progress: readonly(progress),
    showProgress: readonly(showProgress),
    show,
    hide,
    setMessage,
    setProgress,
    incrementProgress,
    autoHide,
    simulateLoading
  }
}
