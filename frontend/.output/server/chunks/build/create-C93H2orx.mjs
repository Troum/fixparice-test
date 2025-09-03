import { a as useRouter, f as useToast, g as useApi, u as useHead, d as _sfc_main$9, c as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-C_IdJI02.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const toast = useToast();
    const { createVacancy } = useApi();
    const loading = ref(false);
    const handleSubmit = async (formData) => {
      loading.value = true;
      try {
        const response = await createVacancy(formData);
        toast.add({
          title: "Успех!",
          description: "Вакансия успешно создана",
          color: "success"
        });
        if (response && response.id) {
          router.push(`/jobs/${response.id}`);
        } else {
          router.push("/jobs");
        }
      } catch (error) {
        console.error("Ошибка создания вакансии:", error);
        let errorMessage = "Не удалось создать вакансию";
        if (error.data && error.data.errors) {
          const errors = error.data.errors;
          if (Array.isArray(errors)) {
            errorMessage = errors.join(", ");
          } else if (typeof errors === "object") {
            errorMessage = Object.values(errors).flat().join(", ");
          }
        }
        toast.add({
          title: "Ошибка создания",
          description: errorMessage,
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleCancel = () => {
      router.push("/jobs");
    };
    useHead({
      title: "Создание вакансии"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9;
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4" }, _attrs))}><div class="max-w-2xl mx-auto"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-arrow-left",
        variant: "ghost",
        onClick: ($event) => unref(router).push("/jobs")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Назад к списку `);
          } else {
            return [
              createTextVNode(" Назад к списку ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(JobForm, {
        loading: unref(loading),
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }, null, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "mt-6 border-blue-200 bg-blue-50" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-info",
              class: "w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm text-blue-800"${_scopeId}><p class="font-medium mb-1"${_scopeId}>Советы по созданию вакансии:</p><ul class="list-disc list-inside space-y-1"${_scopeId}><li${_scopeId}>Используйте четкое и понятное название должности</li><li${_scopeId}>Подробно опишите обязанности и требования</li><li${_scopeId}>Укажите реальный размер заработной платы</li><li${_scopeId}>Проверьте правописание перед публикацией</li></ul></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-3" }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-info",
                  class: "w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                }),
                createVNode("div", { class: "text-sm text-blue-800" }, [
                  createVNode("p", { class: "font-medium mb-1" }, "Советы по созданию вакансии:"),
                  createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                    createVNode("li", null, "Используйте четкое и понятное название должности"),
                    createVNode("li", null, "Подробно опишите обязанности и требования"),
                    createVNode("li", null, "Укажите реальный размер заработной платы"),
                    createVNode("li", null, "Проверьте правописание перед публикацией")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/jobs/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-C93H2orx.mjs.map
