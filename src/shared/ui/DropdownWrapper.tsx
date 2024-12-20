import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../lib'

interface DropdownWrapperProps {
  open?: boolean
  className?: string
}

export default function DropdownWrapper({
  open: isOpen = false,
  className,
  children,
}: React.PropsWithChildren<DropdownWrapperProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          className={cn(
            'absolute -left-3 top-12 z-50 rounded-md border border-gray200 bg-gray000 p-1 transition-colors',
            className,
          )}
          initial={{ top: '2rem', scale: 0.9, opacity: 0 }}
          animate={{ top: '3rem', scale: 1, opacity: 1 }}
          exit={{ top: '2rem', scale: 0.9, opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}
