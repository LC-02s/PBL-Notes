import { useRef } from 'react'
import useDocumentEvent from './useDocumentEvent'

export default function useOutsideClick<E extends HTMLElement>(
  callback: (event: MouseEvent) => void,
) {
  const targetAreaRef = useRef<E | null>(null)

  useDocumentEvent('click', (event) => {
    if (!targetAreaRef.current) return

    if (targetAreaRef.current.contains(event.target as Node | null)) {
      return
    }

    callback(event)
  })

  return targetAreaRef
}
