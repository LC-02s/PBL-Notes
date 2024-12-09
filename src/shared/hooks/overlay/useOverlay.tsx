import React from 'react'
import type { FocusableElement } from '@/shared/types'
import type { CreateOverlayElement, OverlayControlRef } from './Overlay.type'
import { useOverlayMount, useOverlayUnmount } from './OverlayContext'
import OverlayController from './OverlayController'

let elementId = 1

export default function useOverlay<E extends FocusableElement>() {
  const mount = useOverlayMount()
  const unmount = useOverlayUnmount()
  const [id] = React.useState(() => `overlay-${elementId++}`)
  const overlayRef = React.useRef<OverlayControlRef | null>(null)
  const startedAt = React.useRef<E | null>(null)

  React.useEffect(() => {
    return () => unmount(id)
  }, [id, unmount])

  return React.useMemo(() => {
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
