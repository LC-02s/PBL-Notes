import React from 'react'
import { useIsomorphicLayoutEffect } from 'motion/react'

export default function useInterval(callback: () => void, tick: number, autoStart = true) {
  const savedCallback = React.useRef(callback)
  const intervalId = React.useRef<number | null>(null)

  const clear = React.useCallback(() => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current)
      intervalId.current = null
    }
  }, [])

  const start = React.useCallback(() => {
    clear()
    intervalId.current = window.setInterval(() => {
      savedCallback.current()
    }, tick)
  }, [tick, clear])

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [])

  React.useEffect(() => {
    if (autoStart) {
      start()
    }

    return clear
  }, [start, clear, autoStart])

  return { start, clear }
}
