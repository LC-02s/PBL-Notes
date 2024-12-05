import { useNavigate } from 'react-router'
import { useOverlay } from '@/shared/hooks'
import { Icon } from '@/shared/ui'
import withDialogForm from './withDialogForm'

export default function AddFolderButton() {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()
  const navigate = useNavigate()

  return (
    <button
      ref={startedAt}
      type="button"
      title="폴더 추가"
      className="flex size-auto items-center justify-start p-1 text-xl text-gray500 transition-colors hover:text-info active:text-info"
      onClick={() => open(withDialogForm({ navigate }))}
    >
      <Icon.AddFolderOutline />
      <span className="ml-2 block whitespace-nowrap text-sm font-medium">새로운 폴더</span>
    </button>
  )
}
