import React from 'react'
import { useNoteSession, useSetTempNote } from './noteStore'
import useActiveNote from './useActiveNote'

export default function useSettingTempNote() {
  const { note, noteId } = useActiveNote()
  const noteSession = useNoteSession()
  const setTempNote = useSetTempNote()

  React.useEffect(() => setTempNote({ createAt: noteId }), [setTempNote, noteId, noteSession])

  return { note }
}
