# Ghost Blog Setup Guide

This is a Nuxt 4 blog application using Ghost as a headless CMS with server-side rendering (SSR).

## Prerequisites

- Node.js 18+ installed
- A Ghost instance (self-hosted or Ghost Pro)
- Ghost Content API credentials

## Installation

1. **Install dependencies** (already done):
   ```bash
   pnpm install
   ```

2. **Configure Ghost credentials**:
   
   Create a `.env` file in the root directory with your Ghost credentials:
   
   ```bash
   GHOST_URL=https://your-ghost-instance.com
   GHOST_CONTENT_API_KEY=your-content-api-key-here
   ```
   
   To get your Ghost Content API key:
   - Log into your Ghost Admin panel
   - Go to Settings → Integrations
   - Create a new custom integration
   - Copy the Content API Key

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   ```
   http://localhost:3000
   ```

## Project Structure

```
blog1/
├── app/
│   ├── app.vue                 # Root component
│   ├── layouts/
│   │   └── default.vue         # Main layout with header/footer
│   ├── pages/
│   │   ├── index.vue           # Homepage with post listing
│   │   └── [slug].vue          # Dynamic post detail page
│   └── composables/
│       └── useGhost.ts         # Ghost API integration composable
├── ghost.d.ts                  # TypeScript definitions for Ghost API
├── .env.example                # Example environment variables
├── .env                        # Your environment variables (not in git)
└── nuxt.config.ts              # Nuxt configuration
```

## Features

### Homepage (`/`)
- Lists all published posts from Ghost
- Shows feature images using Nuxt Image optimization
- Displays post excerpts, publication dates, and reading time
- Shows post tags (first 3)
- Responsive grid layout (1/2/3 columns)
- Loading states with skeletons
- Error handling

### Post Detail Page (`/[slug]`)
- Full post content rendered from Ghost HTML
- Author information with avatar
- Publication date and reading time
- Feature image
- Post tags
- SEO meta tags (Open Graph, Twitter Cards)
- Back navigation
- Prose styling for rich content

### Layout
- Clean header with site title and navigation
- Responsive footer
- Dark mode support via Nuxt UI
- Container-based responsive design

## Technical Implementation

### SSR (Server-Side Rendering)
All pages use `useAsyncData()` with `server: true`, ensuring:
- Content is fetched on the server
- Fast initial page load
- Better SEO
- No loading flicker

### Ghost API Integration
The `useGhost()` composable provides:
- `getPosts()` - Fetch all posts with tags and authors
- `getSinglePost(slug)` - Fetch a single post by slug

Both functions:
- Handle errors gracefully
- Return type-safe data
- Include related data (tags, authors)

### Styling
- **Nuxt UI**: Component library for buttons, cards, badges, etc.
- **Tailwind CSS**: Utility-first CSS (included with Nuxt UI)
- **Nuxt Image**: Automatic image optimization
- **Responsive**: Mobile-first design with breakpoints

### Type Safety
- Full TypeScript support
- Custom type definitions for Ghost API
- Type-safe composables and components

## Customization

### Change Site Name
Edit `app/layouts/default.vue`:
```vue
<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
  Your Site Name
</h1>
```

### Adjust Post Limit
Edit `app/composables/useGhost.ts`:
```typescript
return await api.posts.browse({
  limit: 100, // Change this number
  include: 'tags,authors',
  fields: 'id,title,slug,excerpt,feature_image,published_at,reading_time'
})
```

### Modify Layout
- Header/Footer: `app/layouts/default.vue`
- Homepage: `app/pages/index.vue`
- Post detail: `app/pages/[slug].vue`

### Add More Fields
To fetch additional Ghost post fields, update the `fields` parameter in `useGhost.ts`:
```typescript
fields: 'id,title,slug,excerpt,feature_image,published_at,reading_time,custom_excerpt'
```

## Building for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## Deployment

The app can be deployed to any Node.js hosting platform:
- **Vercel**: Zero-config deployment
- **Netlify**: Supports Nuxt SSR
- **DigitalOcean App Platform**: Node.js support
- **AWS/Azure/GCP**: Via containerization

Make sure to set your environment variables (`GHOST_URL` and `GHOST_CONTENT_API_KEY`) in your hosting platform's settings.

## Resources

- [Nuxt 4 Documentation](https://nuxt.com/docs/4.x)
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Ghost Content API Documentation](https://ghost.org/docs/content-api/)
- [Ghost Nuxt Integration Guide](https://docs.ghost.org/jamstack/nuxt/)

## Troubleshooting

### Posts not loading
1. Check your `.env` file has correct credentials
2. Verify your Ghost instance is accessible
3. Check the browser console for errors
4. Ensure your Ghost Content API key is valid

### TypeScript errors
Run the dev server - Nuxt will regenerate type definitions:
```bash
pnpm dev
```

### Image not loading
- Ensure Ghost posts have feature images
- Check that images are publicly accessible
- Verify Nuxt Image configuration in `nuxt.config.ts`

## Next Steps

Consider adding:
- Pagination for posts
- Search functionality
- Author pages
- Tag pages
- Comments (via Ghost Comments or third-party)
- Newsletter signup
- RSS feed
- Sitemap generation

