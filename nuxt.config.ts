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
  experimental: {
    payloadExtraction:true
  },

  css: ["~/assets/css/main.css", "~/assets/css/ghost.css"],

  runtimeConfig: {
    public: {
      ghostUrl: "",
      ghostContentApiKey: "",
    },
  },
  image: {
    domains: [
      "ghost-blog1.vps2.eclectico.net",
      "static.ghost.org",
      "images.unsplash.com",
    ],
    provider: process.env.NODE_ENV === "production" ? "netlify" : "ipx",
  },
  routeRules: {
    '/**':{
      prerender:true
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
});