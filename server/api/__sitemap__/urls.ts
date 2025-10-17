// @ts-ignore - Using our own type definitions in ghost.d.ts
import GhostContentAPI, { type GhostPost, type GhostTag } from '@tryghost/content-api'
import { defineSitemapEventHandler } from "#imports";

// @ts-expect-error - defineSitemapEventHandler is auto-imported by nuxt-seo-utils
export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()

  // Initialize Ghost API
  const api = new GhostContentAPI({
    url: config.public.ghostUrl as string,
    key: config.public.ghostContentApiKey as string,
    version: 'v5.0'
  })

  try {
    // Fetch all posts, pages, and tags in parallel
    const [posts, pages, tags] = await Promise.all([
      api.posts.browse({
        limit: 'all',
        fields: 'slug,updated_at,published_at,feature_image'
      }) as Promise<GhostPost[]>,
      api.pages.browse({
        limit: 'all',
        fields: 'slug,updated_at,published_at'
      }) as Promise<GhostPost[]>,
      api.tags.browse({
        limit: 'all',
        fields: 'slug'
      }) as Promise<GhostTag[]>
    ])

    return [
      // Homepage
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0
      },
      // Posts - transform Ghost posts to sitemap URLs
      ...posts.map((post: GhostPost) => ({
        loc: `/posts/${post.slug}`,
        lastmod: post.updated_at,
        changefreq: 'weekly' as const,
        priority: 0.8,
        // Include images for better SEO
        images: post.feature_image ? [{
          loc: post.feature_image
        }] : undefined
      })),
      // Pages - Ghost static pages
      ...pages.map((page: GhostPost) => ({
        loc: `/page/${page.slug}`,
        lastmod: page.updated_at,
        changefreq: 'monthly' as const,
        priority: 0.7
      })),
      // Tag pages
      ...tags.map((tag: GhostTag) => ({
        loc: `/tag/${tag.slug}`,
        changefreq: 'weekly' as const,
        priority: 0.6
      }))
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if Ghost API fails
    return [
      {
        loc: '/',
        changefreq: 'daily' as const,
        priority: 1.0
      }
    ]
  }
})

