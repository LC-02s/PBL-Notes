import React from 'react'
import useBooleanState from '../useBooleanState'
import type { OverlayControllerProps, OverlayControlRef } from './Overlay.type'

const OverlayController = React.forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit, returnToFocus }: OverlayControllerProps,
  ref: React.Ref<OverlayControlRef>,
) {
  const [isOpen, { setTrue: open, setFalse: close }] = useBooleanState()

  const closeWithFocus = React.useCallback(() => returnToFocus(close), [close, returnToFocus])

  React.useImperativeHandle(ref, () => ({ close: closeWithFocus }), [closeWithFocus])

  React.useEffect(() => {
    requestAnimationFrame(open)
  }, [open])

  return <OverlayElement isOpen={isOpen} close={closeWithFocus} exit={onExit} />
})

export default OverlayController
