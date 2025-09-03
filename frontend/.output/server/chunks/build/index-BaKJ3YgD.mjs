import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$3 } from './Input-4oh0gbFz.mjs';
import { _ as _sfc_main$1 } from './Card-C_IdJI02.mjs';
import { f as useToast, g as useApi, u as useHead, d as _sfc_main$9, s as useAppStore, a as useRouter } from './server.mjs';
import { defineComponent, reactive, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { object, string } from 'yup';
import '@vueuse/core';
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
    const schema = object({
      email: string().email("Недействительный email").required("Поле обязательно для заполнения"),
      password: string().min(8, "Пароль должен содержать минимум 8 символов").required("Поле обязательно для заполнения")
    });
    const state = reactive({
      email: void 0,
      password: void 0
    });
    const toast = useToast();
    const { login } = useApi();
    const onSubmit = (event) => {
      login(event.data).then((response) => {
        useAppStore().setUser(response.data?.user);
        useAppStore().setToken({
          access_token: response.data?.access_token,
          token_type: response.data?.token_type,
          expires_at: response.data?.expires_at
        });
        useRouter().push("/jobs").then(() => toast.add({ title: "Завершено успешно!", description: "Успешно вошли в систему", color: "success" }));
      });
    };
    useHead({
      title: "Вход в систему"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = _sfc_main$2;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$1$1;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$9;
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center min-h-screen w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UForm, {
        schema: unref(schema),
        state: unref(state),
        class: "space-y-4 w-[480px]",
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "shadow-lg" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-center"${_scopeId2}><span class="text-2xl"${_scopeId2}>Вход в панель администрирования</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-center" }, [
                      createVNode("span", { class: "text-2xl" }, "Вход в панель администрирования")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    "trailing-icon": "i-lucide-log-in",
                    size: "lg",
                    type: "submit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Войти `);
                      } else {
                        return [
                          createTextVNode(" Войти ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center justify-center py-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    class: "underline text-sm",
                    to: "/"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`На главную`);
                      } else {
                        return [
                          createTextVNode("На главную")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-end" }, [
                      createVNode(_component_UButton, {
                        "trailing-icon": "i-lucide-log-in",
                        size: "lg",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Войти ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex items-center justify-center py-1" }, [
                      createVNode(_component_RouterLink, {
                        class: "underline text-sm",
                        to: "/"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("На главную")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center justify-center gap-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Логин для входа",
                    name: "email",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          placeholder: "Введите email"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            placeholder: "Введите email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Пароль для входа",
                    name: "password",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: "password",
                          placeholder: "Введите пароль"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            type: "password",
                            placeholder: "Введите пароль"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-center gap-y-4" }, [
                      createVNode(_component_UFormField, {
                        label: "Логин для входа",
                        name: "email",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            placeholder: "Введите email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Пароль для входа",
                        name: "password",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            type: "password",
                            placeholder: "Введите пароль"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "shadow-lg" }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-center" }, [
                    createVNode("span", { class: "text-2xl" }, "Вход в панель администрирования")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-end" }, [
                    createVNode(_component_UButton, {
                      "trailing-icon": "i-lucide-log-in",
                      size: "lg",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Войти ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "flex items-center justify-center py-1" }, [
                    createVNode(_component_RouterLink, {
                      class: "underline text-sm",
                      to: "/"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("На главную")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col items-center justify-center gap-y-4" }, [
                    createVNode(_component_UFormField, {
                      label: "Логин для входа",
                      name: "email",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          placeholder: "Введите email"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Пароль для входа",
                      name: "password",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: "password",
                          placeholder: "Введите пароль"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BaKJ3YgD.mjs.map
