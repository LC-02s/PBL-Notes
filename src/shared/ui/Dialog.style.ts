const dialogVariants = {
  size: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  },
}

export interface DialogVariable {
  size?: keyof typeof dialogVariants.size
}

export function dialogVariable({ size = 'md' }: DialogVariable) {
  return dialogVariants.size[size]
}

const dialogButtonVariants = {
  variant: {
    warn: 'bg-warn/10 text-warn hover:bg-warn/20 active:bg-warn/20 dark:bg-warn/20 dark:hover:bg-warn/35 dark:active:bg-warn/35',
    info: 'bg-info text-white hover:bg-info/75 active:bg-info/75 dark:hover:bg-info/70 dark:active:bg-info/70',
    default: 'dark:hover:bg-gray300',
  },
}

export interface DialogButtonVariable {
  variant?: keyof typeof dialogButtonVariants.variant
}

export function dialogButtonVariable({ variant = 'default' }: DialogButtonVariable) {
  return dialogButtonVariants.variant[variant]
}
