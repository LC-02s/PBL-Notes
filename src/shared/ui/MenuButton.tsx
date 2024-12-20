import { forwardRef } from 'react'
import { motion } from 'motion/react'
import { cn } from '../lib'

interface MenuButtonProps extends React.ComponentProps<typeof motion.button> {
  active?: boolean
}

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ active: isActive = false, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        className={cn(
          'relative inline-flex h-8 w-9 items-center justify-center rounded bg-gray000 text-xl text-gray600 transition-colors hover:bg-gray100 active:bg-gray100 disabled:cursor-not-allowed disabled:text-gray400 disabled:hover:bg-gray000 disabled:focus:bg-gray000 disabled:active:bg-gray000',
          isActive &&
            'bg-gray100 hover:bg-gray200 active:bg-gray200 disabled:cursor-auto disabled:bg-gray100 disabled:text-gray600 disabled:hover:bg-gray100 disabled:active:bg-gray100',
          className,
        )}
        {...props}
      />
    )
  },
)

export default MenuButton
