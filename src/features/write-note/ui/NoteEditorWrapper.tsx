import { AnimatePresence, motion } from 'motion/react'
import { useViewType } from '@/shared/hooks'
import Dimmed from '@/shared/ui/Dimmed'

interface NoteEditorWrapperProps {
  mount: boolean
}

export default function NoteEditorWrapper({
  mount,
  children,
}: React.PropsWithChildren<NoteEditorWrapperProps>) {
  const { viewType } = useViewType()

  if (viewType === 'list') {
    return children
  }

  return (
    <AnimatePresence>
      {mount && (
        <>
          <motion.div
            className="absolute inset-0 z-10 w-full"
            initial={{ y: '-12%', scale: 0.4, opacity: 0 }}
            animate={{ y: '0%', scale: 1, opacity: 1 }}
            exit={{ y: '-12%', scale: 0.4, opacity: 0 }}
            transition={{ ease: 'circInOut', duration: 0.3 }}
          >
            {children}
          </motion.div>
          <Dimmed
            className="z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
