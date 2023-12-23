// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mailServ: '',
    mailPort: '',
    mailUser: '',
    mailPass: '',
    mailTo: '',
  },
  css: [
    `~/assets/main.css`
  ]
})
