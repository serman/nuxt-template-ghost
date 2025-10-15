<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <UContainer>
        <div class="flex items-center justify-between py-4">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              My Blog
            </h1>
          </NuxtLink>
          
          <nav class="flex items-center space-x-4">
            <UButton to="/" variant="ghost" color="neutral">
              Home
            </UButton>
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
          <p>&copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.</p>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

