import React from 'react'
import { useDropdown } from '../hooks'
import DropdownWrapper from './DropdownWrapper'

interface DropdownMenuProps<T extends string> {
  defaultValue: T
  className?: string
  renderTrigger: (props: { value: T; toggle: () => void }) => React.ReactNode
  onSubmit?: (value: T) => void
  children?: (props: { value: T; setValue: (value: T) => void }) => React.ReactNode
}

export default function DropdownMenu<T extends string>({
  defaultValue,
  className,
  renderTrigger: Trigger,
  onSubmit,
  children,
}: DropdownMenuProps<T>) {
  const { containerRef, isOpen, close, toggle } = useDropdown<HTMLDivElement>()

  const [value, setValue] = React.useState(defaultValue)
  const setValueOnSubmit = React.useCallback(() => {
    setValue(value)
    onSubmit?.(value)
    close()
  }, [value, onSubmit, close])

  return (
    <div ref={containerRef} className="relative block">
      <Trigger value={value} toggle={toggle} />
      <DropdownWrapper open={isOpen} className={className}>
        {children?.({ value, setValue: setValueOnSubmit })}
      </DropdownWrapper>
    </div>
  )
}
