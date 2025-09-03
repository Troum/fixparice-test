// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    ssr: false,
    modules: [
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://yii.survey360.online/api/v1'
        }
    }
})
