import { DropdownMenu } from '@/shared/ui'
import type { ColorChip } from '../model'
import { DEFAULT_COLOR_CHIP } from '../config'
import ColorDropdownItem from './ColorDropdownItem'
import ColorDropdownTrigger from './ColorDropdownTrigger'

interface ColorDropdownProps {
  defaultValue?: ColorChip
  submit?: (value: ColorChip) => void
}

export default function ColorDropdown({ defaultValue, submit }: ColorDropdownProps) {
  return (
    <DropdownMenu
      defaultValue={defaultValue ?? DEFAULT_COLOR_CHIP}
      renderTrigger={ColorDropdownTrigger}
      onSubmit={submit}
    >
      {({ value, setValue }) => (
        <>
          <ColorDropdownItem value="red" setValue={setValue} selectedValue={value} />
          <ColorDropdownItem value="orange" setValue={setValue} selectedValue={value} />
          <ColorDropdownItem value="yellow" setValue={setValue} selectedValue={value} />
          <ColorDropdownItem value="green" setValue={setValue} selectedValue={value} />
          <ColorDropdownItem value="blue" setValue={setValue} selectedValue={value} />
          <ColorDropdownItem value="purple" setValue={setValue} selectedValue={value} />
          <ColorDropdownItem value="none" setValue={setValue} selectedValue={value} />
        </>
      )}
    </DropdownMenu>
  )
}
