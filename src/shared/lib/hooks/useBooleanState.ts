import { useState, useCallback } from 'react'

export default function useBooleanState(defaultState = false) {
  const [bool, setBool] = useState(defaultState)
  const setTrue = useCallback(() => setBool(true), [])
  const setFalse = useCallback(() => setBool(false), [])
  const toggle = useCallback(() => setBool((prev) => !prev), [])

  return [bool, { setTrue, setFalse, toggle }] as const
}
