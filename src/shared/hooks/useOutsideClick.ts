import React from 'react'
import useDocumentEvent from './useDocumentEvent'

export default function useOutsideClick<T extends HTMLElement>(
  callback: (event: MouseEvent) => void,
) {
  const targetAreaRef = React.useRef<T | null>(null)
  useDocumentEvent('click', (event) => {
    if (!targetAreaRef.current) return
    if (targetAreaRef.current.contains(event.target as Node | null)) {
      return
    }
    callback(event)
  })

  return targetAreaRef
}
