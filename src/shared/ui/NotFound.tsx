import { useEffect } from 'react'
import { cn, reportOnError } from '../utils'
import { ShieldWarningOutline } from './icon'

export default function NotFound({ className, children, ...props }: JSX.IntrinsicElements['div']) {
  useEffect(() => {
    reportOnError('잘못된 접근이에요')
  }, [])

  return (
    <div
      className={cn(
        'flex size-full flex-col items-center justify-center p-5 pb-20 text-lg text-warn',
        className,
      )}
      {...props}
    >
      <ShieldWarningOutline className="text-4xl" />
      <p className="mt-3 text-center font-medium">잘못된 접근이에요</p>
      {children}
    </div>
  )
}
