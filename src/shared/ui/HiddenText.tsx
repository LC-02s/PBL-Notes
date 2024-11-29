import type { HeadingTag } from '../types'
import { cn } from '../utils'

type TextTag = 'span' | 'label' | 'caption' | HeadingTag

type HiddenTextProps<T extends TextTag> = React.PropsWithoutRef<JSX.IntrinsicElements[T]> & {
  as?: T
}

export default function HiddenTextForA11y<T extends TextTag>({
  as,
  className,
  ...props
}: HiddenTextProps<T>) {
  const Component = as || 'span'

  return (
    <Component
      className={cn('hidden-text', className)}
      {...(props as Omit<HiddenTextProps<'span'>, 'as'>)}
    />
  )
}
