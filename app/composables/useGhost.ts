import GhostContentAPI, { type GhostPost } from '@tryghost/content-api'

let api: GhostContentAPI | null = null

function getAPI() {
  if (api) {
    return api
  }

  const config = useRuntimeConfig()
  
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

  return {
    getPosts,
    getSinglePost
  }
}

