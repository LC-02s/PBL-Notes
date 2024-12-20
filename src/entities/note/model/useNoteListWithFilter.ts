import { useMemo } from 'react'
import type { Note } from './interface'
import { useNoteDB } from './noteStore'

interface NoteFilter {
  (note: Note, index: number): unknown
}

export default function useNoteListWithFilter(
  selector: NoteFilter,
  deps: React.DependencyList = [],
) {
  const noteDB = useNoteDB()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => [...noteDB.values()].filter(selector), [noteDB, ...deps])
}
