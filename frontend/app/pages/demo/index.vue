<script setup lang="ts">
import {h} from 'vue'
import type {TableColumn} from '@nuxt/ui'
import { useApi } from '~/composable/useApi'
import { useConfirm } from '~/composable/useConfirm'
import { useDemo } from '~/composable/useDemo'
import { useRbac } from '~/composable/useRbac'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { usePaginatedData, getVacanciesStats, deleteVacancy, updateVacancy } = useApi()
const { confirm } = useConfirm()
const { isDemoUser, getDemoNotification } = useDemo()
const { canCreateVacancies} = useRbac()

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const page = ref(Number(route.query.page ?? 1))
const sort = ref(String(route.query.sort ?? '-created_at'))
const perPage = 10

const { data, pending, error, fetchData, items, meta } = usePaginatedData('vacancies', true)

const fetchVacancies = async () => {
  await fetchData({
    page: page.value,
    perPage: perPage,
    sort: sort.value,
    expand: 'created_at,updated_at'
  })
}

watch([page, sort], () => {
  fetchVacancies()
  router.replace({query: {page: page.value, sort: sort.value}})
}, {immediate: true})

const columns: TableColumn<object>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({row}) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'title',
    header: ({column}) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Название',
        icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({row}) => h('div', {class: 'font-medium'}, row.getValue('title'))
  },
  {
    accessorKey: 'salary',
    header: ({column}) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Зарплата',
        icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({row}) => {
      const salary = row.getValue('salary') as number
      return h('div', {class: 'font-medium text-green-600'},
          salary ? `${new Intl.NumberFormat('ru-RU').format(salary)} ₽` : 'Не указана'
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({row}) => {
      const description = row.getValue('description') as string
      return h('div', {class: 'text-sm text-gray-600 max-w-xs truncate'},
          description || 'Описание отсутствует'
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({row}) => {
      const status = row.getValue('status') as number
      const isActive = status === 1
      return h('div', {class: `inline-flex px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`},
        isActive ? 'Активная' : 'Архивная'
      )
    }
  },
  {
    accessorKey: 'created_at',
    header: ({column}) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Дата создания',
        icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({row}) => {
      const date = row.getValue('created_at') as number
      return h('div', {class: 'text-sm'},
          date ? new Date(date * 1000).toLocaleDateString('ru-RU') : '-'
      )
    }
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const items = [
            [{
              label: 'Просмотреть',
              icon: 'i-lucide-eye',
              onClick: () => router.push(`/demo/${row.getValue('id')}`)
            }],
            [{
              label: 'Редактировать',
              icon: 'i-lucide-edit',
              onClick: () => router.push(`/demo/edit/${row.getValue('id')}`)
            }],
        [{
          label: row.getValue('status') ? 'Архивировать' : 'Разархивировать',
          icon: 'i-lucide-archive',
          onClick: () => {
            confirm(
              'Архивирование вакансии',
              `Вы уверены, что хотите ${row.getValue('status') ? 'архивировать' : 'разархивировать'} вакансию "${row.getValue('title')}"?`,
                row.getValue('status') ? 'Архивировать' : 'Разархивировать',
              async () => {
                try {
                  await updateVacancy(row.getValue('id'), { ...row.original, status: row.getValue('status') ? 0 : 1 })
                  await fetchVacancies()
                      .then(() => {
                        toast.add({
                          title: row.getValue('status') ? 'Архивировано' : 'Разархивировано',
                          description: `Вакансия ${row.getValue('status') ? 'заархивирована' : 'разархивирована'}`,
                          color: 'success'
                        })
                      })
                      .then(async () => {
                        await getVacanciesStats()
                            .then((response: any) => {
                              stats.value = response
                            })
                      })

                } catch (error) {
                  toast.add({
                    title: 'Ошибка',
                    description: 'Не удалось архивировать',
                    color: 'error'
                  })
                }
              }
            )
          }
        }, {
          label: 'Удалить',
          icon: 'i-lucide-trash',
          click: () => {
            confirm(
              'Удаление вакансии',
              `Вы уверены, что хотите удалить вакансию "${row.getValue('title')}"? Это действие нельзя отменить.`,
              'Удалить',
              async () => {
                try {
                  await deleteVacancy(row.getValue('id'))
                  toast.add({
                    title: 'Удалено',
                    description: 'Вакансия удалена',
                    color: 'success'
                  })
                  await fetchVacancies()
                } catch (error) {
                  toast.add({
                    title: 'Ошибка',
                    description: 'Не удалось удалить',
                    color: 'error'
                  })
                }
              }
            )
          }
        }]
      ]

      return h('div', { class: 'flex justify-end' }, [
        h(UDropdownMenu, { items }, {
          default: () => h(UButton, {
            icon: 'i-lucide-more-horizontal',
            variant: 'ghost',
            size: 'sm'
          })
        })
      ])
    }
  }
]



// Статистика вакансий
const stats = ref({
  total: 0,
  active: 0,
  archived: 0,
  this_month: 0
})

  onMounted(async () => {
    try {
      const response = await getVacanciesStats()
      stats.value = (response as any).data || response
    } catch (error) {
      toast.add({
        title: 'Ошибка',
        description: 'Не удалось получить статистику',
        color: 'error'
      })
    }

    // Показываем уведомление о демо режиме
    if (isDemoUser.value) {
      const notification = getDemoNotification()
      toast.add(notification)
    }
  })

definePageMeta({
  middleware: 'demo'
})

useHead({
  title: 'Демо - Управление вакансиями'
})
</script>

<template>
  <div class="min-w-screen min-h-screen p-4">
    <UAlert
      v-if="isDemoUser"
      icon="i-lucide-info"
      color="info"
      variant="subtle"
      title="Демо режим активен"
      description="Вы используете демо версию с правами менеджера. Все функции доступны для тестирования. Данные являются тестовыми."
      class="mb-6"
      :actions="[{
        label: 'Войти под своим аккаунтом',
        click: () => router.push('/login')
      }]"
    />
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Демо - Управление вакансиями</h1>
      <UserInfo />
    </div>

    <template v-if="stats">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-card rounded-lg p-4 border">
          <div class="text-2xl font-bold text-primary">{{ stats.total || 0 }}</div>
          <div class="text-sm text-muted">Всего вакансий</div>
        </div>
        <div class="bg-card rounded-lg p-4 border">
          <div class="text-2xl font-bold text-success">{{ stats.active || 0 }}</div>
          <div class="text-sm text-muted">Активные</div>
        </div>
        <div class="bg-card rounded-lg p-4 border">
          <div class="text-2xl font-bold text-warning">{{ stats.archived || 0 }}</div>
          <div class="text-sm text-muted">Архивированные</div>
        </div>
        <div class="bg-card rounded-lg p-4 border">
          <div class="text-2xl font-bold text-info">{{ stats.this_month || 0 }}</div>
          <div class="text-sm text-muted">За этот месяц</div>
        </div>
      </div>
    </template>
    <UCard class="overflow-x-auto shadow-lg rounded-lg border" title="Список вакансий">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Список вакансий</h3>
          <UButton
            v-if="canCreateVacancies"
            icon="i-lucide-plus"
            @click="router.push('/demo/create')"
          >
            Создать демо вакансию
          </UButton>
        </div>
      </template>

      <div class="mb-4 flex gap-3 items-center">
          <USelect v-model="sort" class="w-32" :items="[
            { label: 'Зарплата ↑', value: 'salary' },
            { label: 'Зарплата ↓', value: '-salary' },
            { label: 'Дата ↑', value: 'created_at' },
            { label: 'Дата ↓', value: '-created_at' },
          ]"/>
        </div>
      <UTable
          :data="items"
          :columns="columns"
          :loading="pending"
      />

              <div class="flex justify-center mt-4">
          <UPagination
              v-model="page"
              :total="(meta as any).totalCount || 0"
              :page-count="(meta as any).pageCount || 1"
              :per-page="(meta as any).perPage || 10"
              show-links
          />
        </div>
    </UCard>
  </div>
</template>
