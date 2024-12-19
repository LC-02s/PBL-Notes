import { useRef, useCallback } from 'react'

export default function useTimeout(callback: () => void, delay?: number) {
  const timeoutId = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
      timeoutId.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(callback, delay)
  }, [callback, delay])

  return { start, clear }
}
