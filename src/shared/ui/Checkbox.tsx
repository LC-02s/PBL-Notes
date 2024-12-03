import React from 'react'
import { cn } from '../utils'
import * as Icon from './icon'

interface CheckboxProps {
  id: string
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, JSX.IntrinsicElements['input'] & CheckboxProps>(
  ({ label, id, className, ...props }, ref) => (
    <label
      htmlFor={id}
      className={cn(
        'relative flex w-fit cursor-pointer items-center justify-start pr-2',
        className,
      )}
    >
      <span className="relative block size-5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="peer absolute inset-0 block appearance-none rounded border border-gray300 bg-gray100 transition-all checked:border-info checked:bg-info hover:border-info hover:shadow-[0px_0px_0px_2px_rgba(59,132,216,0.3)] active:border-info active:shadow-[0px_0px_0px_2px_rgba(59,132,216,0.3)]"
          {...props}
        />
        <Icon.CheckOutline className="pointer-events-none absolute inset-0 m-auto text-base text-white opacity-0 transition-all peer-checked:opacity-100" />
      </span>
      {label && <span className="ml-2 block select-none whitespace-nowrap">{label}</span>}
    </label>
  ),
)

export default Checkbox
