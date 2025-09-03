import { b as useAuth, u as useHead, d as _sfc_main$9, v as __nuxt_component_2$1 } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-C_IdJI02.mjs';
import { _ as _sfc_main$3 } from './Badge-GHH234is.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, computed, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RoleInfo",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      getRoleDisplayName,
      getRoleBadgeColor,
      canViewVacancies,
      canCreateVacancies,
      canUpdateVacancies,
      canDeleteVacancies,
      canViewStats,
      canManageUsers
    } = useRbac();
    const permissions = computed(() => {
      const perms = [];
      if (canViewVacancies.value) perms.push("Просмотр вакансий");
      if (canCreateVacancies.value) perms.push("Создание вакансий");
      if (canUpdateVacancies.value) perms.push("Редактирование вакансий");
      if (canDeleteVacancies.value) perms.push("Удаление вакансий");
      if (canViewStats.value) perms.push("Просмотр статистики");
      if (canManageUsers.value) perms.push("Управление пользователями");
      return perms;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      const _component_Icon = __nuxt_component_2$1;
      const _component_UBadge = _sfc_main$3;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-shield-check",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Информация о роли</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: "i-lucide-shield-check",
                  class: "w-5 h-5"
                }),
                createVNode("h3", { class: "text-lg font-semibold" }, "Информация о роли")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Текущая роль</label>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: unref(getRoleBadgeColor)(),
              variant: "subtle",
              size: "lg",
              class: "flex items-center gap-2 w-fit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-user-check",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(getRoleDisplayName)())}`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "i-lucide-user-check",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" " + toDisplayString(unref(getRoleDisplayName)()), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Доступные действия</label><div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(permissions), (permission) => {
              _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-check",
                class: "w-4 h-4 text-green-600"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm text-gray-700"${_scopeId}>${ssrInterpolate(permission)}</span></div>`);
            });
            _push2(`<!--]-->`);
            if (unref(permissions).length === 0) {
              _push2(`<div class="text-sm text-gray-500 italic"${_scopeId}> Нет доступных действий </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Текущая роль"),
                  createVNode(_component_UBadge, {
                    color: unref(getRoleBadgeColor)(),
                    variant: "subtle",
                    size: "lg",
                    class: "flex items-center gap-2 w-fit"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "i-lucide-user-check",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" " + toDisplayString(unref(getRoleDisplayName)()), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Доступные действия"),
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(permissions), (permission) => {
                      return openBlock(), createBlock("div", {
                        key: permission,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode(_component_Icon, {
                          name: "i-lucide-check",
                          class: "w-4 h-4 text-green-600"
                        }),
                        createVNode("span", { class: "text-sm text-gray-700" }, toDisplayString(permission), 1)
                      ]);
                    }), 128)),
                    unref(permissions).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-gray-500 italic"
                    }, " Нет доступных действий ")) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RoleInfo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "RoleInfo" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, logout } = useAuth();
    const { getRoleDisplayName, getRoleBadgeColor } = useRbac();
    useHead({
      title: "Профиль пользователя"
    });
    const formatDate = (timestamp) => {
      return new Date(timestamp * 1e3).toLocaleString("ru-RU");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9;
      const _component_UCard = _sfc_main$2;
      const _component_Icon = __nuxt_component_2$1;
      const _component_UBadge = _sfc_main$3;
      const _component_RoleInfo = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4" }, _attrs))}><div class="max-w-4xl mx-auto space-y-6"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-arrow-left",
        variant: "ghost",
        onClick: ($event) => _ctx.$router.push("/jobs")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Назад к вакансиям `);
          } else {
            return [
              createTextVNode(" Назад к вакансиям ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">Профиль пользователя</h1><p class="text-gray-600">Информация об аккаунте и правах доступа</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-user",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Основная информация</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: "i-lucide-user",
                  class: "w-5 h-5"
                }),
                createVNode("h3", { class: "text-lg font-semibold" }, "Основная информация")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-user",
              class: "w-8 h-8 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h4 class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(user)?.username)}</h4><p class="text-gray-600"${_scopeId}>${ssrInterpolate(unref(user)?.email)}</p>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: unref(getRoleBadgeColor)(),
              variant: "subtle",
              class: "mt-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(getRoleDisplayName)())}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(getRoleDisplayName)()), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-2 gap-4 pt-4 border-t"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>ID пользователя</dt><dd class="text-sm text-gray-900"${_scopeId}>#${ssrInterpolate(unref(user)?.id)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Статус</dt><dd class="text-sm text-gray-900"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: unref(user)?.status === 1 ? "success" : "error",
              variant: "subtle"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(user)?.status === 1 ? "Активный" : "Неактивный")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(user)?.status === 1 ? "Активный" : "Неактивный"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Дата регистрации</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(unref(user)?.created_at ? formatDate(unref(user).created_at) : "-")}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Последнее обновление</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(unref(user)?.updated_at ? formatDate(unref(user).updated_at) : "-")}</dd></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full flex items-center justify-center" }, [
                    createVNode(_component_Icon, {
                      name: "i-lucide-user",
                      class: "w-8 h-8 text-white"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(unref(user)?.username), 1),
                    createVNode("p", { class: "text-gray-600" }, toDisplayString(unref(user)?.email), 1),
                    createVNode(_component_UBadge, {
                      color: unref(getRoleBadgeColor)(),
                      variant: "subtle",
                      class: "mt-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(getRoleDisplayName)()), 1)
                      ]),
                      _: 1
                    }, 8, ["color"])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4 pt-4 border-t" }, [
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "ID пользователя"),
                    createVNode("dd", { class: "text-sm text-gray-900" }, "#" + toDisplayString(unref(user)?.id), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Статус"),
                    createVNode("dd", { class: "text-sm text-gray-900" }, [
                      createVNode(_component_UBadge, {
                        color: unref(user)?.status === 1 ? "success" : "error",
                        variant: "subtle"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(user)?.status === 1 ? "Активный" : "Неактивный"), 1)
                        ]),
                        _: 1
                      }, 8, ["color"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Дата регистрации"),
                    createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(unref(user)?.created_at ? formatDate(unref(user).created_at) : "-"), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Последнее обновление"),
                    createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(unref(user)?.updated_at ? formatDate(unref(user).updated_at) : "-"), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_RoleInfo, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-settings",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Действия</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_Icon, {
                  name: "i-lucide-settings",
                  class: "w-5 h-5"
                }),
                createVNode("h3", { class: "text-lg font-semibold" }, "Действия")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-lucide-log-out",
              color: "error",
              variant: "outline",
              onClick: unref(logout)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Выйти из системы `);
                } else {
                  return [
                    createTextVNode(" Выйти из системы ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-3" }, [
                createVNode(_component_UButton, {
                  icon: "i-lucide-log-out",
                  color: "error",
                  variant: "outline",
                  onClick: unref(logout)
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Выйти из системы ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-LsRKjdQo.mjs.map
