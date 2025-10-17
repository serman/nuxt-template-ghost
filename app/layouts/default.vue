<script setup lang="ts">
const {
  siteIcon,
  siteLogo,
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
    <!-- <AppHeader /> -->

    <main class="py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <!-- <AppFooter /> -->
  </div>
</template>

