import { c as _sfc_main$e } from './server.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InlineLoading",
  __ssrInlineRender: true,
  props: {
    message: { default: "Загрузка..." },
    size: { default: "md" }
  },
  setup(__props) {
    const sizeClasses = {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-12 w-12"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-8 space-y-4" }, _attrs))}><div class="relative"><div class="${ssrRenderClass([sizeClasses[_ctx.size], "animate-spin rounded-full border-2 border-slate-200 border-t-slate-600"])}"></div><div class="absolute inset-0 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-briefcase",
        class: "w-3 h-3 text-slate-600"
      }, null, _parent));
      _push(`</div></div><p class="text-gray-600 text-sm font-medium">${ssrInterpolate(_ctx.message)}</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InlineLoading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "InlineLoading" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=InlineLoading-CR2R8tt1.mjs.map
