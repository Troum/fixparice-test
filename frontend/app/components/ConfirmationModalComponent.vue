<script lang="ts" setup>
import {useConfirm} from "@/composable/useConfirm";
import {sleep} from "@antfu/utils";
import { ref } from 'vue'

const { params } = useConfirm()
const emits = defineEmits<{ close: [boolean] }>()

const isProcessing = ref(false)
const doAction = async () => {
  if (isProcessing.value) return
  isProcessing.value = true
  try {
    await Promise.resolve(params.value.action())
    await sleep(150)
    emits('close', true)
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <UModal :ui="{header: 'flex items-center gap-0 sm:p-0 min-h-16', footer: 'flex items-center gap-0 sm:p-0 min-h-16'}">
    <template #header>
      <div
          class="flex items-center justify-between w-full px-5 py-3 border-b border-gray-200/70 dark:border-gray-800/70 bg-gradient-to-r from-rose-50 to-transparent dark:from-rose-950/20"
      >
        <div class="flex items-center gap-3">
          <div
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 ring-1 ring-rose-200/60 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/20"
              aria-hidden="true"
          >
            <UIcon name="i-mdi-alert-circle-outline" class="h-6 w-6" />
          </div>
          <p class="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {{ params.title }}
          </p>
        </div>
        <UButton
            variant="ghost"
            color="neutral"
            icon="i-lucide-x"
            size="sm"
            aria-label="Закрыть"
            @click="emits('close', false)"
        />
      </div>
    </template>

    <template #body>
      <div class="px-2 py-5">
        <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {{ params.message }}
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-end gap-3 w-full px-6 py-4">
        <UButton
            variant="ghost"
            color="neutral"
            :disabled="isProcessing"
            @click="emits('close', false)"
        >
          <span class="flex items-center gap-2">
            <UIcon name="i-lucide-x" class="w-4 h-4" />
            <span class="font-medium">Отменить</span>
          </span>
        </UButton>

        <UButton
            color="error"
            :loading="isProcessing"
            :disabled="isProcessing"
            @click="doAction"
        >
          <span class="flex items-center gap-2">
            <UIcon name="i-lucide-check" class="w-4 h-4" />
            <span class="font-semibold">{{ params.label }}</span>
          </span>
        </UButton>
      </div>
    </template>
  </UModal>
</template>
