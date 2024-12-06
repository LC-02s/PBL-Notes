import { cn } from '../utils'
import * as Icon from './icon'

interface DropdownItemProps<T extends string> {
  title: string
  className?: string
  value: T
  selectedValue: T
  setValue: (value: T) => void
}

export default function DropdownItem<T extends string>({
  title,
  className,
  value,
  selectedValue,
  setValue,
  children,
}: React.PropsWithChildren<DropdownItemProps<T>>) {
  const isSelected = selectedValue === value

  return (
    <li>
      <button
        type="button"
        title={title}
        className={cn(
          'relative flex h-9 w-32 items-center justify-start rounded py-1 pl-9 transition-colors hover:bg-gray100 active:bg-gray100 disabled:hover:bg-gray000 disabled:active:bg-gray000',
          className,
        )}
        disabled={isSelected}
        onClick={() => setValue(value)}
      >
        {isSelected && (
          <Icon.CheckOutline className="absolute inset-y-0 left-2 m-auto text-gray500 transition-colors" />
        )}
        <span>{children}</span>
      </button>
    </li>
  )
}
