import { forwardRef, useCallback, useImperativeHandle, useEffect } from 'react'
import type { OverlayControllerProps, OverlayControlRef } from './Overlay.type'
import useBooleanState from '../useBooleanState'

const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit, returnToFocus }: OverlayControllerProps,
  ref: React.Ref<OverlayControlRef>,
) {
  const [isOpen, { setTrue: open, setFalse: close }] = useBooleanState()

  const closeWithFocus = useCallback(() => returnToFocus(close), [close, returnToFocus])

  useImperativeHandle(ref, () => ({ close: closeWithFocus }), [closeWithFocus])

  useEffect(() => {
    requestAnimationFrame(open)
  }, [open])

  return <OverlayElement isOpen={isOpen} close={closeWithFocus} exit={onExit} />
})

export default OverlayController
