<script setup lang="ts">
const {
  siteTitle,
  siteLogo,
  siteIcon,
  navigation,
  siteDescription,
} = useGhostSettings()

// Only set favicon and apple-touch-icon globally
useHead(() => ({
  link: [
    ...(siteIcon.value ? [{ rel: 'icon', href: siteIcon.value }] : []),
    ...(siteLogo.value ? [{ rel: 'apple-touch-icon', href: siteLogo.value }] : [])
  ]
}))
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <UContainer>
        <div class="flex items-center justify-between py-4">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <NuxtImg
              v-if="siteLogo"
              :src="siteLogo"
              :alt="siteTitle"
              class="h-8 w-auto"
            />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ siteTitle }}
            </h1>
          </NuxtLink>
          
          <nav class="flex items-center space-x-4">
            <UButton to="/" variant="ghost" color="neutral">
              Home
            </UButton>
            
            <template v-for="navItem in navigation" :key="navItem.url">
              <UButton 
                :to="navItem.url" 
                variant="ghost" 
                color="neutral"
              >
                {{ navItem.label }}
              </UButton>
            </template>
          </nav>
        </div>
      </UContainer>
    </header>

    <main class="py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <UContainer>
        <div class="py-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} {{ siteTitle }}. All rights reserved.</p>
          <p v-if="siteDescription" class="mt-2 text-sm">
            {{ siteDescription }}
          </p>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

