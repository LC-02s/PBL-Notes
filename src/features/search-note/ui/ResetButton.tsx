import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@/shared/ui'

interface ResetButtonProps {
  mount: boolean
  reset: () => void
}

export default function ResetButton({ mount, reset }: ResetButtonProps) {
  return (
    <AnimatePresence>
      {mount && (
        <motion.button
          className="absolute inset-y-0 right-1.5 m-auto flex size-5 items-center justify-center"
          onClick={reset}
          initial={{ x: '24%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '24%', opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.16 }}
        >
          <Icon.BackspaceOutline className="text-lg text-gray500 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
