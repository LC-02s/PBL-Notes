import { useEffect } from 'react'
import { useSetTempNote } from './noteStore'
import { useActiveNoteId } from './useActiveNote'

export default function useSettingTempNote(noteSession: boolean) {
  const { noteId } = useActiveNoteId()
  const setTempNote = useSetTempNote()

  useEffect(() => setTempNote({ createAt: noteId }), [setTempNote, noteId, noteSession])
}
