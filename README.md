# Ghost Blog with Nuxt 4

A modern, SSR-enabled blog using Ghost as a headless CMS, built with Nuxt 4 and Nuxt UI.

## Quick Start

1. **Set up your Ghost credentials**:
   
   Create a `.env` file in the root directory:
   
   ```bash
   GHOST_URL=https://your-ghost-instance.com
   GHOST_CONTENT_API_KEY=your-content-api-key-here
   ```

2. **Run the development server**:
   
   ```bash
   pnpm dev
   ```

3. **Open your browser**:
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

✅ Server-Side Rendering (SSR) for optimal performance and SEO  
✅ Responsive design with Nuxt UI components  
✅ Dark mode support  
✅ Optimized images with Nuxt Image  
✅ Type-safe Ghost API integration  
✅ SEO meta tags and Open Graph support  
✅ Clean, modern UI with Tailwind CSS  

## Pages

- **Homepage** (`/`) - List of latest posts with images, excerpts, and metadata
- **Post Detail** (`/[slug]`) - Full post content with author info and tags

## Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Nuxt UI 4
- **CMS**: Ghost (Headless)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Image Optimization**: Nuxt Image

## Documentation

For detailed setup instructions, customization options, and troubleshooting, see [SETUP.md](./SETUP.md).

## Getting Ghost Credentials

1. Log into your Ghost Admin panel
2. Navigate to **Settings → Integrations**
3. Click **Add custom integration**
4. Give it a name (e.g., "Nuxt Blog")
5. Copy the **Content API Key**
6. Your Ghost URL is your site's URL (e.g., `https://yoursite.ghost.io`)

## Project Structure

```
blog1/
├── app/
│   ├── app.vue              # Root component
│   ├── layouts/
│   │   └── default.vue      # Main layout
│   ├── pages/
│   │   ├── index.vue        # Homepage
│   │   └── [slug].vue       # Post detail
│   └── composables/
│       └── useGhost.ts      # Ghost API
├── ghost.d.ts               # Type definitions
├── .env                     # Environment variables
└── nuxt.config.ts           # Configuration
```

## Building for Production

```bash
pnpm build
pnpm preview
```

## License

MIT
