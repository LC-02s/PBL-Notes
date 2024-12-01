import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../utils'
import * as Icon from './icon'

const guideType = {
  warn: 'text-warn',
  info: 'text-warn',
  default: 'text-gray600',
}

interface GuideTextProps {
  message?: string | null
  type?: keyof typeof guideType
}

export default function GuideText({ message, type = 'default' }: GuideTextProps) {
  return (
    <AnimatePresence>
      {!!message && (
        <motion.p
          initial={{ height: 0, marginTop: '0rem', opacity: 0 }}
          animate={{ height: 'auto', marginTop: '0.5rem', opacity: 1 }}
          exit={{ height: 0, marginTop: '0rem', opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          className={cn(
            'mt-2 flex items-center justify-start whitespace-nowrap px-0.5',
            guideType[type],
          )}
        >
          <Icon.DangerCircleOutline className="mr-1.5" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
