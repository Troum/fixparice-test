import { e as useRoute, a as useRouter, f as useToast, g as useApi, u as useHead, d as _sfc_main$9 } from './server.mjs';
import { _ as __nuxt_component_2, a as _sfc_main$1$1, b as _sfc_main$4, c as _sfc_main$4$1 } from './Pagination-Dc1EGt2v.mjs';
import { _ as _sfc_main$1 } from './Alert-CLHxGesX.mjs';
import { _ as _sfc_main$2 } from './Card-C_IdJI02.mjs';
import { _ as _sfc_main$3 } from './Select-VTHFZR89.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, isRef, h, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useConfirm } from './useConfirm-BJtrpqkQ.mjs';
import { u as useDemo } from './useDemo-CN3BHnyK.mjs';
import { u as useRbac } from './useRbac-DtaKJM32.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'reka-ui/namespaced';
import './Badge-GHH234is.mjs';
import '@tanstack/vue-table';
import '@antfu/utils';

const perPage = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const { usePaginatedData, getVacanciesStats, deleteVacancy, updateVacancy } = useApi();
    const { confirm } = useConfirm();
    const { isDemoUser } = useDemo();
    const { canCreateVacancies } = useRbac();
    const UButton = _sfc_main$9;
    const UDropdownMenu = _sfc_main$4$1;
    const page = ref(Number(route.query.page ?? 1));
    const sort = ref(String(route.query.sort ?? "-created_at"));
    const { pending, fetchData, items, meta } = usePaginatedData("vacancies", true);
    const fetchVacancies = async () => {
      await fetchData({
        page: page.value,
        perPage,
        sort: sort.value,
        expand: "created_at,updated_at"
      });
    };
    watch([page, sort], () => {
      fetchVacancies();
      router.replace({ query: { page: page.value, sort: sort.value } });
    }, { immediate: true });
    const columns = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => `#${row.getValue("id")}`
      },
      {
        accessorKey: "title",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return h(UButton, {
            color: "neutral",
            variant: "ghost",
            label: "Название",
            icon: isSorted ? isSorted === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow" : "i-lucide-arrow-up-down",
            class: "-mx-2.5",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
          });
        },
        cell: ({ row }) => h("div", { class: "font-medium" }, row.getValue("title"))
      },
      {
        accessorKey: "salary",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return h(UButton, {
            color: "neutral",
            variant: "ghost",
            label: "Зарплата",
            icon: isSorted ? isSorted === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow" : "i-lucide-arrow-up-down",
            class: "-mx-2.5",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
          });
        },
        cell: ({ row }) => {
          const salary = row.getValue("salary");
          return h(
            "div",
            { class: "font-medium text-green-600" },
            salary ? `${new Intl.NumberFormat("ru-RU").format(salary)} ₽` : "Не указана"
          );
        }
      },
      {
        accessorKey: "description",
        header: "Описание",
        cell: ({ row }) => {
          const description = row.getValue("description");
          return h(
            "div",
            { class: "text-sm text-gray-600 max-w-xs truncate" },
            description || "Описание отсутствует"
          );
        }
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }) => {
          const status = row.getValue("status");
          const isActive = status === 1;
          return h(
            "div",
            { class: `inline-flex px-2 py-1 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}` },
            isActive ? "Активная" : "Архивная"
          );
        }
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return h(UButton, {
            color: "neutral",
            variant: "ghost",
            label: "Дата создания",
            icon: isSorted ? isSorted === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow" : "i-lucide-arrow-up-down",
            class: "-mx-2.5",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
          });
        },
        cell: ({ row }) => {
          const date = row.getValue("created_at");
          return h(
            "div",
            { class: "text-sm" },
            date ? new Date(date * 1e3).toLocaleDateString("ru-RU") : "-"
          );
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const items2 = [
            [{
              label: "Просмотреть",
              icon: "i-lucide-eye",
              onClick: () => router.push(`/demo/${row.getValue("id")}`)
            }],
            [{
              label: "Редактировать",
              icon: "i-lucide-edit",
              onClick: () => router.push(`/demo/edit/${row.getValue("id")}`)
            }],
            [{
              label: row.getValue("status") ? "Архивировать" : "Разархивировать",
              icon: "i-lucide-archive",
              onClick: () => {
                confirm(
                  "Архивирование вакансии",
                  `Вы уверены, что хотите ${row.getValue("status") ? "архивировать" : "разархивировать"} вакансию "${row.getValue("title")}"?`,
                  row.getValue("status") ? "Архивировать" : "Разархивировать",
                  async () => {
                    try {
                      await updateVacancy(row.getValue("id"), { ...row.original, status: row.getValue("status") ? 0 : 1 });
                      await fetchVacancies().then(() => {
                        toast.add({
                          title: row.getValue("status") ? "Разархивировано" : "Архивировано",
                          description: `Вакансия ${row.getValue("id") ? "разархивирована" : "заархивирована"}`,
                          color: "success"
                        });
                      }).then(async () => {
                        await getVacanciesStats();
                      });
                    } catch (error2) {
                      toast.add({
                        title: "Ошибка",
                        description: "Не удалось архивировать",
                        color: "error"
                      });
                    }
                  }
                );
              }
            }, {
              label: "Удалить",
              icon: "i-lucide-trash",
              click: () => {
                confirm(
                  "Удаление вакансии",
                  `Вы уверены, что хотите удалить вакансию "${row.getValue("title")}"? Это действие нельзя отменить.`,
                  "Удалить",
                  async () => {
                    try {
                      await deleteVacancy(row.getValue("id"));
                      toast.add({
                        title: "Удалено",
                        description: "Вакансия удалена",
                        color: "success"
                      });
                      await fetchVacancies();
                    } catch (error2) {
                      toast.add({
                        title: "Ошибка",
                        description: "Не удалось удалить",
                        color: "error"
                      });
                    }
                  }
                );
              }
            }]
          ];
          return h("div", { class: "flex justify-end" }, [
            h(UDropdownMenu, { items: items2 }, {
              default: () => h(UButton, {
                icon: "i-lucide-more-horizontal",
                variant: "ghost",
                size: "sm"
              })
            })
          ]);
        }
      }
    ];
    const stats = ref({
      total: 0,
      active: 0,
      archived: 0,
      this_month: 0
    });
    useHead({
      title: "Демо - Управление вакансиями"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAlert = _sfc_main$1;
      const _component_UserInfo = __nuxt_component_2;
      const _component_UCard = _sfc_main$2;
      const _component_USelect = _sfc_main$3;
      const _component_UTable = _sfc_main$1$1;
      const _component_UPagination = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-w-screen min-h-screen p-4" }, _attrs))}>`);
      if (unref(isDemoUser)) {
        _push(ssrRenderComponent(_component_UAlert, {
          icon: "i-lucide-info",
          color: "info",
          variant: "subtle",
          title: "Демо режим активен",
          description: "Вы используете демо версию с правами менеджера. Все функции доступны для тестирования. Данные являются тестовыми.",
          class: "mb-6",
          actions: [{
            label: "Войти под своим аккаунтом",
            click: () => unref(router).push("/login")
          }]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6 flex justify-between items-center"><h1 class="text-2xl font-bold">Демо - Управление вакансиями</h1>`);
      _push(ssrRenderComponent(_component_UserInfo, null, null, _parent));
      _push(`</div>`);
      if (unref(stats)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div class="bg-card rounded-lg p-4 border"><div class="text-2xl font-bold text-primary">${ssrInterpolate(unref(stats).total || 0)}</div><div class="text-sm text-muted">Всего вакансий</div></div><div class="bg-card rounded-lg p-4 border"><div class="text-2xl font-bold text-success">${ssrInterpolate(unref(stats).active || 0)}</div><div class="text-sm text-muted">Активные</div></div><div class="bg-card rounded-lg p-4 border"><div class="text-2xl font-bold text-warning">${ssrInterpolate(unref(stats).archived || 0)}</div><div class="text-sm text-muted">Архивированные</div></div><div class="bg-card rounded-lg p-4 border"><div class="text-2xl font-bold text-info">${ssrInterpolate(unref(stats).this_month || 0)}</div><div class="text-sm text-muted">За этот месяц</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UCard, {
        class: "overflow-x-auto shadow-lg rounded-lg border",
        title: "Список вакансий"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Список вакансий</h3>`);
            if (unref(canCreateVacancies)) {
              _push2(ssrRenderComponent(unref(UButton), {
                icon: "i-lucide-plus",
                onClick: ($event) => unref(router).push("/demo/create")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Создать демо вакансию `);
                  } else {
                    return [
                      createTextVNode(" Создать демо вакансию ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h3", { class: "text-lg font-semibold" }, "Список вакансий"),
                unref(canCreateVacancies) ? (openBlock(), createBlock(unref(UButton), {
                  key: 0,
                  icon: "i-lucide-plus",
                  onClick: ($event) => unref(router).push("/demo/create")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Создать демо вакансию ")
                  ]),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex gap-3 items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(sort),
              "onUpdate:modelValue": ($event) => isRef(sort) ? sort.value = $event : null,
              class: "w-32",
              items: [
                { label: "Зарплата ↑", value: "salary" },
                { label: "Зарплата ↓", value: "-salary" },
                { label: "Дата ↑", value: "created_at" },
                { label: "Дата ↓", value: "-created_at" }
              ]
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UTable, {
              data: unref(items),
              columns,
              loading: unref(pending)
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UPagination, {
              modelValue: unref(page),
              "onUpdate:modelValue": ($event) => isRef(page) ? page.value = $event : null,
              total: unref(meta).totalCount || 0,
              "page-count": unref(meta).pageCount || 1,
              "per-page": unref(meta).perPage || 10,
              "show-links": ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 flex gap-3 items-center" }, [
                createVNode(_component_USelect, {
                  modelValue: unref(sort),
                  "onUpdate:modelValue": ($event) => isRef(sort) ? sort.value = $event : null,
                  class: "w-32",
                  items: [
                    { label: "Зарплата ↑", value: "salary" },
                    { label: "Зарплата ↓", value: "-salary" },
                    { label: "Дата ↑", value: "created_at" },
                    { label: "Дата ↓", value: "-created_at" }
                  ]
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode(_component_UTable, {
                data: unref(items),
                columns,
                loading: unref(pending)
              }, null, 8, ["data", "loading"]),
              createVNode("div", { class: "flex justify-center mt-4" }, [
                createVNode(_component_UPagination, {
                  modelValue: unref(page),
                  "onUpdate:modelValue": ($event) => isRef(page) ? page.value = $event : null,
                  total: unref(meta).totalCount || 0,
                  "page-count": unref(meta).pageCount || 1,
                  "per-page": unref(meta).perPage || 10,
                  "show-links": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "total", "page-count", "per-page"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C3Oc0c4w.mjs.map
