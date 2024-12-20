import { cn } from '../lib'

type TextTag = 'span' | 'label' | 'legend' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

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
