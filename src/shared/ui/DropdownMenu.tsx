import { useState, useMemo } from 'react'
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
  const { containerRef, isOpen, withClose, toggle } = useDropdown<HTMLDivElement>()

  const [value, setValue] = useState(defaultValue)
  const setValueOnSubmitWithClose = useMemo(() => {
    return withClose((v: T) => {
      setValue(v)
      onSubmit?.(v)
    })
  }, [onSubmit, withClose])

  return (
    <div ref={containerRef} className="relative block">
      <Trigger value={value} toggle={toggle} />
      <DropdownWrapper open={isOpen} className={className}>
        {children?.({ value, setValue: setValueOnSubmitWithClose })}
      </DropdownWrapper>
    </div>
  )
}
