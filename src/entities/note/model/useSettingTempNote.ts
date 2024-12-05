import React from 'react'
import { useWindowEvent } from '@/shared/hooks'
import { useSetTempNote } from './noteStore'
import useActiveNote from './useActiveNote'

export default function useSettingTempNote() {
  const { note, noteId } = useActiveNote()
  const setTempNote = useSetTempNote()

  React.useEffect(() => setTempNote({ createAt: noteId }), [setTempNote, noteId])

  useWindowEvent('beforeunload', (e) => {
    if (!note || !note.modifiable || note.isLocked) return

    e.preventDefault()
    e.returnValue = ''
  })
}
