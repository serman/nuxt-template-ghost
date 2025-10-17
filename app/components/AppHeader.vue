<script setup lang="ts">
const {
  siteTitle,
  siteLogo,
  navigation,
} = useGhostSettings()

// Access the color mode from Nuxt UI
const colorMode = useColorMode()
</script>

<template>
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

          <!-- Dark/Light Mode Toggle -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle dark mode"
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
          />
        </nav>
      </div>
    </UContainer>
  </header>
</template>

