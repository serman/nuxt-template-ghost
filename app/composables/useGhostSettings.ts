import type { GhostSettings } from '@tryghost/content-api'

// Global state key for Ghost settings
const GHOST_SETTINGS_KEY = 'ghost-settings'

export function useGhostSettings() {
  const { getSettings } = useGhost()

  // Use Nuxt's state management with a unique key
  const { data: settings, refresh } = useAsyncData<GhostSettings | null>(
    GHOST_SETTINGS_KEY,
    () => getSettings(),
    {
      server: true,
      // Cache for 5 minutes in development, 1 hour in production
      default: () => null,
      transform: (data: any) => data as GhostSettings | null
    }
  )

  // Computed properties for easy access
  const siteTitle = computed(() => settings.value?.title || 'My Blog')
  const siteDescription = computed(() => settings.value?.description || 'A blog powered by Ghost and Nuxt')
  const siteLogo = computed(() => settings.value?.logo)
  const siteIcon = computed(() => settings.value?.icon)
  const accentColor = computed(() => settings.value?.accent_color)
  const navigation = computed(() => settings.value?.navigation || [])
  const secondaryNavigation = computed(() => settings.value?.secondary_navigation || [])

  // Helper functions
  const getMetaTitle = (pageTitle?: string) => {
    if (pageTitle) {
      return `${pageTitle} - ${siteTitle.value}`
    }
    return settings.value?.meta_title || siteTitle.value
  }

  const getMetaDescription = () => {
    return settings.value?.meta_description || siteDescription.value
  }

  const getOgImage = () => {
    return settings.value?.og_image || settings.value?.cover_image || ''
  }

  const getTwitterImage = () => {
    return settings.value?.twitter_image || settings.value?.cover_image || ''
  }

  return {
    // Raw data
    settings: readonly(settings),
    
    // Computed properties
    siteTitle,
    siteDescription,
    siteLogo,
    siteIcon,
    accentColor,
    navigation,
    secondaryNavigation,
    
    // Helper functions
    getMetaTitle,
    getMetaDescription,
    getOgImage,
    getTwitterImage,
    
    // Actions
    refresh
  }
}
