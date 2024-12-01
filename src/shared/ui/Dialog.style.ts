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
