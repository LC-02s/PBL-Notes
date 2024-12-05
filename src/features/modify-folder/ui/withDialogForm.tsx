import React from 'react'
import type { NavigateFunction } from 'react-router'
import type { Folder } from '@/entities/folder'
import type { CreateOverlayElement } from '@/shared/hooks'
import { INDEX_PATH, TRASH_PATH } from '@/shared/constants'
import { Dialog } from '@/shared/ui'
import ModifyFolderForm from './ModifyFolderForm'

export interface ModifyFolderButtonProps {
  deleteButton: (props: {
    id: Folder['id']
    onDelete?: (withNote: boolean) => void
  }) => React.ReactNode
}

export interface WithDialogFormParams extends ModifyFolderButtonProps {
  folder: Folder
  navigate: NavigateFunction
}

export function withDialogForm({
  folder,
  deleteButton: DeleteButton,
  navigate,
}: WithDialogFormParams): CreateOverlayElement {
  return ({ isOpen, close }) => (
    <Dialog open={isOpen} onClose={close}>
      <Dialog.Title>폴더 정보 수정</Dialog.Title>
      <Dialog.Content>
        <ModifyFolderForm folder={folder} onModify={close}>
          <Dialog.Footer className="justify-between">
            <DeleteButton
              id={folder.id}
              onDelete={(withNote) => {
                close()
                navigate(withNote ? TRASH_PATH : INDEX_PATH)
              }}
            />
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
