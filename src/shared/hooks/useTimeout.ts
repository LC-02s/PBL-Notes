import React from 'react'

export default function useTimeout(callback: () => void, delay?: number) {
  const timeoutId = React.useRef<number | null>(null)

  const clear = React.useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
      timeoutId.current = null
    }
  }, [])

  const start = React.useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(callback, delay)
  }, [callback, delay])

  return { start, clear }
}
