<script setup lang="ts">
import type { GhostPost } from '@tryghost/content-api'

defineProps<{
  post: GhostPost
}>()

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
  <UCard class="flex flex-col h-full hover:shadow-lg transition-shadow">
    <template #header>
      <NuxtLink :to="`/posts/${post.slug}`">
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
      <NuxtLink :to="`/posts/${post.slug}`">
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
        <NuxtLink
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag.id"
          :to="`/tag/${tag.slug}`"
          @click.stop
        >
          <UBadge
            color="neutral"
            variant="soft"
            size="xs"
            class="hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors cursor-pointer"
          >
            {{ tag.name }}
          </UBadge>
        </NuxtLink>
      </div>
    </div>

    <template #footer>
      <UButton
        :to="`/posts/${post.slug}`"
        variant="soft"
        block
      >
        Read More
      </UButton>
    </template>
  </UCard>
</template>
