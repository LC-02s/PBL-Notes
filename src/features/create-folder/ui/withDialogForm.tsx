import type { NavigateFunction } from 'react-router'
import type { CreateOverlayElement } from '@/shared/hooks'
import { Dialog } from '@/shared/ui'
import AddFolderForm from './AddFolderForm'

interface WithDialogFormParams {
  navigate: NavigateFunction
}

export default function withDialogForm({ navigate }: WithDialogFormParams): CreateOverlayElement {
  return ({ isOpen, close }) => {
    return (
      <Dialog open={isOpen} onClose={close}>
        <Dialog.Title>새로운 폴더</Dialog.Title>
        <Dialog.Content>
          <AddFolderForm
            onSuccess={(id) => {
              navigate(`/folder/${id}`)
              close()
            }}
            onFailed={close}
          >
            <Dialog.Footer>
              <Dialog.Button title="폴더 생성 취소" onClick={close}>
                취소
              </Dialog.Button>
              <Dialog.Button title="폴더 생성" type="submit" variant="info">
                생성
              </Dialog.Button>
            </Dialog.Footer>
          </AddFolderForm>
        </Dialog.Content>
      </Dialog>
    )
  }
}
