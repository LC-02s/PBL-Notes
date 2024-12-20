import { getFocusableElementAll } from './getFocusableElement'

export default function startFocusLoop<T extends HTMLElement>(element: T | null) {
  const focusableEls = getFocusableElementAll(element)

  if (focusableEls && focusableEls.length > 0) {
    const firstFocusableEl = focusableEls[0]
    const lastFocusableEl = focusableEls[focusableEls.length - 1]

    firstFocusableEl?.addEventListener('keydown', (event) => {
      const e = event as KeyboardEvent
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        lastFocusableEl?.focus()
      }
    })
    lastFocusableEl?.addEventListener('keydown', (event) => {
      const e = event as KeyboardEvent
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        firstFocusableEl?.focus()
      }
    })
    firstFocusableEl?.focus()
  }
}
