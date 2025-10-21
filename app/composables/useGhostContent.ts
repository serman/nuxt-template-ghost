import * as cheerio from 'cheerio'

/**
 * Composable to process Ghost HTML content
 * Transforms img tags to use Nuxt Image optimization
 */
export function useGhostContent() {
  const img = useImage()

  /**
   * Process Ghost HTML to optimize images
   * Uses Cheerio to properly parse and transform HTML
   */
  const processHtml = (html: string): string => {
    if (!html) return ''

    try {
      // Load HTML with Cheerio
      const $ = cheerio.load(html, null, false)

      // Process all img tags
      $('img').each((_, element) => {
        const $img = $(element)
        const src = $img.attr('src')
        
        if (!src) return

        try {
          // Extract width from img attributes or style
          let width = parseInt($img.attr('width') || '') || undefined
          
          // If no width attribute, try to extract from style
          if (!width) {
            const style = $img.attr('style')
            if (style) {
              const widthMatch = style.match(/width:\s*(\d+)px/)
              if (widthMatch?.[1]) {
                width = parseInt(widthMatch[1])
              }
            }
          }

          // Default to 1200 if no width found, but cap at 2000
          const targetWidth = width ? Math.min(width, 2000) : 1200

          // Generate optimized URL
          const optimizedSrc = img(src, {
            width: targetWidth,
            quality: 80,
            format: 'webp'
          })

          // Update src with optimized URL
          $img.attr('src', optimizedSrc)
          
          // Remove srcset and sizes attributes since we're using a single optimized image
          $img.removeAttr('srcset')
          $img.removeAttr('sizes')
          
          // Add lazy loading if not present
          if (!$img.attr('loading')) {
            $img.attr('loading', 'lazy')
          }
        } catch (error) {
          console.warn('Failed to optimize image:', src, error)
          // Keep original src on error
        }
      })

      // Return processed HTML
      return $.html()
    } catch (error) {
      console.error('Error processing HTML:', error)
      return html // Return original on error
    }
  }

  return {
    processHtml
  }
}

