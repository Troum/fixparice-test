<script setup lang="ts">
import { useLoadingScreen } from '~/composable/useLoadingScreen'

const { isLoading, message, progress, showProgress } = useLoadingScreen()
</script>

<template>
  <UApp>
    <LoadingScreen
      v-if="isLoading"
      :message="message"
      :show-progress="showProgress"
      :progress="progress"
    />
    <NuxtPage />
  </UApp>
</template>
