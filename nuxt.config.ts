// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/scripts",
    "nuxt-seo-utils",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
  ],

  css: ["~/assets/css/main.css", "~/assets/css/ghost.css"],

  runtimeConfig: {
    public: {
      ghostUrl: "",
      ghostContentApiKey: "",
    },
  },
  image: {
    domains: [process.env.NUXT_PUBLIC_GHOST_URL || ""],
    provider: "ipx"
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
});