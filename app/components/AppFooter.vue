<script setup lang="ts">
const {
  siteTitle,
  siteDescription,
} = useGhostSettings()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
    <UContainer>
      <div class="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {{ currentYear }} {{ siteTitle }}. All rights reserved.</p>
        <p v-if="siteDescription" class="mt-2 text-sm">
          {{ siteDescription }}
        </p>
      </div>
    </UContainer>
  </footer>
</template>

