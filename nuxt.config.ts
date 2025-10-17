// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxt/scripts", "nuxt-seo-utils",  "@nuxt/icon", "@nuxtjs/sitemap"],

  css: ["~/assets/css/main.css", "~/assets/css/ghost.css"],


  runtimeConfig: {
    public: {
      ghostUrl: process.env.GHOST_URL,
      ghostContentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    }
  }
  
});