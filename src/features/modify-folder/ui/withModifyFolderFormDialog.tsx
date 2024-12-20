import type { Folder } from '@/entities/folder'
import type { CreateOverlayElement } from '@/shared/lib'
import { Dialog } from '@/shared/ui'
import ModifyFolderForm from './ModifyFolderForm'

export interface ModifyFolderButtonProps {
  deleteButton: (props: { id: Folder['id']; onDelete?: () => void }) => React.ReactNode
}

export interface WithModifyFolderFormDialogParams extends ModifyFolderButtonProps {
  folder: Folder
}

export function withModifyFolderFormDialog({
  folder,
  deleteButton: DeleteButton,
}: WithModifyFolderFormDialogParams): CreateOverlayElement {
  return ({ isOpen, close }) => {
    return (
      <Dialog open={isOpen} onClose={close}>
        <Dialog.Title>폴더 정보 수정</Dialog.Title>
        <Dialog.Content>
          <ModifyFolderForm folder={folder} onModify={close}>
            <Dialog.Footer className="justify-between">
              <DeleteButton id={folder.id} onDelete={close} />
              <p className="flex items-center justify-end space-x-2">
                <Dialog.Button title="폴더 수정 취소" onClick={close}>
                  취소
                </Dialog.Button>
                <Dialog.Button title="폴더 수정" type="submit" variant="info">
                  수정
                </Dialog.Button>
              </p>
            </Dialog.Footer>
          </ModifyFolderForm>
        </Dialog.Content>
      </Dialog>
    )
  }
}
