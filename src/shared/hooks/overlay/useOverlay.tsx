import { useState, useRef, useEffect, useMemo } from 'react'
import type { FocusableElement } from '@/shared/types'
import type { CreateOverlayElement, OverlayControlRef } from './Overlay.type'
import { useOverlayMount, useOverlayUnmount } from './OverlayContext'
import OverlayController from './OverlayController'

let elementId = 1

export default function useOverlay<E extends FocusableElement>() {
  const mount = useOverlayMount()
  const unmount = useOverlayUnmount()
  const [id] = useState(() => `overlay-${elementId++}`)
  const overlayRef = useRef<OverlayControlRef | null>(null)
  const startedAt = useRef<E | null>(null)

  useEffect(() => {
    return () => unmount(id)
  }, [id, unmount])

  return useMemo(() => {
    return {
      startedAt,
      open: (overlayElement: CreateOverlayElement) =>
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => unmount(id)}
            returnToFocus={(close) => {
              startedAt.current?.focus()
              close?.()
            }}
          />,
        ),
      close: () => overlayRef.current?.close(),
      exit: () => unmount(id),
    }
  }, [id, mount, unmount])
}
