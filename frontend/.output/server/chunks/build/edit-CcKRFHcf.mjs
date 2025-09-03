import { e as useRoute, a as useRouter, f as useToast, g as useApi, u as useHead, d as _sfc_main$9, c as _sfc_main$e } from './server.mjs';
import { _ as __nuxt_component_1 } from './InlineLoading-CR2R8tt1.mjs';
import { _ as _sfc_main$1 } from './Card-C_IdJI02.mjs';
import { defineComponent, ref, watchEffect, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { J as JobForm } from './JobForm-ZEHSL_rJ.mjs';
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
import './Input-4oh0gbFz.mjs';
import './Select-VTHFZR89.mjs';
import 'yup';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const { getVacancy, updateVacancy } = useApi();
    const id = route.params.id;
    const vacancy = ref();
    const loading = ref(false);
    const fetchLoading = ref(true);
    const error = ref(null);
    const fetchVacancy = async () => {
      fetchLoading.value = true;
      error.value = null;
      try {
        vacancy.value = await getVacancy(id);
      } catch (err) {
        error.value = err;
        toast.add({
          title: "Ошибка",
          description: "Не удалось загрузить данные вакансии",
          color: "error"
        });
      } finally {
        fetchLoading.value = false;
      }
    };
    const handleSubmit = async (formData) => {
      loading.value = true;
      try {
        await updateVacancy(id, formData);
        toast.add({
          title: "Успех!",
          description: "Вакансия успешно обновлена",
          color: "success"
        });
        router.push(`/jobs/${id}`);
      } catch (error2) {
        console.error("Ошибка обновления вакансии:", error2);
        let errorMessage = "Не удалось обновить вакансию";
        if (error2.data && error2.data.errors) {
          const errors = error2.data.errors;
          if (Array.isArray(errors)) {
            errorMessage = errors.join(", ");
          } else if (typeof errors === "object") {
            errorMessage = Object.values(errors).flat().join(", ");
          }
        }
        toast.add({
          title: "Ошибка обновления",
          description: errorMessage,
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleCancel = () => {
      router.push(`/jobs/${id}`);
    };
    watchEffect(() => {
      if (vacancy.value?.title) {
        useHead({
          title: `Редактирование: ${vacancy.value.title}`
        });
      } else {
        useHead({
          title: "Редактирование вакансии"
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9;
      const _component_InlineLoading = __nuxt_component_1;
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4" }, _attrs))}><div class="max-w-2xl mx-auto"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-arrow-left",
        variant: "ghost",
        onClick: ($event) => unref(router).push(`/jobs/${unref(id)}`)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Назад к вакансии `);
          } else {
            return [
              createTextVNode(" Назад к вакансии ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(fetchLoading)) {
        _push(ssrRenderComponent(_component_InlineLoading, {
          message: "Загрузка данных вакансии",
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
              _push2(`</div><h3 class="text-lg font-semibold text-red-700 mb-2"${_scopeId}>Ошибка загрузки</h3><p class="text-gray-600 mb-4"${_scopeId}>Не удалось загрузить данные вакансии для редактирования</p><div class="space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: fetchVacancy,
                color: "red",
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
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: ($event) => unref(router).push("/jobs"),
                variant: "ghost"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` К списку вакансий `);
                  } else {
                    return [
                      createTextVNode(" К списку вакансий ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
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
                  createVNode("p", { class: "text-gray-600 mb-4" }, "Не удалось загрузить данные вакансии для редактирования"),
                  createVNode("div", { class: "space-x-2" }, [
                    createVNode(_component_UButton, {
                      onClick: fetchVacancy,
                      color: "red",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Попробовать снова ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      onClick: ($event) => unref(router).push("/jobs"),
                      variant: "ghost"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" К списку вакансий ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(vacancy)) {
        _push(`<div>`);
        _push(ssrRenderComponent(JobForm, {
          "initial-data": unref(vacancy),
          loading: unref(loading),
          "is-edit": "",
          onSubmit: handleSubmit,
          onCancel: handleCancel
        }, null, _parent));
        if (unref(vacancy).updated_at) {
          _push(ssrRenderComponent(_component_UCard, { class: "mt-6 border-gray-200 bg-gray-50" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-2 text-sm text-gray-600"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-clock",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}> Последнее обновление: ${ssrInterpolate(new Date(unref(vacancy).updated_at * 1e3).toLocaleString("ru-RU"))}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-2 text-sm text-gray-600" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-clock",
                      class: "w-4 h-4"
                    }),
                    createVNode("span", null, " Последнее обновление: " + toDisplayString(new Date(unref(vacancy).updated_at * 1e3).toLocaleString("ru-RU")), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/jobs/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-CcKRFHcf.mjs.map
