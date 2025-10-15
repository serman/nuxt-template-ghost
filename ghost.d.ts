declare module '@tryghost/content-api' {
  export interface GhostTag {
    id: string
    name: string
    slug: string
    description?: string
  }

  export interface GhostAuthor {
    id: string
    name: string
    slug: string
    profile_image?: string
    cover_image?: string
    bio?: string
    website?: string
    location?: string
    facebook?: string
    twitter?: string
  }

  export interface GhostPost {
    id: string
    uuid: string
    title: string
    slug: string
    html?: string
    comment_id?: string
    feature_image?: string
    featured?: boolean
    visibility: string
    created_at: string
    updated_at: string
    published_at: string
    custom_excerpt?: string
    excerpt?: string
    tags?: GhostTag[]
    authors?: GhostAuthor[]
    primary_author?: GhostAuthor
    primary_tag?: GhostTag
    url: string
    canonical_url?: string
    reading_time?: number
    og_image?: string
    og_title?: string
    og_description?: string
    twitter_image?: string
    twitter_title?: string
    twitter_description?: string
    meta_title?: string
    meta_description?: string
  }

  export interface BrowseOptions {
    limit?: number
    include?: string
    fields?: string
    filter?: string
    order?: string
    page?: number
  }

  export interface ReadOptions {
    id?: string
    slug?: string
  }

  export interface GhostContentAPIOptions {
    url: string
    key: string
    version: string
  }

  export default class GhostContentAPI {
    constructor(options: GhostContentAPIOptions)
    
    posts: {
      browse(options?: BrowseOptions): Promise<GhostPost[]>
      read(identifier: ReadOptions, options?: { include?: string }): Promise<GhostPost>
    }
    
    pages: {
      browse(options?: BrowseOptions): Promise<GhostPost[]>
      read(identifier: ReadOptions, options?: { include?: string }): Promise<GhostPost>
    }
    
    authors: {
      browse(options?: BrowseOptions): Promise<GhostAuthor[]>
      read(identifier: ReadOptions): Promise<GhostAuthor>
    }
    
    tags: {
      browse(options?: BrowseOptions): Promise<GhostTag[]>
      read(identifier: ReadOptions): Promise<GhostTag>
    }
  }
}

