/* eslint-disable react-refresh/only-export-components */

import ReactDOM from 'react-dom'
import { type Target, AnimatePresence, motion, useIsomorphicLayoutEffect } from 'motion/react'
import { useOutsideClick, useStopScroll } from '../hooks'
import { cn, startFocusLoop } from '../utils'
import Button from './Button'
import Dimmed from './Dimmed'

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
        'mt-6 flex w-full items-center justify-end space-x-2 border-t border-gray100 pt-4 transition-colors',
        className,
      )}
      {...props}
    />
  )
}

interface DialogProps {
  open?: boolean
  onClose?: () => void
  withoutDimmed?: boolean
  cancelWithOutsideClick?: boolean
  size?: keyof typeof dialogVariant.size
  position?: keyof typeof dialogVariant.position
}

const dialogVariant = {
  size: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  },
  position: {
    top: {
      initial: { x: '-50%', y: '-24%', scale: 0.9, opacity: 0.3 } satisfies Target,
      animate: { x: '-50%', y: '0%', scale: 1, opacity: 1 } satisfies Target,
    },
    center: {
      initial: { x: '-50%', y: '-42%', scale: 0.9, opacity: 0.3 } satisfies Target,
      animate: { x: '-50%', y: '-54%', scale: 1, opacity: 1 } satisfies Target,
    },
  },
}

function Dialog({
  open: isOpen = false,
  onClose,
  size = 'md',
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
      startFocusLoop(containerEl)
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
              dialogVariant.size[size],
            )}
            initial={dialogVariant.position[position].initial}
            animate={dialogVariant.position[position].animate}
            exit={dialogVariant.position[position].initial}
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
