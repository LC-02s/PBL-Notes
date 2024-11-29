import React from 'react'

export default function useBooleanState(defaultState = false) {
  const [bool, setBool] = React.useState(defaultState)
  const setTrue = React.useCallback(() => setBool(true), [])
  const setFalse = React.useCallback(() => setBool(false), [])
  const toggle = React.useCallback(() => setBool((prev) => !prev), [])

  return [bool, { setTrue, setFalse, toggle }] as const
}
