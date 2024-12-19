import { forwardRef } from 'react'
import { cn } from '../utils'

interface TextInputProps {
  isError?: boolean
}

const TextInput = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input'] & TextInputProps>(
  ({ isError = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={cn(
          'block h-10 w-full rounded-md border border-gray200 bg-gray000 px-3 py-1 text-gray700 outline-none transition-all placeholder:text-gray400 focus:border-info focus:shadow-[0px_0px_0px_2px_rgba(59,132,216,0.3)]',
          isError &&
            'border-warn focus:border-warn focus:shadow-[0px_0px_0px_2px_rgba(225,75,77,0.3)]',
          className,
        )}
        autoComplete="off"
        {...props}
      />
    )
  },
)

export default TextInput
