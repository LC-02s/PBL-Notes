import { useMemo } from 'react'
import { useNoteDB } from './noteStore'

export default function useNoteList() {
  const noteDB = useNoteDB()

  return useMemo(() => [...noteDB.values()], [noteDB])
}
