import React from 'react'
import { useDeleteFolder } from '@/entities/folder'
import { useHandleNoteIncluded } from '@/entities/note'
import type { DeleteWithNoteCheckboxProps, UseDeleteFolderParams } from '../types'

export default function useDeleteFolderState({ id, onDelete }: UseDeleteFolderParams) {
  const withDeleteNote = React.useRef(false)
  const checkboxProps: DeleteWithNoteCheckboxProps = {
    getDefaultValue: React.useCallback(() => withDeleteNote.current, []),
    toggle: React.useCallback(() => (withDeleteNote.current = !withDeleteNote.current), []),
  }

  const deleteFolder = useDeleteFolder()
  const { softDeleteNotesByIncluded, resetIncluded } = useHandleNoteIncluded()

  const deleteTargetNotes = React.useCallback(() => {
    if (withDeleteNote.current) {
      return softDeleteNotesByIncluded({ included: id })
    }

    return resetIncluded({ included: id })
  }, [softDeleteNotesByIncluded, resetIncluded, id])

  const submitDelete = React.useCallback(() => {
    deleteFolder({ id })
    deleteTargetNotes()
    onDelete?.(withDeleteNote.current)
  }, [id, deleteFolder, deleteTargetNotes, onDelete])

  return { checkboxProps, submitDelete }
}
