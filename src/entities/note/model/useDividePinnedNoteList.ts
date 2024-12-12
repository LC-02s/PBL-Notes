import React from 'react'
import type { Note } from '../types'

export default function useDividePinnedNoteList(noteList: Note[]) {
  const pinned = React.useMemo(() => {
    return noteList.filter((note) => note.isPinned)
  }, [noteList])

  const basic = React.useMemo(() => {
    return noteList.filter((note) => !note.isPinned)
  }, [noteList])

  return { pinned, basic }
}