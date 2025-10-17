import GhostContentAPI, { type GhostPost, type GhostTag, type GhostSettings } from '@tryghost/content-api'

let api: GhostContentAPI | null = null

function getAPI() {
  if (api) {
    return api
  }

  const config = useRuntimeConfig()
  console.log(config.public.ghostUrl, config.public.ghostContentApiKey);
  api = new GhostContentAPI({
    url: config.public.ghostUrl as string,
    key: config.public.ghostContentApiKey as string,
    version: 'v5.0'
  })

  return api
}

export function useGhost() {
  const api = getAPI()

  const getPosts = async (): Promise<GhostPost[]> => {
    try {
      return await api.posts.browse({
        limit: 100,
        include: 'tags,authors',
        fields: 'id,title,slug,excerpt,feature_image,published_at,reading_time'
      })
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  }

  const getSinglePost = async (slug: string): Promise<GhostPost | null> => {
    try {
      return await api.posts.read(
        { slug },
        { include: 'tags,authors' }
      )
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }

  const getSettings = async (): Promise<GhostSettings | null> => {
    try {
      // Use the official Ghost Content API client settings.browse() method
      return await api.settings.browse()
    } catch (error) {
      console.error('Error fetching settings:', error)
      return null
    }
  }

  const getPostsByTag = async (tagSlug: string): Promise<GhostPost[]> => {
    try {
      return await api.posts.browse({
        filter: `tag:${tagSlug}`,
        include: 'tags,authors',
        fields: 'id,title,slug,excerpt,feature_image,published_at,reading_time',
        limit: 100
      })
    } catch (error) {
      console.error('Error fetching posts by tag:', error)
      return []
    }
  }

  const getTag = async (tagSlug: string): Promise<GhostTag | null> => {
    try {
      return await api.tags.read({ slug: tagSlug })
    } catch (error) {
      console.error('Error fetching tag:', error)
      return null
    }
  }

  const getTags = async (): Promise<GhostTag[]> => {
    try {
      return await api.tags.browse({
        order: 'name ASC'
      })
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  }

  const getPages = async (): Promise<GhostPost[]> => {
    try {
      return await api.pages.browse({
        limit: 100,
        fields: 'id,title,slug,html,feature_image,published_at,updated_at'
      })
    } catch (error) {
      console.error('Error fetching pages:', error)
      return []
    }
  }

  const getSinglePage = async (slug: string): Promise<GhostPost | null> => {
    try {
      return await api.pages.read({ slug })
    } catch (error) {
      console.error('Error fetching page:', error)
      return null
    }
  }

  return {
    getPosts,
    getSinglePost,
    getSettings,
    getPostsByTag,
    getTag,
    getTags,
    getPages,
    getSinglePage
  }
}

