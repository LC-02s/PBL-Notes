/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ReactDOM from 'react-dom'
import { type Target, AnimatePresence, motion, useIsomorphicLayoutEffect } from 'motion/react'
import { useOutsideClick, useStopScroll } from '../hooks'
import { cn } from '../utils'
import Dimmed from './Dimmed'
import {
  type DialogVariable,
  dialogVariable,
  type DialogButtonVariable,
  dialogButtonVariable,
} from './Dialog.style'
import handleDialogA11y from './Dialog.util'

function Title({ className, ...props }: JSX.IntrinsicElements['h2']) {
  return (
    <h2
      className={cn(
        'text-gray mb-3 block w-full p-0 text-lg font-bold leading-tight text-gray700 transition-colors',
        className,
      )}
      {...props}
    >
      {props.children || 'PBL Notes'}
    </h2>
  )
}

function Content({ className, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div
      className={cn(
        'block max-h-[calc(100dvh-17.5rem)] min-h-12 w-full text-base font-normal leading-relaxed text-gray600 transition-colors',
        className,
      )}
      {...props}
    />
  )
}

function Footer({ className, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div
      className={cn(
        'mt-6 flex w-full items-center justify-end gap-2 border-t border-gray100 pt-4 transition-colors',
        className,
      )}
      {...props}
    />
  )
}

const Button = React.forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements['button'] & DialogButtonVariable
>(({ variant, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'block size-auto min-w-20 rounded bg-gray100 p-1 text-base text-gray700 transition-colors hover:bg-gray200 active:bg-gray200',
        dialogButtonVariable({ variant }),
        className,
      )}
      {...props}
    />
  )
})

type DialogPosition = 'top' | 'center'

interface DialogProps extends DialogVariable {
  open?: boolean
  onClose?: () => void
  withoutDimmed?: boolean
  cancelWithOutsideClick?: boolean
  position?: DialogPosition
}

const dialogPositionVariant: Record<DialogPosition, Record<'initial' | 'animate', Target>> = {
  top: {
    initial: {
      transform: 'translate(-50%, -24%) scale(0.9)',
      opacity: 0.3,
    },
    animate: {
      transform: 'translate(-50%, 0%) scale(1)',
      opacity: 1,
    },
  },
  center: {
    initial: {
      transform: 'translate(-50%, -42%) scale(0.9)',
      opacity: 0.3,
    },
    animate: {
      transform: 'translate(-50%, -54%) scale(1)',
      opacity: 1,
    },
  },
}

function Dialog({
  open: isOpen = false,
  onClose,
  size,
  withoutDimmed,
  position = 'center',
  cancelWithOutsideClick = false,
  children,
}: React.PropsWithChildren<DialogProps>) {
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen && cancelWithOutsideClick) onClose?.()
  })

  useStopScroll(isOpen)

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      const containerEl = containerRef.current
      handleDialogA11y(containerEl)
    }
  }, [isOpen])

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            ref={containerRef}
            className={cn(
              'absolute left-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100vw-1rem)] translate-x-1/2 rounded-xl bg-gray000 p-5 transition-colors',
              position === 'center' ? 'top-1/2' : 'top-4',
              dialogVariable({ size }),
            )}
            initial={dialogPositionVariant[position].initial}
            animate={dialogPositionVariant[position].animate}
            exit={dialogPositionVariant[position].initial}
            transition={{ ease: 'easeInOut', duration: 0.16 }}
          >
            {children}
          </motion.div>
          {!withoutDimmed && (
            <Dimmed
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.16 }}
            />
          )}
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Object.assign(Dialog, { Title, Content, Footer, Button })
