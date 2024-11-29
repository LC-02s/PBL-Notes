const dialogVariants = {
  size: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
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
    warn: 'bg-warn-light text-warn hover:bg-warn-sub focus:bg-warn-sub active:bg-warn-sub disabled:bg-warn-light',
    success:
      'bg-success-light text-success hover:bg-success-sub focus:bg-success-sub active:bg-success-sub disabled:bg-success-light',
    info: 'bg-info-light text-info hover:bg-info-sub focus:bg-info-sub active:bg-info-sub disabled:bg-info-light',
    default:
      'bg-gray100 text-gray700 hover:bg-gray200 focus:bg-gray200 active:bg-gray200 disabled:bg-gray100',
  },
}

export interface DialogButtonVariable {
  variant?: keyof typeof dialogButtonVariants.variant
}

export function dialogButtonVariable({ variant = 'default' }: DialogButtonVariable) {
  return dialogButtonVariants.variant[variant]
}
