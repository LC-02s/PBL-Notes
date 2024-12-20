import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { type FolderPath, useActiveFolder } from '@/entities/folder'
import type { IncludedNotePath, NotePath } from '@/entities/note'
import { useActiveNote, useAddNote, useTempNote } from '@/entities/note'
import { getNow } from '@/shared/lib'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'

export default function CreateNoteButton() {
  const navigate = useNavigate()

  const { folder, path } = useActiveFolder()
  const addNote = useAddNote()

  const add = useCallback(() => {
    const createAt = getNow()
    const targetPath: IncludedNotePath<FolderPath> | NotePath = `${path ?? ''}/note/${createAt}`

    addNote({ createAt, included: folder?.id, onSuccess: () => navigate(targetPath) })
  }, [addNote, navigate, folder, path])

  const { note } = useActiveNote()
  const tempNote = useTempNote()
  const isDisabled = !!note && !!tempNote && (!tempNote.title || !tempNote.markdown)

  return (
    <MenuButton title="노트 생성" disabled={isDisabled} onClick={add}>
      <Icon.PenNewSquareOutline />
      <HiddenText>노트 생성</HiddenText>
    </MenuButton>
  )
}
