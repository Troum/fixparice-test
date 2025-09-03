import { _ as _sfc_main$1 } from './Alert-CLHxGesX.mjs';
import { e as useRoute, a as useRouter, f as useToast, g as useApi, d as _sfc_main$9, c as _sfc_main$e } from './server.mjs';
import { _ as __nuxt_component_1 } from './InlineLoading-CR2R8tt1.mjs';
import { _ as _sfc_main$2 } from './Card-C_IdJI02.mjs';
import { _ as _sfc_main$3 } from './Badge-GHH234is.mjs';
import { _ as _sfc_main$4 } from './Select-VTHFZR89.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useConfirm } from './useConfirm-BJtrpqkQ.mjs';
import 'reka-ui';
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
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@antfu/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const { getVacancy, deleteVacancy: apiDeleteVacancy } = useApi();
    const { confirm } = useConfirm();
    const id = route.params.id;
    const vacancy = ref();
    const loading = ref(true);
    const error = ref(null);
    const expandFields = ref("created_at,updated_at");
    const fetchVacancy = async () => {
      loading.value = true;
      error.value = null;
      try {
        vacancy.value = await getVacancy(id, expandFields.value);
      } catch (err) {
        error.value = err;
        toast.add({
          title: "Ошибка",
          description: "Не удалось загрузить вакансию",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const editVacancy = () => {
      router.push(`/demo/${id}/edit`);
    };
    const deleteVacancy = () => {
      confirm(
        "Удаление вакансии",
        "Вы уверены, что хотите удалить эту вакансию? Это действие нельзя отменить.",
        "Удалить",
        async () => {
          try {
            await apiDeleteVacancy(id);
            toast.add({
              title: "Успех",
              description: "Вакансия удалена",
              color: "success"
            });
            router.push("/demo");
          } catch (err) {
            toast.add({
              title: "Ошибка",
              description: "Не удалось удалить вакансию",
              color: "error"
            });
          }
        }
      );
    };
    const formatSalary = (salary) => {
      return salary ? `${new Intl.NumberFormat("ru-RU").format(salary)} ₽` : "Не указана";
    };
    const formatDate = (timestamp) => {
      return new Date(timestamp * 1e3).toLocaleString("ru-RU");
    };
    const getStatusText = (status) => {
      return status === 1 ? "Активная" : "Архивная";
    };
    const getStatusColor = (status) => {
      return status === 1 ? "success" : "error";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAlert = _sfc_main$1;
      const _component_UButton = _sfc_main$9;
      const _component_InlineLoading = __nuxt_component_1;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$e;
      const _component_UBadge = _sfc_main$3;
      const _component_USelect = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4" }, _attrs))}><div class="max-w-4xl mx-auto">`);
      _push(ssrRenderComponent(_component_UAlert, {
        icon: "i-lucide-eye",
        color: "info",
        variant: "subtle",
        title: "Демо просмотр",
        description: "Просмотр вакансии в демо режиме",
        class: "mb-6"
      }, null, _parent));
      _push(`<div class="mb-6">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-arrow-left",
        variant: "ghost",
        onClick: ($event) => unref(router).push("/demo")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Назад к демо списку `);
          } else {
            return [
              createTextVNode(" Назад к демо списку ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_InlineLoading, {
          message: "Загрузка демо вакансии",
          size: "lg"
        }, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_component_UCard, { class: "border-red-200" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center py-8"${_scopeId}><div class="text-red-500 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-alert-circle",
                class: "w-12 h-12 mx-auto"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-semibold text-red-700 mb-2"${_scopeId}>Ошибка загрузки</h3><p class="text-gray-600 mb-4"${_scopeId}>Не удалось загрузить информацию о вакансии</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: fetchVacancy,
                color: "error",
                variant: "outline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Попробовать снова `);
                  } else {
                    return [
                      createTextVNode(" Попробовать снова ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "text-center py-8" }, [
                  createVNode("div", { class: "text-red-500 mb-4" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-alert-circle",
                      class: "w-12 h-12 mx-auto"
                    })
                  ]),
                  createVNode("h3", { class: "text-lg font-semibold text-red-700 mb-2" }, "Ошибка загрузки"),
                  createVNode("p", { class: "text-gray-600 mb-4" }, "Не удалось загрузить информацию о вакансии"),
                  createVNode(_component_UButton, {
                    onClick: fetchVacancy,
                    color: "error",
                    variant: "outline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Попробовать снова ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(vacancy)) {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 mb-2"${_scopeId}>${ssrInterpolate(unref(vacancy).title)}</h1><div class="flex items-center gap-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: getStatusColor(unref(vacancy).status),
                variant: "subtle",
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(getStatusText(unref(vacancy).status))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(getStatusText(unref(vacancy).status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="text-2xl font-semibold text-green-600"${_scopeId}>${ssrInterpolate(formatSalary(unref(vacancy).salary))}</span></div></div><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                icon: "i-lucide-edit",
                color: "info",
                variant: "outline",
                onClick: editVacancy
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Редактировать `);
                  } else {
                    return [
                      createTextVNode(" Редактировать ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                icon: "i-lucide-trash",
                color: "error",
                variant: "outline",
                onClick: deleteVacancy
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Удалить `);
                  } else {
                    return [
                      createTextVNode(" Удалить ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-between items-start" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900 mb-2" }, toDisplayString(unref(vacancy).title), 1),
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode(_component_UBadge, {
                        color: getStatusColor(unref(vacancy).status),
                        variant: "subtle",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getStatusText(unref(vacancy).status)), 1)
                        ]),
                        _: 1
                      }, 8, ["color"]),
                      createVNode("span", { class: "text-2xl font-semibold text-green-600" }, toDisplayString(formatSalary(unref(vacancy).salary)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(_component_UButton, {
                      icon: "i-lucide-edit",
                      color: "info",
                      variant: "outline",
                      onClick: editVacancy
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Редактировать ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      icon: "i-lucide-trash",
                      color: "error",
                      variant: "outline",
                      onClick: deleteVacancy
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Удалить ")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}>Описание вакансии</h2>`);
            } else {
              return [
                createVNode("h2", { class: "text-xl font-semibold" }, "Описание вакансии")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="prose max-w-none"${_scopeId}><p class="text-gray-700 leading-relaxed"${_scopeId}>${ssrInterpolate(unref(vacancy).description || "Описание отсутствует")}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "prose max-w-none" }, [
                  createVNode("p", { class: "text-gray-700 leading-relaxed" }, toDisplayString(unref(vacancy).description || "Описание отсутствует"), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(vacancy).created_at || unref(vacancy).updated_at) {
          _push(ssrRenderComponent(_component_UCard, null, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h2 class="text-xl font-semibold"${_scopeId}>Дополнительная информация</h2>`);
              } else {
                return [
                  createVNode("h2", { class: "text-xl font-semibold" }, "Дополнительная информация")
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
                if (unref(vacancy).created_at) {
                  _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500 mb-1"${_scopeId}>Дата создания</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(unref(vacancy).created_at))}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(vacancy).updated_at) {
                  _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500 mb-1"${_scopeId}>Последнее обновление</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(unref(vacancy).updated_at))}</dd></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500 mb-1"${_scopeId}>ID вакансии</dt><dd class="text-sm text-gray-900"${_scopeId}>#${ssrInterpolate(unref(vacancy).id)}</dd></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    unref(vacancy).created_at ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("dt", { class: "text-sm font-medium text-gray-500 mb-1" }, "Дата создания"),
                      createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(unref(vacancy).created_at)), 1)
                    ])) : createCommentVNode("", true),
                    unref(vacancy).updated_at ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("dt", { class: "text-sm font-medium text-gray-500 mb-1" }, "Последнее обновление"),
                      createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(unref(vacancy).updated_at)), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("dt", { class: "text-sm font-medium text-gray-500 mb-1" }, "ID вакансии"),
                      createVNode("dd", { class: "text-sm text-gray-900" }, "#" + toDisplayString(unref(vacancy).id), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h2 class="text-xl font-semibold"${_scopeId}>Настройки отображения</h2>`);
            } else {
              return [
                createVNode("h2", { class: "text-xl font-semibold" }, "Настройки отображения")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Дополнительные поля </label>`);
              _push2(ssrRenderComponent(_component_USelect, {
                modelValue: unref(expandFields),
                "onUpdate:modelValue": ($event) => isRef(expandFields) ? expandFields.value = $event : null,
                placeholder: "Только основные поля",
                items: [
                  { label: "С датами создания и обновления", value: "created_at,updated_at" },
                  { label: "Только дата создания", value: "created_at" },
                  { label: "Только дата обновления", value: "updated_at" }
                ],
                onChange: fetchVacancy
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UButton, {
                icon: "i-lucide-refresh-cw",
                variant: "outline",
                onClick: fetchVacancy
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Обновить данные `);
                  } else {
                    return [
                      createTextVNode(" Обновить данные ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Дополнительные поля "),
                    createVNode(_component_USelect, {
                      modelValue: unref(expandFields),
                      "onUpdate:modelValue": ($event) => isRef(expandFields) ? expandFields.value = $event : null,
                      placeholder: "Только основные поля",
                      items: [
                        { label: "С датами создания и обновления", value: "created_at,updated_at" },
                        { label: "Только дата создания", value: "created_at" },
                        { label: "Только дата обновления", value: "updated_at" }
                      ],
                      onChange: fetchVacancy
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(_component_UButton, {
                    icon: "i-lucide-refresh-cw",
                    variant: "outline",
                    onClick: fetchVacancy
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Обновить данные ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BTeC6f-F.mjs.map
