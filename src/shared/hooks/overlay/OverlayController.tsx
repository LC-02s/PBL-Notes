import React from 'react'
import useBooleanState from '../useBooleanState'
import type { OverlayControllerProps, OverlayControlRef } from './Overlay.type'

const OverlayController = React.forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: OverlayControllerProps,
  ref: React.Ref<OverlayControlRef>,
) {
  const [isOpen, { setTrue: open, setFalse: close }] = useBooleanState()

  React.useImperativeHandle(ref, () => ({ close }), [close])

  React.useEffect(() => {
    requestAnimationFrame(open)
  }, [open])

  return <OverlayElement isOpen={isOpen} close={close} exit={onExit} />
})

export default OverlayController
