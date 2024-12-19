import { forwardRef } from 'react'
import { cn } from '../utils'

const buttonVariants = {
  variant: {
    'warn-light':
      'bg-warn/10 text-warn hover:bg-warn/20 active:bg-warn/20 dark:bg-warn/20 dark:hover:bg-warn/35 dark:active:bg-warn/35',
    warn: 'bg-warn text-white hover:bg-warn/75 active:bg-warn/75 dark:hover:bg-warn/70 dark:active:bg-warn/70',
    info: 'bg-info text-white hover:bg-info/75 active:bg-info/75 dark:hover:bg-info/70 dark:active:bg-info/70',
    default: 'dark:hover:bg-gray300',
    light: 'bg-gray000 hover:bg-gray100 active:bg-gray100',
  },
}

interface ButtonVariable {
  variant?: keyof typeof buttonVariants.variant
}

function buttonVariable({ variant = 'default' }: ButtonVariable) {
  return buttonVariants.variant[variant]
}

const Button = forwardRef<HTMLButtonElement, JSX.IntrinsicElements['button'] & ButtonVariable>(
  ({ variant, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex size-auto min-w-20 items-center justify-center break-keep rounded bg-gray100 p-1 text-base text-gray700 transition-colors hover:bg-gray200 active:bg-gray200',
          buttonVariable({ variant }),
          className,
        )}
        {...props}
      />
    )
  },
)

export default Button
