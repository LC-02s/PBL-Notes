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
    warn: 'bg-warn-light text-warn hover:bg-warn-sub focus:bg-warn-sub active:bg-warn-sub disabled:bg-warn-light',
    success:
      'bg-success text-white hover:bg-success focus:bg-success active:bg-success disabled:bg-success-sub disabled:text-success-light',
    info: 'bg-info text-white hover:bg-info focus:bg-info active:bg-info disabled:bg-info-sub disabled:text-info-light',
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
