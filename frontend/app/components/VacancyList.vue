<template>
  <div class="vacancy-list">
    <!-- Заголовок и контролы -->
    <div class="vacancy-list__header">
      <div class="vacancy-list__title">
        <h2 class="text-2xl font-bold text-gray-900">Вакансии</h2>
        <span v-if="totalCount" class="text-gray-500 ml-2">({{ totalCount }})</span>
      </div>
      
      <div class="vacancy-list__controls">
        <!-- Переключатель вида -->
        <div class="view-switcher">
          <button
            @click="viewMode = 'cards'"
            :class="['view-btn', { 'view-btn--active': viewMode === 'cards' }]"
            title="Карточки"
          >
            <Icon name="mdi:view-grid" class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'table'"
            :class="['view-btn', { 'view-btn--active': viewMode === 'table' }]"
            title="Таблица"
          >
            <Icon name="mdi:view-list" class="w-5 h-5" />
          </button>
        </div>

        <!-- Фильтр по статусу -->
        <select 
          v-model="statusFilter" 
          @change="loadVacancies"
          class="filter-select"
        >
          <option value="">Все статусы</option>
          <option value="1">Активные</option>
          <option value="0">Архивные</option>
        </select>

        <!-- Кнопка создания -->
        <button 
          @click="$emit('create')"
          class="btn btn--primary"
        >
          <Icon name="mdi:plus" class="w-4 h-4 mr-2" />
          Создать вакансию
        </button>
      </div>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="vacancy-list__loading">
      <InlineLoading />
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="vacancy-list__error">
      <div class="error-message">
        <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-500 mr-2" />
        <span>{{ error }}</span>
      </div>
      <button @click="loadVacancies" class="btn btn--outline btn--sm mt-2">
        Попробовать снова
      </button>
    </div>

    <!-- Пустой список -->
    <div v-else-if="!vacancies.length" class="vacancy-list__empty">
      <div class="empty-state">
        <Icon name="mdi:briefcase-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Вакансии не найдены</h3>
        <p class="text-gray-500 mb-4">Создайте первую вакансию или измените фильтры поиска</p>
        <button @click="$emit('create')" class="btn btn--primary">
          <Icon name="mdi:plus" class="w-4 h-4 mr-2" />
          Создать вакансию
        </button>
      </div>
    </div>

    <!-- Список вакансий -->
    <div v-else class="vacancy-list__content">
      <!-- Карточки -->
      <div v-if="viewMode === 'cards'" class="vacancy-cards">
        <VacancyCard
          v-for="vacancy in vacancies"
          :key="vacancy.id"
          :vacancy="vacancy"
          @view="$emit('view', $event)"
          @edit="$emit('edit', $event)"
        />
      </div>

      <!-- Таблица -->
      <div v-else class="vacancy-table-container">
        <table class="vacancy-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Зарплата</th>
              <th>Статус</th>
              <th>Локация</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="vacancy in vacancies" 
              :key="vacancy.id"
              :class="{ 'archived': vacancy.status === 0 }"
            >
              <td class="vacancy-title">
                <div>
                  <h4 class="font-medium text-gray-900">{{ vacancy.title }}</h4>
                  <p v-if="getDescriptionText(vacancy)" class="text-sm text-gray-500 mt-1">
                    {{ truncateText(getDescriptionText(vacancy), 80) }}
                  </p>
                </div>
              </td>
              <td class="salary-cell">
                <span class="font-semibold text-green-600">
                  {{ formatSalary(vacancy.salary) }}
                </span>
              </td>
              <td>
                <span 
                  class="status-badge"
                  :class="{ 
                    'status-badge--active': vacancy.status === 1, 
                    'status-badge--archived': vacancy.status === 0 
                  }"
                >
                  {{ vacancy.status === 1 ? 'Активная' : 'Архивная' }}
                </span>
              </td>
              <td class="text-gray-600">
                {{ getLocation(vacancy) || '—' }}
              </td>
              <td class="text-gray-500">
                {{ formatDate(vacancy.created_at) }}
              </td>
              <td>
                <div class="table-actions">
                  <button 
                    @click="$emit('view', vacancy.id)"
                    class="action-btn action-btn--view"
                    title="Просмотр"
                  >
                    <Icon name="mdi:eye" class="w-4 h-4" />
                  </button>
                  <button 
                    @click="$emit('edit', vacancy.id)"
                    class="action-btn action-btn--edit"
                    title="Редактировать"
                  >
                    <Icon name="mdi:pencil" class="w-4 h-4" />
                  </button>
                  <button 
                    @click="$emit('delete', vacancy.id)"
                    class="action-btn action-btn--delete"
                    title="Удалить"
                  >
                    <Icon name="mdi:delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Пагинация -->
    <div v-if="totalPages > 1" class="vacancy-list__pagination">
      <VacancyPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-count="totalCount"
        :per-page="perPage"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VacancyInterface, VacancyListResponse, VacancyDescription } from '~/interfaces/VacancyInterface'

// Пропсы
interface Props {
  initialPage?: number
  initialPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialPage: 1,
  initialPerPage: 12
})

// Эмиты
const emit = defineEmits<{
  create: []
  view: [id: number]
  edit: [id: number]
  delete: [id: number]
}>()

// Реактивные данные
const viewMode = ref<'cards' | 'table'>('cards')
const statusFilter = ref<string>('')
const loading = ref(false)
const error = ref<string>('')

const vacancies = ref<VacancyInterface[]>([])
const currentPage = ref(props.initialPage)
const totalPages = ref(1)
const totalCount = ref(0)
const perPage = ref(props.initialPerPage)

// API клиент
const { $api } = useNuxtApp()

// Загрузка вакансий
const loadVacancies = async () => {
  try {
    loading.value = true
    error.value = ''

    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      per-page: perPage.value.toString()
    })

    if (statusFilter.value) {
      params.append('status', statusFilter.value)
    }

    const response = await $api<VacancyListResponse>(`/api/v1/vacancies?${params}`)
    
    vacancies.value = response.items
    totalPages.value = response.meta.pageCount
    totalCount.value = response.meta.totalCount
    currentPage.value = response.meta.currentPage

  } catch (err: any) {
    error.value = err.message || 'Ошибка при загрузке вакансий'
    console.error('Error loading vacancies:', err)
  } finally {
    loading.value = false
  }
}

// Смена страницы
const onPageChange = (page: number) => {
  currentPage.value = page
  loadVacancies()
}

// Вспомогательные функции
const formatSalary = (salary: number): string => {
  return new Intl.NumberFormat('ru-RU').format(salary) + ' ₽'
}

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return '—'
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const getDescriptionText = (vacancy: VacancyInterface): string => {
  if (typeof vacancy.description === 'object' && vacancy.description.description_text) {
    return vacancy.description.description_text
  }
  if (typeof vacancy.description === 'string') {
    return vacancy.description
  }
  return ''
}

const getLocation = (vacancy: VacancyInterface): string => {
  if (typeof vacancy.description === 'object' && vacancy.description.location) {
    return vacancy.description.location
  }
  return ''
}

// Загрузка данных при монтировании
onMounted(() => {
  loadVacancies()
})

// Сохранение режима просмотра в localStorage
watch(viewMode, (newMode) => {
  localStorage.setItem('vacancy-view-mode', newMode)
})

// Восстановление режима просмотра
onMounted(() => {
  const savedMode = localStorage.getItem('vacancy-view-mode') as 'cards' | 'table'
  if (savedMode) {
    viewMode.value = savedMode
  }
})
</script>

<style scoped>
.vacancy-list {
  @apply space-y-6;
}

.vacancy-list__header {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4;
}

.vacancy-list__title {
  @apply flex items-center;
}

.vacancy-list__controls {
  @apply flex items-center gap-3;
}

.view-switcher {
  @apply flex bg-gray-100 rounded-lg p-1;
}

.view-btn {
  @apply p-2 rounded-md transition-colors;
}

.view-btn:hover {
  @apply bg-gray-200;
}

.view-btn--active {
  @apply bg-white text-blue-600 shadow-sm;
}

.filter-select {
  @apply px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.btn {
  @apply px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center;
}

.btn--primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.btn--outline {
  @apply border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500;
}

.btn--sm {
  @apply px-3 py-1.5 text-xs;
}

.vacancy-list__loading,
.vacancy-list__error,
.vacancy-list__empty {
  @apply py-12 text-center;
}

.error-message {
  @apply flex items-center justify-center text-red-600 mb-4;
}

.empty-state {
  @apply max-w-md mx-auto;
}

.vacancy-cards {
  @apply grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}

.vacancy-table-container {
  @apply overflow-x-auto bg-white rounded-lg shadow;
}

.vacancy-table {
  @apply min-w-full divide-y divide-gray-200;
}

.vacancy-table th {
  @apply px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.vacancy-table td {
  @apply px-6 py-4 whitespace-nowrap text-sm;
}

.vacancy-table tr.archived {
  @apply opacity-60 bg-gray-50;
}

.vacancy-title {
  @apply max-w-xs;
}

.salary-cell {
  @apply text-right;
}

.status-badge {
  @apply px-2 py-1 rounded-full text-xs font-medium;
}

.status-badge--active {
  @apply bg-green-100 text-green-800;
}

.status-badge--archived {
  @apply bg-gray-100 text-gray-600;
}

.table-actions {
  @apply flex items-center gap-2;
}

.action-btn {
  @apply p-2 rounded-md transition-colors;
}

.action-btn--view {
  @apply text-gray-400 hover:text-blue-600 hover:bg-blue-50;
}

.action-btn--edit {
  @apply text-gray-400 hover:text-green-600 hover:bg-green-50;
}

.action-btn--delete {
  @apply text-gray-400 hover:text-red-600 hover:bg-red-50;
}

.vacancy-list__pagination {
  @apply mt-8;
}
</style>
