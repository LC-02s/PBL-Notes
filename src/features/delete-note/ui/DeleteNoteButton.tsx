import React from 'react'
import { useNavigate } from 'react-router'
import { useDeleteNote, useModifyNote, useActiveNote } from '@/entities/note'
import { TRASH_PATH } from '@/shared/constants'
import { useConfirm } from '@/shared/hooks'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'
import { reportOnError, reportOnSuccess } from '@/shared/utils'

const onSuccess = () => reportOnSuccess('노트가 삭제되었어요!')

const onFailed = () => reportOnError('노트 삭제에 실패했어요')

export default function DeleteNoteButton() {
  const navigate = useNavigate()

  const { note } = useActiveNote()
  const modifyNote = useModifyNote()
  const deleteNote = useDeleteNote()

  const isDisabled = !note

  const { startedAt, confirm } = useConfirm<HTMLButtonElement>()

  const submitDelete = React.useCallback(async () => {
    if (!note) return

    if (note.modifiable) {
      modifyNote({ createAt: note.createAt, modifiable: false, onSuccess, onFailed })
      navigate(TRASH_PATH)
      return
    }

    if (await confirm('삭제한 노트는 다시 복구할 수 없어요 \n정말 삭제하시겠어요?')) {
      deleteNote({ createAt: note.createAt })
      navigate(TRASH_PATH)
    }
  }, [navigate, note, modifyNote, deleteNote, confirm])

  return (
    <MenuButton ref={startedAt} title="노트 삭제" disabled={isDisabled} onClick={submitDelete}>
      <Icon.TrashBinTrashOutline />
      <HiddenText>노트 삭제</HiddenText>
    </MenuButton>
  )
}
