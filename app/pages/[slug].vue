<script setup lang="ts">
import type { GhostPost } from '@tryghost/content-api'

const route = useRoute()
const { getSinglePage } = useGhost()
const { siteTitle, getMetaTitle } = useGhostSettings()
const { processHtml } = useGhostContent()

// Initialize Ghost interactive cards (toggles, etc.)
useGhostCards()

const slug = computed(() => route.params.slug as string)

const { data: page, pending, error } = await useAsyncData<GhostPost | null>(
  `page-${slug.value}`,
  () => getSinglePage(slug.value),
  {
    server: true
  }
)

// Process Ghost HTML to optimize images
const processedHtml = computed(() => {
  return page.value?.html ? processHtml(page.value.html) : ''
})

// SEO Meta tags
useHead(() => ({
  title: page.value?.meta_title || getMetaTitle(page.value?.title || 'Page'),
  meta: [
    // Basic meta tags
    { 
      name: 'description', 
      content: page.value?.meta_description || page.value?.excerpt || 'Read this page on our site' 
    },
    
    // Open Graph meta tags
    { 
      property: 'og:title', 
      content: page.value?.og_title || page.value?.title || 'Page' 
    },
    { 
      property: 'og:description', 
      content: page.value?.og_description || page.value?.excerpt || '' 
    },
    { 
      property: 'og:image', 
      content: page.value?.og_image || page.value?.feature_image || '' 
    },
    { 
      property: 'og:type', 
      content: 'website' 
    },
    { 
      property: 'og:url', 
      content: page.value?.url || '' 
    },
    { 
      property: 'og:site_name', 
      content: siteTitle.value 
    },
    
    // Twitter Card meta tags
    { 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    },
    { 
      name: 'twitter:title', 
      content: page.value?.twitter_title || page.value?.og_title || page.value?.title || 'Page' 
    },
    { 
      name: 'twitter:description', 
      content: page.value?.twitter_description || page.value?.og_description || page.value?.excerpt || '' 
    },
    { 
      name: 'twitter:image', 
      content: page.value?.twitter_image || page.value?.og_image || page.value?.feature_image || '' 
    }
  ],
  link: [
    // Canonical URL
    ...(page.value?.canonical_url ? [{ rel: 'canonical', href: page.value.canonical_url }] : [])
  ]
}))
</script>

<template>
  <div>
    <div v-if="pending" class="max-w-4xl mx-auto">
      <USkeleton class="h-12 mb-4" />
      <USkeleton class="h-64 mb-8" />
      <USkeleton class="h-96" />
    </div>

    <div v-else-if="error" class="max-w-4xl mx-auto">
      <UAlert
        color="error"
        variant="soft"
        title="Error loading page"
        :description="error.message"
        class="mb-8"
      />
      <UButton to="/" variant="soft">
        Back to Home
      </UButton>
    </div>

    <article v-else-if="page" class="max-w-4xl mx-auto">
      <!-- Back button -->
      <UButton to="/" variant="ghost" icon="i-heroicons-arrow-left" class="mb-6">
        Back to Home
      </UButton>

      <!-- Featured Image -->
      <NuxtImg
        v-if="page.feature_image"
        :src="page.feature_image"
        :alt="page.title"
        class="w-full h-96 object-cover rounded-lg mb-8"
      />

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        {{ page.title }}
      </h1>

      <!-- Content -->
      <div 
        class="ghost-post mb-12"
        v-html="processedHtml"
      />

      <!-- Footer -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
        <UButton to="/" variant="soft" icon="i-heroicons-arrow-left">
          Back to Home
        </UButton>
      </div>
    </article>

    <div v-else class="max-w-4xl mx-auto text-center py-12">
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Page not found
      </p>
      <UButton to="/" variant="soft">
        Back to Home
      </UButton>
    </div>
  </div>
</template>

