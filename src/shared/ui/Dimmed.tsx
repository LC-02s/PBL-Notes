import React from 'react'
import { motion } from 'motion/react'
import { cn } from '../utils'

type DimmedProps = React.ComponentProps<typeof motion.div>

const Dimmed = React.forwardRef<HTMLDivElement, DimmedProps>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn('absolute inset-0 -z-[1] m-0 border-none bg-dimmed p-0', className)}
    {...props}
  />
))

export default Dimmed
