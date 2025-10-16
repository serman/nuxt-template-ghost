import { onMounted, onUnmounted } from 'vue'

/**
 * Composable to handle interactive Ghost cards (toggles, etc.)
 * Adds minimal client-side JavaScript to make Ghost cards interactive
 */
export function useGhostCards() {
  let clickHandlers: Array<{ element: Element; handler: EventListener }> = []

  const initializeToggleCards = () => {
    // Find all toggle cards
    const toggleCards = document.querySelectorAll('.kg-toggle-card')

    toggleCards.forEach((card) => {
      const button = card.querySelector('.kg-toggle-card-icon')
      const heading = card.querySelector('.kg-toggle-heading')

      if (!button || !heading) return

      // Create click handler
      const handleClick = (e: Event) => {
        e.preventDefault()
        const currentState = card.getAttribute('data-kg-toggle-state')
        const newState = currentState === 'close' ? 'open' : 'close'
        card.setAttribute('data-kg-toggle-state', newState)
      }

      // Add click handlers to both button and heading
      button.addEventListener('click', handleClick)
      heading.addEventListener('click', handleClick)

      // Store handlers for cleanup
      clickHandlers.push(
        { element: button, handler: handleClick },
        { element: heading, handler: handleClick }
      )
    })
  }

  const cleanup = () => {
    // Remove all event listeners
    clickHandlers.forEach(({ element, handler }) => {
      element.removeEventListener('click', handler)
    })
    clickHandlers = []
  }

  onMounted(() => {
    initializeToggleCards()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    initializeToggleCards,
    cleanup
  }
}

