<script setup lang="ts">
interface Props {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Загрузка...',
  size: 'md'
})

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
}
</script>

<template>
  <div class="flex flex-col items-center justify-center py-8 space-y-4">
    <div class="relative">
      <div
        class="animate-spin rounded-full border-2 border-slate-200 border-t-slate-600"
        :class="sizeClasses[size]"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <UIcon name="i-lucide-briefcase" class="w-3 h-3 text-slate-600" />
      </div>
    </div>

    <p class="text-gray-600 text-sm font-medium">{{ message }}</p>
  </div>
</template>
