import React from 'react'
import useTimeout from './useTimeout'

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)
  const { start } = useTimeout(() => setDebouncedValue(value), delay)

  React.useEffect(start, [value, start])

  return debouncedValue
}
