<script setup lang="ts">
import type { GhostPost } from '@tryghost/content-api'

const { getPosts } = useGhost()

const { data: posts, pending, error } = await useAsyncData<GhostPost[]>(
  'posts',
  () => getPosts(),
  {
    server: true
  }
)

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

useHead({
  title: 'Home - My Blog',
  meta: [
    { name: 'description', content: 'Read the latest articles and stories from our blog' }
  ]
})
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
      <UCard
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col h-full hover:shadow-lg transition-shadow"
      >
        <template #header>
          <NuxtLink :to="`/${post.slug}`">
            <NuxtImg
              v-if="post.feature_image"
              :src="post.feature_image"
              :alt="post.title"
              class="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div v-else class="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
              <span class="text-gray-400 dark:text-gray-500">No image</span>
            </div>
          </NuxtLink>
        </template>

        <div class="flex-grow">
          <NuxtLink :to="`/${post.slug}`">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-500 transition-colors">
              {{ post.title }}
            </h2>
          </NuxtLink>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {{ post.excerpt }}
          </p>

          <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <time :datetime="post.published_at">
              {{ formatDate(post.published_at) }}
            </time>
            <span v-if="post.reading_time">
              {{ post.reading_time }} min read
            </span>
          </div>

          <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-4">
            <UBadge
              v-for="tag in post.tags.slice(0, 3)"
              :key="tag.id"
              color="neutral"
              variant="soft"
              size="xs"
            >
              {{ tag.name }}
            </UBadge>
          </div>
        </div>

        <template #footer>
          <UButton
            :to="`/${post.slug}`"
            variant="soft"
            block
          >
            Read More
          </UButton>
        </template>
      </UCard>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">
        No posts found. Check your Ghost configuration.
      </p>
    </div>
  </div>
</template>

