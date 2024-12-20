import { useState, useEffect } from 'react'
import useTimeout from './useTimeout'

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const { start } = useTimeout(() => setDebouncedValue(value), delay)

  useEffect(start, [value, start])

  return debouncedValue
}
