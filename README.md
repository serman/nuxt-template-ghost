# Ghost Blog with Nuxt 4

A modern, SSR-enabled blog using Ghost as a headless CMS, built with Nuxt 4 and Nuxt UI.

**🚀 [Live Demo](https://nuxt-template-ghost.netlify.app/)**

The development has been heavly assited by Cursor AI and I have reviewed the code and made some changes to fit my needs.

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
This is a simple blog template that uses Ghost as a headless CMS and Nuxt 4 as a frontend framework. 
✅ Server-Side Rendering (SSR) for optimal performance and SEO  
✅ Responsive design with Nuxt UI components  
✅ Dark mode support  
✅ Optimized images with Nuxt Image  
✅ Type-safe Ghost API integration  
✅ SEO meta tags and Open Graph support  
✅ Clean, modern UI with Tailwind CSS  

But it can be customized to fit your needs.
Note: Ghost uses many CSS classes that are not Tailwind CSS classes, so you may need to customize the CSS to fit your needs.
Also Ghost have many dynamic cards https://ghost.org/help/cards/. I have implemented some of the styles in the css file, but not all of them. 

## Pages

- **Homepage** (`/`) - List of latest posts with images, excerpts, and metadata
- **Post Detail** (`/posts/[slug]`) - Full post content with author info and tags
- **Static Pages** (`/[slug]`) - Ghost pages (About, Contact, etc.)
- **Tag Pages** (`/tag/[slug]`) - Posts filtered by tag
- **Sitemap** (`/sitemap.xml`) - Auto-generated XML sitemap for SEO

## Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Nuxt UI 4
- **CMS**: Ghost (Headless)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Image Optimization**: Nuxt Image


```

## Building for Production

```bash
pnpm generate
pnpm preview
```

## Customization

### Styling Posts

All Ghost post content styling is centralized in a single CSS file for easy customization:

**File**: `app/assets/css/ghost.css`

This file contains:
- **Typography styles** - Headings, paragraphs, links, lists, blockquotes, code blocks
- **Ghost card styles** - Image cards, galleries, bookmarks, toggles, callouts, videos, audio, etc.
- **CSS variables** - Colors and theme settings for both light and dark modes
- **Responsive design** - Mobile-friendly breakpoints

#### Quick Customization Examples:

**Change base font size:**
```css
/* In ghost.css, find: */
.ghost-post {
  font-size: 1.8rem; /* Change this value */
}
```

**Customize colors:**
```css
/* In ghost.css, find: */
:root {
  --color-primary-text: var(--color-darker-gray);
  --color-secondary-text: rgb(0 0 0 / 0.55);
  --ghost-accent-color: #15171a; /* Your brand color */
}
```

**Adjust content width:**
The content is wrapped in a container with `max-w-4xl` class in the post template. Edit `app/pages/posts/[slug].vue` to change the maximum width.

**Modify card styles:**
Ghost cards (like image galleries, callouts, toggles) each have their own section in `ghost.css`. Search for the card name (e.g., `.kg-image-card`, `.kg-gallery-card`) to customize.

### Other Customization Options

- **Layout**: Edit `app/layouts/default.vue` for header/footer changes
- **Components**: Modify `app/components/` for reusable elements
- **SEO**: Update meta tags in page components

### image optimization and static images
Nuxt Image is used to optimize images. It is configured in `nuxt.config.ts`.
Add the domains of your images to the `image.domains` array.
I have implemented a simple image optimization in the `useGhostContent.ts` file. It is a pre-processing step that replaces the src attribute of the img tag with the optimized URL using nuxtImage, so it is downloaded and optimized at build time.

## License

MIT
