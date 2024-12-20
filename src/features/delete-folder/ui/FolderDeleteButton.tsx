import { useConfirm } from '@/shared/lib'
import { Button } from '@/shared/ui'
import type { UseDeleteFolderParams } from '../model'
import { useDeleteFolderState } from '../model'
import DeleteWithNoteCheckbox from './DeleteWithNoteCheckbox'

export default function FolderDeleteButton({ id, onDelete }: UseDeleteFolderParams) {
  const { checkboxProps, submitDelete } = useDeleteFolderState({ id, onDelete })
  const { startedAt, confirm } = useConfirm<HTMLButtonElement>({
    children: <DeleteWithNoteCheckbox {...checkboxProps} />,
  })

  return (
    <Button
      ref={startedAt}
      title="폴더 삭제"
      variant="warn-light"
      onClick={async () => {
        if (await confirm('삭제한 폴더는 다시 복구할 수 없어요 \n정말 삭제하시겠어요?')) {
          submitDelete()
        }
      }}
    >
      삭제
    </Button>
  )
}
