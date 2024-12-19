import { useMemo } from 'react'
import type { Note } from '../types'

export default function useDividePinnedNoteList(noteList: Note[]) {
  const pinned = useMemo(() => {
    return noteList.filter((note) => note.isPinned)
  }, [noteList])

  const basic = useMemo(() => {
    return noteList.filter((note) => !note.isPinned)
  }, [noteList])

  return { pinned, basic }
}
