import React from 'react'
import { useSetTempNote } from './noteStore'
import useActiveNote from './useActiveNote'

export default function useSettingTempNote() {
  const { note, noteId } = useActiveNote()
  const setTempNote = useSetTempNote()

  React.useEffect(() => setTempNote({ createAt: noteId }), [setTempNote, noteId])

  return { note }
}
