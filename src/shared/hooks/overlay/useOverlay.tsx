import React from 'react'
import OverlayController from './OverlayController'
import { useOverlayMount, useOverlayUnmount } from './OverlayContext'
import type { CreateOverlayElement, OverlayControlRef } from './Overlay.type'

let elementId = 1

export default function useOverlay() {
  const mount = useOverlayMount()
  const unmount = useOverlayUnmount()
  const [id] = React.useState(() => `overlay-${elementId++}`)
  const overlayRef = React.useRef<OverlayControlRef | null>(null)

  React.useEffect(() => {
    return () => unmount(id)
  }, [id, unmount])

  return React.useMemo(() => {
    return {
      open: (overlayElement: CreateOverlayElement) =>
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => unmount(id)}
          />,
        ),
      close: () => overlayRef.current?.close(),
      exit: () => unmount(id),
    }
  }, [id, mount, unmount])
}
