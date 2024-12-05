import { Checkbox } from '@/shared/ui'
import type { DeleteWithNoteCheckboxProps } from '../types'

export default function DeleteWithNoteCheckbox({
  getDefaultValue,
  toggle,
}: DeleteWithNoteCheckboxProps) {
  return (
    <div className="mt-2">
      <Checkbox
        id="delete-with-note"
        defaultChecked={getDefaultValue()}
        onChange={toggle}
        label="폴더에 포함된 노트도 같이 삭제할래요"
      />
    </div>
  )
}
