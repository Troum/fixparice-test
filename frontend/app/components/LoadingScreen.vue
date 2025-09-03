<script setup lang="ts">
interface Props {
  message?: string
  showProgress?: boolean
  progress?: number
}

withDefaults(defineProps<Props>(), {
  message: 'Загрузка...',
  showProgress: false,
  progress: 0
})

const dots = ref('.')
const animationInterval = ref<NodeJS.Timeout>()

onMounted(() => {
  animationInterval.value = setInterval(() => {
    dots.value = dots.value.length >= 3 ? '.' : dots.value + '.'
  }, 500)
})

onUnmounted(() => {
  if (animationInterval.value) {
    clearInterval(animationInterval.value)
  }
})
</script>

<template>
  <div class="w-screen h-screen fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto p-8">
      <div class="flex justify-center mb-8">
        <div class="relative">
          <div class="w-10 h-10 bg-gradient-to-r from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
            <UIcon name="i-lucide-briefcase" class="w-8 h-8 text-white" />
          </div>
          <div class="absolute -inset-2 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin"></div>
        </div>
      </div>

      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        {{ message }}{{ dots }}
      </h2>

      <p class="text-gray-600 text-sm mb-6">
        Пожалуйста, подождите
      </p>

      <div v-if="showProgress" class="w-full bg-gray-200 rounded-full h-1.5 mb-4">
        <div
          class="bg-gradient-to-r from-slate-500 to-gray-600 h-1.5 rounded-full transition-all duration-300"
          :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
        />
      </div>

      <div class="flex items-center justify-center gap-2 text-xs text-gray-500">
        <UIcon name="i-lucide-info" class="w-3 h-3" />
        <span>Инициализация системы</span>
      </div>
    </div>
  </div>
</template>
