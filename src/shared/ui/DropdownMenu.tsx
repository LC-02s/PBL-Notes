import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useBooleanState, useOutsideClick, useWindowEvent } from '../hooks'
import { cn } from '../utils'

interface DropdownMenuProps<T> {
  defaultValue: T
  className?: string
  renderTrigger: (props: { value: T; toggle: () => void }) => React.ReactNode
  onSubmit?: (value: T) => void
  children?: (props: { value: T; setValue: (value: T) => void }) => React.ReactNode
}

export default function DropdownMenu<T>({
  defaultValue,
  className,
  renderTrigger: Trigger,
  onSubmit,
  children,
}: DropdownMenuProps<T>) {
  const [isOpen, { setFalse: close, toggle }] = useBooleanState()
  const [value, setValue] = React.useState(defaultValue)
  const containerRef = useOutsideClick<HTMLDivElement>(close)

  React.useEffect(() => onSubmit?.(value), [value, onSubmit])

  React.useEffect(close, [value, close])

  useWindowEvent('keydown', (e) => {
    if (isOpen && e.key === 'Escape') close()
  })

  return (
    <div ref={containerRef} className="relative block">
      <Trigger value={value} toggle={toggle} />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={cn(
              'absolute -left-3 top-12 rounded-md border border-gray200 bg-gray000 p-1 transition-colors',
              className,
            )}
            initial={{ top: '2rem', scale: 0.9, opacity: 0 }}
            animate={{ top: '3rem', scale: 1, opacity: 1 }}
            exit={{ top: '2rem', scale: 0.9, opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
          >
            {children?.({ value, setValue })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
