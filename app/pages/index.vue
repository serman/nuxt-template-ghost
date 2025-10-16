<script setup lang="ts">
import type { GhostPost } from '@tryghost/content-api'
import PostCard from '~/components/PostCard.vue'

const { getPosts } = useGhost()
const { siteTitle, getMetaTitle, getMetaDescription } = useGhostSettings()

const { data: posts, pending, error } = await useAsyncData<GhostPost[]>(
  'posts',
  () => getPosts(),
  {
    server: true
  }
)

useHead(() => ({
  title: getMetaTitle('Home'),
  meta: [
    { 
      name: 'description', 
      content: getMetaDescription()
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:title',
      content: getMetaTitle('Home')
    },
    {
      property: 'og:description',
      content: getMetaDescription()
    },
    {
      property: 'og:site_name',
      content: siteTitle.value
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: getMetaTitle('Home')
    },
    {
      name: 'twitter:description',
      content: getMetaDescription()
    }
  ]
}))
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Latest Posts
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Discover our latest articles and stories
      </p>
    </div>

    <div v-if="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <USkeleton v-for="i in 6" :key="i" class="h-96" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <UAlert
        color="error"
        variant="soft"
        title="Error loading posts"
        :description="error.message"
      />
    </div>

    <div v-else-if="posts && posts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">
        No posts found. Check your Ghost configuration.
      </p>
    </div>
  </div>
</template>

