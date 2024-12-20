import { useCallback } from 'react'
import useBooleanState from './useBooleanState'
import useOutsideClick from './useOutsideClick'
import useWindowEvent from './useWindowEvent'

export default function useDropdown<E extends HTMLElement>() {
  const [isOpen, { setTrue: open, setFalse: close, toggle }] = useBooleanState()
  const containerRef = useOutsideClick<E>(close)

  const withClose = useCallback(
    <T>(setValue: (value: T) => void) =>
      (value: T) => {
        setValue(value)
        close()
      },
    [close],
  )

  useWindowEvent('keydown', (e) => {
    if (isOpen && e.key === 'Escape') close()
  })

  return { containerRef, isOpen, open, close, withClose, toggle }
}
