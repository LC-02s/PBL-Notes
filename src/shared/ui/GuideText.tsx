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

export default function GuideText({
  message,
  type = 'default',
  className,
  ...props
}: GuideTextProps & JSX.IntrinsicElements['p']) {
  if (!message) {
    return null
  }

  return (
    <p
      className={cn(
        'mt-2 flex items-center justify-start break-keep px-0.5',
        guideType[type],
        className,
      )}
      {...props}
    >
      <Icon.DangerCircleOutline className="mr-1.5" />
      {message}
    </p>
  )
}
