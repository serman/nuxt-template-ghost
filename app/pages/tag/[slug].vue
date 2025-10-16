<script setup lang="ts">
import type { GhostPost, GhostTag } from '@tryghost/content-api'
import { useGhost } from '~/composables/useGhost'
import { useGhostSettings } from '~/composables/useGhostSettings'
import PostCard from '~/components/PostCard.vue'

const route = useRoute()
const { getPostsByTag, getTag } = useGhost()
const { siteTitle, getMetaTitle } = useGhostSettings()

const slug = computed(() => route.params.slug as string)

// Fetch tag details
const { data: tag, pending: tagPending, error: tagError } = await useAsyncData<GhostTag | null>(
  `tag-${slug.value}`,
  () => getTag(slug.value),
  { server: true }
)

// Fetch posts for this tag
const { data: posts, pending: postsPending, error: postsError } = await useAsyncData<GhostPost[]>(
  `posts-tag-${slug.value}`,
  () => getPostsByTag(slug.value),
  { server: true }
)

// Handle 404 if tag not found
if (!tagPending.value && !tag.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tag not found'
  })
}

// SEO Meta tags - using default site metadata
useHead(() => ({
  title: getMetaTitle(tag.value?.name || 'Tag'),
  meta: [
    { 
      name: 'description', 
      content: tag.value?.description || `Posts tagged with ${tag.value?.name}` 
    },
    { property: 'og:type', content: 'website' },
    { 
      property: 'og:title', 
      content: getMetaTitle(tag.value?.name || 'Tag') 
    },
    { 
      property: 'og:description', 
      content: tag.value?.description || `Posts tagged with ${tag.value?.name}` 
    },
    { property: 'og:site_name', content: siteTitle.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { 
      name: 'twitter:title', 
      content: getMetaTitle(tag.value?.name || 'Tag') 
    },
    { 
      name: 'twitter:description', 
      content: tag.value?.description || `Posts tagged with ${tag.value?.name}` 
    }
  ]
}))

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<template>
  <div>
    <!-- Tag Header -->
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-4">
        <NuxtLink to="/" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          ← Back to Home
        </NuxtLink>
      </div>
      
      <!-- Loading state for tag -->
      <div v-if="tagPending" class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </div>
      
      <!-- Tag content -->
      <div v-else-if="tag" class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ tag.name }}
        </h1>
        
        <p v-if="tag.description" class="text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
          {{ tag.description }}
        </p>
        
        <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <span v-if="posts && posts.length > 0">
            {{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Posts Grid -->
    <div v-if="postsPending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Loading skeleton -->
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <UCard class="h-full">
          <template #header>
            <div class="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
          </template>
          <div class="space-y-3">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Posts content -->
    <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <!-- Empty state -->
    <div v-else-if="posts && posts.length === 0" class="text-center py-12">
      <div class="text-gray-400 dark:text-gray-500 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No posts found
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        There are no posts tagged with "{{ tag?.name }}"
      </p>
      <UButton to="/" variant="soft">
        Browse all posts
      </UButton>
    </div>

    <!-- Error state -->
    <div v-else-if="tagError || postsError" class="text-center py-12">
      <div class="text-red-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Error loading content
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        {{ tagError?.message || postsError?.message || 'Something went wrong' }}
      </p>
      <UButton to="/" variant="soft">
        Back to Home
      </UButton>
    </div>
  </div>
</template>
