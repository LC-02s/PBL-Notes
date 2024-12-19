import { useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useDeleteFolder } from '@/entities/folder'
import { useHandleNoteIncluded } from '@/entities/note'
import { INDEX_PATH, TRASH_PATH } from '@/shared/constants'
import type { DeleteWithNoteCheckboxProps, UseDeleteFolderParams } from '../types'

export default function useDeleteFolderState({ id, onDelete }: UseDeleteFolderParams) {
  const withDeleteNote = useRef(false)
  const checkboxProps: DeleteWithNoteCheckboxProps = {
    getDefaultValue: useCallback(() => withDeleteNote.current, []),
    toggle: useCallback(() => (withDeleteNote.current = !withDeleteNote.current), []),
  }

  const deleteFolder = useDeleteFolder()
  const { softDeleteNotesByIncluded, resetIncluded } = useHandleNoteIncluded()

  const deleteTargetNotes = useCallback(() => {
    if (withDeleteNote.current) {
      return softDeleteNotesByIncluded({ included: id })
    }

    return resetIncluded({ included: id })
  }, [softDeleteNotesByIncluded, resetIncluded, id])

  const navigate = useNavigate()

  const submitDelete = useCallback(() => {
    deleteFolder({ id })
    deleteTargetNotes()
    navigate(withDeleteNote.current ? TRASH_PATH : INDEX_PATH)
    onDelete?.()
  }, [id, deleteFolder, deleteTargetNotes, onDelete, navigate])

  return { checkboxProps, submitDelete }
}
