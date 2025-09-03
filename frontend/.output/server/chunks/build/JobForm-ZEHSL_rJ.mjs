import { _ as _sfc_main$2$1, a as _sfc_main$1$1, b as _sfc_main$4 } from './Input-4oh0gbFz.mjs';
import { _ as _sfc_main$3 } from './Card-C_IdJI02.mjs';
import { defineComponent, reactive, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSlots, computed, ref, nextTick, renderSlot, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { Primitive, useForwardPropsEmits, NumberFieldRoot, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from 'reka-ui';
import { useVModel, reactivePick } from '@vueuse/core';
import { d as _sfc_main$9, h as useAppConfig, y as useFormField, x as useComponentIcons, t as tv, c as _sfc_main$e, l as _sfc_main$c, i as useLocale, w as useButtonGroup, z as looseToNumber } from './server.mjs';
import { _ as _sfc_main$5 } from './Select-VTHFZR89.mjs';
import * as yup from 'yup';

const theme$1 = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute start-0 flex items-start",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute end-0 flex items-start",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2 inset-y-1",
        "trailing": "pe-2 inset-y-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "autoresize": {
      "true": {
        "base": "resize-none"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UTextarea",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    autoresize: { type: Boolean, required: false },
    autoresizeDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    rows: { type: Number, required: false, default: 3 },
    maxrows: { type: Number, required: false, default: 0 },
    highlight: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props, { deferInputValidation: true });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.textarea || {} })({
      color: color.value,
      variant: props.variant,
      size: size?.value,
      loading: props.loading,
      highlight: highlight.value,
      autoresize: props.autoresize,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing
    }));
    const textareaRef = ref(null);
    function updateInput(value) {
      if (props.modelModifiers?.trim) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number) {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullify) {
        value ||= null;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      autoResize();
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    function autoResize() {
      if (props.autoresize && textareaRef.value) {
        textareaRef.value.rows = props.rows;
        const overflow = textareaRef.value.style.overflow;
        textareaRef.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textareaRef.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textareaRef.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textareaRef.value.style.overflow = overflow;
      }
    }
    watch(modelValue, () => {
      nextTick(autoResize);
    });
    __expose({
      textareaRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
              id: unref(id),
              ref_key: "textareaRef",
              ref: textareaRef,
              value: unref(modelValue),
              name: unref(name),
              rows: __props.rows,
              placeholder: __props.placeholder,
              class: ui.value.base({ class: props.ui?.base }),
              disabled: unref(disabled),
              required: __props.required
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), "textarea")}${_scopeId}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$c, mergeProps({
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("textarea", mergeProps({
                id: unref(id),
                ref_key: "textareaRef",
                ref: textareaRef,
                value: unref(modelValue),
                name: unref(name),
                rows: __props.rows,
                placeholder: __props.placeholder,
                class: ui.value.base({ class: props.ui?.base }),
                disabled: unref(disabled),
                required: __props.required
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "value", "name", "rows", "placeholder", "disabled", "required", "onFocus"]),
              renderSlot(_ctx.$slots, "default"),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                class: ui.value.leading({ class: props.ui?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", {}, () => [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                    key: 0,
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                    key: 1,
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                class: ui.value.trailing({ class: props.ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", {}, () => [
                  unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                    key: 0,
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "size": {
      "xs": "px-2 py-1 text-xs gap-1",
      "sm": "px-2.5 py-1.5 text-xs gap-1.5",
      "md": "px-2.5 py-1.5 text-sm gap-1.5",
      "lg": "px-3 py-2 text-sm gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "px-7"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "px-8"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "px-9"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "px-10"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "px-11"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "pe-7"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "pe-8"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "pe-9"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "pe-10"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "pe-11"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInputNumber",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    highlight: { type: Boolean, required: false },
    orientation: { type: String, required: false, default: "horizontal" },
    increment: { type: Object, required: false },
    incrementIcon: { type: String, required: false },
    incrementDisabled: { type: Boolean, required: false },
    decrement: { type: Object, required: false },
    decrementIcon: { type: String, required: false },
    decrementDisabled: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false },
    locale: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    modelValue: { type: [Number, null], required: false },
    defaultValue: { type: Number, required: false },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
    step: { type: Number, required: false },
    stepSnapping: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    formatOptions: { type: null, required: false },
    disableWheelChange: { type: Boolean, required: false },
    invertWheelChange: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { t, code: codeLocale } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "modelValue", "defaultValue", "min", "max", "step", "stepSnapping", "formatOptions", "disableWheelChange", "invertWheelChange", "readonly"), emits);
    const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formGroupSize, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const locale = computed(() => props.locale || codeLocale.value);
    const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.inputNumber || {} })({
      color: color.value,
      variant: props.variant,
      size: inputSize.value,
      highlight: highlight.value,
      orientation: props.orientation,
      buttonGroup: orientation.value
    }));
    const incrementIcon = computed(() => props.incrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp));
    const decrementIcon = computed(() => props.decrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown));
    const inputRef = ref(null);
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(NumberFieldRoot), mergeProps(unref(rootProps), {
        id: unref(id),
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        name: unref(name),
        disabled: unref(disabled),
        locale: locale.value,
        "onUpdate:modelValue": onUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NumberFieldInput), mergeProps({ ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              ref_key: "inputRef",
              ref: inputRef,
              placeholder: __props.placeholder,
              required: __props.required,
              class: ui.value.base({ class: props.ui?.base }),
              onBlur,
              onFocus: unref(emitFormFocus)
            }), null, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass(ui.value.increment({ class: props.ui?.increment }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NumberFieldIncrement), {
              "as-child": "",
              disabled: unref(disabled) || __props.incrementDisabled
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "increment", {}, () => {
                    _push3(ssrRenderComponent(_sfc_main$9, mergeProps({
                      icon: incrementIcon.value,
                      color: unref(color),
                      size: __props.size,
                      variant: "link",
                      "aria-label": unref(t)("inputNumber.increment")
                    }, typeof __props.increment === "object" ? __props.increment : void 0), null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "increment", {}, () => [
                      createVNode(_sfc_main$9, mergeProps({
                        icon: incrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.increment")
                      }, typeof __props.increment === "object" ? __props.increment : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div><div class="${ssrRenderClass(ui.value.decrement({ class: props.ui?.decrement }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NumberFieldDecrement), {
              "as-child": "",
              disabled: unref(disabled) || __props.decrementDisabled
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "decrement", {}, () => {
                    _push3(ssrRenderComponent(_sfc_main$9, mergeProps({
                      icon: decrementIcon.value,
                      color: unref(color),
                      size: __props.size,
                      variant: "link",
                      "aria-label": unref(t)("inputNumber.decrement")
                    }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "decrement", {}, () => [
                      createVNode(_sfc_main$9, mergeProps({
                        icon: decrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.decrement")
                      }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(NumberFieldInput), mergeProps({ ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                ref_key: "inputRef",
                ref: inputRef,
                placeholder: __props.placeholder,
                required: __props.required,
                class: ui.value.base({ class: props.ui?.base }),
                onBlur,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["placeholder", "required", "class", "onFocus"]),
              createVNode("div", {
                class: ui.value.increment({ class: props.ui?.increment })
              }, [
                createVNode(unref(NumberFieldIncrement), {
                  "as-child": "",
                  disabled: unref(disabled) || __props.incrementDisabled
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "increment", {}, () => [
                      createVNode(_sfc_main$9, mergeProps({
                        icon: incrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.increment")
                      }, typeof __props.increment === "object" ? __props.increment : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled"])
              ], 2),
              createVNode("div", {
                class: ui.value.decrement({ class: props.ui?.decrement })
              }, [
                createVNode(unref(NumberFieldDecrement), {
                  "as-child": "",
                  disabled: unref(disabled) || __props.decrementDisabled
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "decrement", {}, () => [
                      createVNode(_sfc_main$9, mergeProps({
                        icon: decrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.decrement")
                      }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled"])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/InputNumber.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "JobForm",
  __ssrInlineRender: true,
  props: {
    initialData: { default: () => ({}) },
    isEdit: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const schema = yup.object({
      title: yup.string().required("Название вакансии обязательно").min(3, "Название должно содержать минимум 3 символа").max(255, "Название не должно превышать 255 символов"),
      description: yup.string().required("Описание обязательно").min(10, "Описание должно содержать минимум 10 символов"),
      salary: yup.number().required("Зарплата обязательна").min(1, "Зарплата должна быть больше 0").integer("Зарплата должна быть целым числом"),
      status: yup.number().required("Статус обязателен").oneOf([0, 1], "Некорректный статус")
    });
    const props = __props;
    const emit = __emit;
    const state = reactive({
      title: props.initialData.title || "",
      description: props.initialData.description || "",
      salary: props.initialData.salary || 0,
      status: props.initialData.status ?? 1
    });
    const statusOptions = [
      { label: "Активная", value: 1 },
      { label: "Архивная", value: 0 }
    ];
    const onSubmit = (event) => {
      emit("submit", event.data);
    };
    const handleCancel = () => {
      emit("cancel");
    };
    watch(() => props.initialData, (newData) => {
      Object.assign(state, {
        title: newData.title || "",
        description: newData.description || "",
        salary: newData.salary || null,
        status: newData.status ?? 1
      });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = _sfc_main$2$1;
      const _component_UCard = _sfc_main$3;
      const _component_UFormField = _sfc_main$1$1;
      const _component_UInput = _sfc_main$4;
      const _component_UTextarea = _sfc_main$2;
      const _component_UInputNumber = _sfc_main$1;
      const _component_USelect = _sfc_main$5;
      const _component_UButton = _sfc_main$9;
      _push(ssrRenderComponent(_component_UForm, mergeProps({
        schema: unref(schema),
        state: unref(state),
        onSubmit,
        class: "space-y-6"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="text-xl font-semibold"${_scopeId2}>${ssrInterpolate(_ctx.isEdit ? "Редактирование вакансии" : "Создание новой вакансии")}</h2>`);
                } else {
                  return [
                    createVNode("h2", { class: "text-xl font-semibold" }, toDisplayString(_ctx.isEdit ? "Редактирование вакансии" : "Создание новой вакансии"), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Название вакансии",
                    name: "title",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).title,
                          "onUpdate:modelValue": ($event) => unref(state).title = $event,
                          placeholder: "Введите название вакансии"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).title,
                            "onUpdate:modelValue": ($event) => unref(state).title = $event,
                            placeholder: "Введите название вакансии"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Описание",
                    name: "description",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UTextarea, {
                          class: "w-full",
                          modelValue: unref(state).description,
                          "onUpdate:modelValue": ($event) => unref(state).description = $event,
                          placeholder: "Опишите требования к кандидату, обязанности и условия работы",
                          rows: 6
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UTextarea, {
                            class: "w-full",
                            modelValue: unref(state).description,
                            "onUpdate:modelValue": ($event) => unref(state).description = $event,
                            placeholder: "Опишите требования к кандидату, обязанности и условия работы",
                            rows: 6
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Зарплата (₽)",
                    name: "salary",
                    required: "",
                    help: "Укажите размер заработной платы в рублях"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInputNumber, {
                          class: "w-full",
                          modelValue: unref(state).salary,
                          "onUpdate:modelValue": ($event) => unref(state).salary = $event,
                          min: 1e3,
                          step: 500,
                          "default-value": 5e4,
                          placeholder: "50000",
                          "format-options": {
                            style: "decimal",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true
                          }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInputNumber, {
                            class: "w-full",
                            modelValue: unref(state).salary,
                            "onUpdate:modelValue": ($event) => unref(state).salary = $event,
                            min: 1e3,
                            step: 500,
                            "default-value": 5e4,
                            placeholder: "50000",
                            "format-options": {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              useGrouping: true
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Статус",
                    name: "status",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelect, {
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: statusOptions
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelect, {
                            modelValue: unref(state).status,
                            "onUpdate:modelValue": ($event) => unref(state).status = $event,
                            items: statusOptions
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-y-4" }, [
                      createVNode(_component_UFormField, {
                        label: "Название вакансии",
                        name: "title",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).title,
                            "onUpdate:modelValue": ($event) => unref(state).title = $event,
                            placeholder: "Введите название вакансии"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Описание",
                        name: "description",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UTextarea, {
                            class: "w-full",
                            modelValue: unref(state).description,
                            "onUpdate:modelValue": ($event) => unref(state).description = $event,
                            placeholder: "Опишите требования к кандидату, обязанности и условия работы",
                            rows: 6
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Зарплата (₽)",
                        name: "salary",
                        required: "",
                        help: "Укажите размер заработной платы в рублях"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInputNumber, {
                            class: "w-full",
                            modelValue: unref(state).salary,
                            "onUpdate:modelValue": ($event) => unref(state).salary = $event,
                            min: 1e3,
                            step: 500,
                            "default-value": 5e4,
                            placeholder: "50000",
                            "format-options": {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              useGrouping: true
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Статус",
                        name: "status",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_USelect, {
                            modelValue: unref(state).status,
                            "onUpdate:modelValue": ($event) => unref(state).status = $event,
                            items: statusOptions
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3 pt-6 border-t border-gray-200"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "button",
                    variant: "outline",
                    onClick: handleCancel,
                    disabled: _ctx.loading
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Отмена `);
                      } else {
                        return [
                          createTextVNode(" Отмена ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    loading: _ctx.loading,
                    disabled: _ctx.loading
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.isEdit ? "Сохранить изменения" : "Создать вакансию")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.isEdit ? "Сохранить изменения" : "Создать вакансию"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-end gap-3 pt-6 border-t border-gray-200" }, [
                      createVNode(_component_UButton, {
                        type: "button",
                        variant: "outline",
                        onClick: handleCancel,
                        disabled: _ctx.loading
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Отмена ")
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(_component_UButton, {
                        type: "submit",
                        loading: _ctx.loading,
                        disabled: _ctx.loading
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.isEdit ? "Сохранить изменения" : "Создать вакансию"), 1)
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("h2", { class: "text-xl font-semibold" }, toDisplayString(_ctx.isEdit ? "Редактирование вакансии" : "Создание новой вакансии"), 1)
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-y-4" }, [
                    createVNode(_component_UFormField, {
                      label: "Название вакансии",
                      name: "title",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).title,
                          "onUpdate:modelValue": ($event) => unref(state).title = $event,
                          placeholder: "Введите название вакансии"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Описание",
                      name: "description",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UTextarea, {
                          class: "w-full",
                          modelValue: unref(state).description,
                          "onUpdate:modelValue": ($event) => unref(state).description = $event,
                          placeholder: "Опишите требования к кандидату, обязанности и условия работы",
                          rows: 6
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Зарплата (₽)",
                      name: "salary",
                      required: "",
                      help: "Укажите размер заработной платы в рублях"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInputNumber, {
                          class: "w-full",
                          modelValue: unref(state).salary,
                          "onUpdate:modelValue": ($event) => unref(state).salary = $event,
                          min: 1e3,
                          step: 500,
                          "default-value": 5e4,
                          placeholder: "50000",
                          "format-options": {
                            style: "decimal",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Статус",
                      name: "status",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_USelect, {
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: statusOptions
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex justify-end gap-3 pt-6 border-t border-gray-200" }, [
                    createVNode(_component_UButton, {
                      type: "button",
                      variant: "outline",
                      onClick: handleCancel,
                      disabled: _ctx.loading
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Отмена ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(_component_UButton, {
                      type: "submit",
                      loading: _ctx.loading,
                      disabled: _ctx.loading
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.isEdit ? "Сохранить изменения" : "Создать вакансию"), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "disabled"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/JobForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const JobForm = Object.assign(_sfc_main, { __name: "JobForm" });

export { JobForm as J };
//# sourceMappingURL=JobForm-ZEHSL_rJ.mjs.map
