import { a as useRouter, b as useAuth, u as useHead, c as _sfc_main$e, d as _sfc_main$9 } from './server.mjs';
import { defineComponent, useSSRContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { user } = useAuth();
    useHead({
      title: "Система управления вакансиями",
      meta: [
        { name: "description", content: "Современная платформа для управления вакансиями с удобным API" }
      ]
    });
    const features = [
      {
        icon: "i-lucide-briefcase",
        title: "Управление вакансиями",
        description: "Создавайте, редактируйте и управляйте вакансиями с помощью интуитивного интерфейса"
      },
      {
        icon: "i-lucide-search",
        title: "Мощный поиск",
        description: "Находите нужные вакансии с помощью продвинутых фильтров и сортировки"
      },
      {
        icon: "i-lucide-chart-bar",
        title: "Аналитика",
        description: "Отслеживайте статистику и получайте insights по вашим вакансиям"
      },
      {
        icon: "i-lucide-shield-check",
        title: "Безопасность",
        description: "Надежная система аутентификации с токенами доступа и RBAC контролем ролей"
      },
      {
        icon: "i-lucide-zap",
        title: "REST API",
        description: "Полнофункциональный API для интеграции с внешними системами"
      },
      {
        icon: "i-lucide-smartphone",
        title: "Адаптивность",
        description: "Отзывчивый дизайн, который отлично работает на всех устройствах"
      }
    ];
    const stats = [
      { label: "Активных вакансий", value: "150+", icon: "i-lucide-trending-up" },
      { label: "Пользователей", value: "50+", icon: "i-lucide-users" },
      { label: "API запросов/день", value: "10k+", icon: "i-lucide-activity" },
      { label: "Время отклика", value: "<100ms", icon: "i-lucide-zap" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))} data-v-4d960afb><section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50" data-v-4d960afb><div class="absolute inset-0 bg-grid-pattern opacity-5" data-v-4d960afb></div><div class="relative max-w-7xl mx-auto px-4 py-20 sm:py-32" data-v-4d960afb><div class="text-center" data-v-4d960afb><div class="flex justify-center mb-8" data-v-4d960afb><div class="relative" data-v-4d960afb><div class="w-20 h-20 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-xl" data-v-4d960afb>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-briefcase",
        class: "w-10 h-10 text-white"
      }, null, _parent));
      _push(`</div><div class="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center" data-v-4d960afb>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-check",
        class: "w-3 h-3 text-white"
      }, null, _parent));
      _push(`</div></div></div><h1 class="text-4xl sm:text-6xl font-bold text-gray-900 mb-6" data-v-4d960afb> Система управления <span class="bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent" data-v-4d960afb> вакансиями </span></h1><p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" data-v-4d960afb> Современная платформа для эффективного управления вакансиями с мощным REST API, продвинутой аналитикой и интуитивным интерфейсом </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-4d960afb>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        icon: "i-lucide-arrow-right",
        trailing: "",
        onClick: ($event) => unref(router).push(unref(user) ? "/jobs" : "/login"),
        class: "px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(user) ? "Перейти к вакансиям" : "Войти в систему")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(user) ? "Перейти к вакансиям" : "Войти в систему"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        variant: "outline",
        icon: "i-lucide-play-circle",
        onClick: ($event) => unref(router).push("/demo"),
        class: "px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Демо `);
          } else {
            return [
              createTextVNode(" Демо ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><section class="py-16 bg-white border-y" data-v-4d960afb><div class="max-w-7xl mx-auto px-4" data-v-4d960afb><div class="grid grid-cols-2 md:grid-cols-4 gap-8" data-v-4d960afb><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="text-center" data-v-4d960afb><div class="flex justify-center mb-3" data-v-4d960afb><div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center" data-v-4d960afb>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: stat.icon,
          class: "w-6 h-6 text-slate-600"
        }, null, _parent));
        _push(`</div></div><div class="text-2xl font-bold text-gray-900 mb-1" data-v-4d960afb>${ssrInterpolate(stat.value)}</div><div class="text-sm text-gray-600" data-v-4d960afb>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 bg-gray-50" data-v-4d960afb><div class="max-w-7xl mx-auto px-4" data-v-4d960afb><div class="text-center mb-16" data-v-4d960afb><h2 class="text-3xl font-bold text-gray-900 mb-4" data-v-4d960afb> Почему выбирают нашу платформу? </h2><p class="text-lg text-gray-600 max-w-2xl mx-auto" data-v-4d960afb> Мы создали современное решение, которое объединяет простоту использования с мощными возможностями для профессионалов </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-4d960afb><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(`<div class="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow" data-v-4d960afb><div class="flex items-center gap-4 mb-4" data-v-4d960afb><div class="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg flex items-center justify-center" data-v-4d960afb>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: feature.icon,
          class: "w-6 h-6 text-white"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-gray-900" data-v-4d960afb>${ssrInterpolate(feature.title)}</h3></div><p class="text-gray-600 leading-relaxed" data-v-4d960afb>${ssrInterpolate(feature.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 bg-gradient-to-r from-slate-700 to-gray-800" data-v-4d960afb><div class="max-w-4xl mx-auto px-4 text-center" data-v-4d960afb><h2 class="text-3xl font-bold text-white mb-4" data-v-4d960afb> Готовы начать? </h2><p class="text-xl text-slate-200 mb-8" data-v-4d960afb> Присоединяйтесь к современной системе управления вакансиями уже сегодня </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-4d960afb>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        variant: "solid",
        color: "neutral",
        icon: "i-lucide-rocket",
        onClick: ($event) => unref(router).push(unref(user) ? "/jobs" : "/login"),
        class: "px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(user) ? "Открыть панель" : "Войти")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(user) ? "Открыть панель" : "Войти"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "lg",
        variant: "outline",
        color: "neutral",
        icon: "i-lucide-play-circle",
        onClick: ($event) => unref(router).push("/demo"),
        class: "px-8 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Попробовать демо `);
          } else {
            return [
              createTextVNode(" Попробовать демо ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><footer class="bg-gray-900 text-white py-12" data-v-4d960afb><div class="max-w-7xl mx-auto px-4" data-v-4d960afb><div class="grid grid-cols-1 md:grid-cols-4 gap-8" data-v-4d960afb><div class="md:col-span-2" data-v-4d960afb><div class="flex items-center gap-3 mb-4" data-v-4d960afb><div class="w-8 h-8 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg flex items-center justify-center" data-v-4d960afb>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-briefcase",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</div><span class="text-lg font-semibold" data-v-4d960afb>JobManager</span></div><p class="text-gray-400 mb-4 max-w-md" data-v-4d960afb> Современная система управления вакансиями, созданная с использованием передовых технологий Yii2 и Nuxt 3. </p></div><div data-v-4d960afb><h3 class="font-semibold mb-4" data-v-4d960afb>Технологии</h3><ul class="space-y-2 text-gray-400" data-v-4d960afb><li data-v-4d960afb>Yii2 Framework</li><li data-v-4d960afb>Nuxt 3</li><li data-v-4d960afb>TypeScript</li><li data-v-4d960afb>REST API</li></ul></div><div data-v-4d960afb><h3 class="font-semibold mb-4" data-v-4d960afb>Возможности</h3><ul class="space-y-2 text-gray-400" data-v-4d960afb><li data-v-4d960afb>CRUD операции</li><li data-v-4d960afb>Аутентификация</li><li data-v-4d960afb>Поиск и фильтры</li><li data-v-4d960afb>Аналитика</li></ul></div></div><div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400" data-v-4d960afb><p data-v-4d960afb>© 2025 JobManager. Создано для демонстрации возможностей.</p></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4d960afb"]]);

export { index as default };
//# sourceMappingURL=index-BabfQiMe.mjs.map
