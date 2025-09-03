import { B as executeAsync } from '../nitro/nitro.mjs';
import { J as defineNuxtRouteMiddleware, b as useAuth, K as useLoadingScreen, L as createError } from './server.mjs';
import { u as useDemo } from './useDemo-CN3BHnyK.mjs';
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
import 'vue';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'vue/server-renderer';
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

const demo = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.path.startsWith("/demo")) {
    return;
  }
  const { token } = useAuth();
  const { autoDemoLogin, isDemoUser } = useDemo();
  const { show, hide, setMessage, setProgress } = useLoadingScreen();
  if (isDemoUser.value && token.value?.access_token) {
    return;
  }
  try {
    show("Подготовка демо режима", true);
    setProgress(20);
    ;
    [__temp, __restore] = executeAsync(() => new Promise((resolve) => setTimeout(resolve, 300))), await __temp, __restore();
    ;
    setMessage("Авторизация под demo пользователем");
    setProgress(50);
    const success = ([__temp, __restore] = executeAsync(() => autoDemoLogin()), __temp = await __temp, __restore(), __temp);
    setProgress(80);
    if (!success) {
      throw new Error("Demo login failed");
    }
    setMessage("Демо готово!");
    setProgress(100);
    ;
    [__temp, __restore] = executeAsync(() => new Promise((resolve) => setTimeout(resolve, 500))), await __temp, __restore();
    ;
    hide();
    console.log("Demo user auto-login successful");
  } catch (error) {
    hide();
    console.error("Demo auto-login failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Демо недоступен. Попробуйте позже или войдите вручную."
    });
  }
});

export { demo as default };
//# sourceMappingURL=demo-B11vJCR1.mjs.map
