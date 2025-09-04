<template>
  <div class="pagination">
    <div class="pagination__info">
      <span class="text-sm text-gray-700">
        Показано {{ startItem }} - {{ endItem }} из {{ totalCount }} записей
      </span>
    </div>

    <nav class="pagination__nav" aria-label="Пагинация">
      <div class="pagination__buttons">
        <!-- Предыдущая страница -->
        <button
          @click="$emit('page-change', currentPage - 1)"
          :disabled="currentPage <= 1"
          class="pagination__btn pagination__btn--prev"
          :class="{ 'pagination__btn--disabled': currentPage <= 1 }"
        >
          <Icon name="mdi:chevron-left" class="w-4 h-4" />
          <span class="hidden sm:inline">Предыдущая</span>
        </button>

        <!-- Номера страниц -->
        <div class="pagination__pages">
          <!-- Первая страница -->
          <button
            v-if="showFirstPage"
            @click="$emit('page-change', 1)"
            class="pagination__btn pagination__btn--page"
            :class="{ 'pagination__btn--current': currentPage === 1 }"
          >
            1
          </button>

          <!-- Разделитель после первой страницы -->
          <span v-if="showFirstEllipsis" class="pagination__ellipsis">...</span>

          <!-- Видимые страницы -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="$emit('page-change', page)"
            class="pagination__btn pagination__btn--page"
            :class="{ 'pagination__btn--current': currentPage === page }"
          >
            {{ page }}
          </button>

          <!-- Разделитель перед последней страницей -->
          <span v-if="showLastEllipsis" class="pagination__ellipsis">...</span>

          <!-- Последняя страница -->
          <button
            v-if="showLastPage"
            @click="$emit('page-change', totalPages)"
            class="pagination__btn pagination__btn--page"
            :class="{ 'pagination__btn--current': currentPage === totalPages }"
          >
            {{ totalPages }}
          </button>
        </div>

        <!-- Следующая страница -->
        <button
          @click="$emit('page-change', currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="pagination__btn pagination__btn--next"
          :class="{ 'pagination__btn--disabled': currentPage >= totalPages }"
        >
          <span class="hidden sm:inline">Следующая</span>
          <Icon name="mdi:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </nav>

    <!-- Быстрый переход -->
    <div class="pagination__jump" v-if="totalPages > 10">
      <span class="text-sm text-gray-700 mr-2">Перейти на страницу:</span>
      <input
        v-model.number="jumpPage"
        @keyup.enter="goToPage"
        @blur="goToPage"
        type="number"
        :min="1"
        :max="totalPages"
        class="pagination__input"
        :placeholder="`1-${totalPages}`"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalCount: number
  perPage: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 7
})

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const jumpPage = ref<number>()

// Вычисляемые свойства для отображения информации
const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.perPage
  return end > props.totalCount ? props.totalCount : end
})

// Логика отображения страниц
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = props.maxVisiblePages
  const current = props.currentPage
  const total = props.totalPages

  if (total <= maxVisible) {
    // Если общее количество страниц меньше максимального, показываем все
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Сложная логика для большого количества страниц
    const sidePages = Math.floor((maxVisible - 3) / 2) // -3 для первой, последней и текущей

    if (current <= sidePages + 2) {
      // Текущая страница близко к началу
      for (let i = 2; i <= maxVisible - 1; i++) {
        pages.push(i)
      }
    } else if (current >= total - sidePages - 1) {
      // Текущая страница близко к концу
      for (let i = total - maxVisible + 2; i <= total - 1; i++) {
        pages.push(i)
      }
    } else {
      // Текущая страница в середине
      for (let i = current - sidePages; i <= current + sidePages; i++) {
        pages.push(i)
      }
    }
  }

  return pages.filter(page => page > 1 && page < total)
})

const showFirstPage = computed(() => {
  return props.totalPages > 1 && !visiblePages.value.includes(1)
})

const showLastPage = computed(() => {
  return props.totalPages > 1 && !visiblePages.value.includes(props.totalPages)
})

const showFirstEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

const showLastEllipsis = computed(() => {
  return visiblePages.value.length > 0 && 
         visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})

// Быстрый переход на страницу
const goToPage = () => {
  if (jumpPage.value && jumpPage.value >= 1 && jumpPage.value <= props.totalPages) {
    emit('page-change', jumpPage.value)
    jumpPage.value = undefined
  }
}
</script>

<style scoped>
.pagination {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4;
}

.pagination__info {
  @apply text-center sm:text-left;
}

.pagination__nav {
  @apply flex justify-center;
}

.pagination__buttons {
  @apply flex items-center space-x-1;
}

.pagination__btn {
  @apply px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.pagination__btn--page {
  @apply text-gray-700 bg-white border border-gray-300 hover:bg-gray-50;
}

.pagination__btn--current {
  @apply bg-blue-600 text-white border-blue-600 hover:bg-blue-700;
}

.pagination__btn--prev,
.pagination__btn--next {
  @apply flex items-center space-x-1 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50;
}

.pagination__btn--disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-white;
}

.pagination__pages {
  @apply flex items-center space-x-1;
}

.pagination__ellipsis {
  @apply px-3 py-2 text-gray-400;
}

.pagination__jump {
  @apply flex items-center justify-center sm:justify-end;
}

.pagination__input {
  @apply w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

/* Мобильная адаптация */
@media (max-width: 640px) {
  .pagination__btn--page {
    @apply px-2 py-1;
  }
  
  .pagination__pages {
    @apply space-x-0.5;
  }
  
  .pagination__btn--prev,
  .pagination__btn--next {
    @apply px-2;
  }
}
</style>
