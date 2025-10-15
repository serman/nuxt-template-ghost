<script setup lang="ts">
import type { GhostPost } from '@tryghost/content-api'

const route = useRoute()
const { getSinglePost } = useGhost()

const slug = computed(() => route.params.slug as string)

const { data: post, pending, error } = await useAsyncData<GhostPost | null>(
  `post-${slug.value}`,
  () => getSinglePost(slug.value),
  {
    server: true
  }
)
onMounted(() => {
  console.log('post', post.value)
})

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const primaryAuthor = computed(() => {
  return post.value?.authors?.[0]
})

// SEO Meta tags
useHead(() => ({
  title: post.value ? `${post.value.title} - My Blog` : 'Post - My Blog',
  meta: [
    { 
      name: 'description', 
      content: post.value?.excerpt || 'Read this post on our blog' 
    },
    { 
      property: 'og:title', 
      content: post.value?.title || 'Post' 
    },
    { 
      property: 'og:description', 
      content: post.value?.excerpt || '' 
    },
    { 
      property: 'og:image', 
      content: post.value?.feature_image || '' 
    },
    { 
      property: 'og:type', 
      content: 'article' 
    },
    {
      property: 'article:published_time',
      content: post.value?.published_at || ''
    }
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
        title="Error loading post"
        :description="error.message"
        class="mb-8"
      />
      <UButton to="/" variant="soft">
        Back to Home
      </UButton>
    </div>

    <article v-else-if="post" class="max-w-4xl mx-auto">
      <!-- Back button -->
      <UButton to="/" variant="ghost" icon="i-heroicons-arrow-left" class="mb-6">
        Back to Posts
      </UButton>

      <!-- Featured Image -->
      <NuxtImg
        v-if="post.feature_image"
        :src="post.feature_image"
        :alt="post.title"
        class="w-full h-96 object-cover rounded-lg mb-8"
      />

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ post.title }}
      </h1>

      <!-- Meta information -->
      <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div v-if="primaryAuthor" class="flex items-center gap-2">
          <NuxtImg
            v-if="primaryAuthor.profile_image"
            :src="primaryAuthor.profile_image"
            :alt="primaryAuthor.name"
            class="w-10 h-10 rounded-full"
          />
          <span class="font-medium">{{ primaryAuthor.name }}</span>
        </div>

        <time :datetime="post.published_at" class="flex items-center gap-1">
          <UIcon name="i-heroicons-calendar" />
          {{ formatDate(post.published_at) }}
        </time>

        <span v-if="post.reading_time" class="flex items-center gap-1">
          <UIcon name="i-heroicons-clock" />
          {{ post.reading_time }} min read
        </span>
      </div>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-8">
        <UBadge
          v-for="tag in post.tags"
          :key="tag.id"
          color="primary"
          variant="soft"
        >
          {{ tag.name }}
        </UBadge>
      </div>

      <!-- Content -->
      <div 
        class="ghost-post mb-12"
        v-html="post.html"
      />

      <!-- Footer -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
        <UButton to="/" variant="soft" icon="i-heroicons-arrow-left">
          Back to All Posts
        </UButton>
      </div>
    </article>

    <div v-else class="max-w-4xl mx-auto text-center py-12">
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Post not found
      </p>
      <UButton to="/" variant="soft">
        Back to Home
      </UButton>
    </div>
  </div>
</template>


