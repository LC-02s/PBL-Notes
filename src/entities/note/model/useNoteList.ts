import React from 'react'
import { useNoteDB } from './noteStore'

export default function useNoteList() {
  const noteDB = useNoteDB()

  return React.useMemo(() => [...noteDB.values()], [noteDB])
}
