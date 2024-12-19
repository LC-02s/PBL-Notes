import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useNoteDB } from './noteStore'

export function useActiveNoteId() {
  const { noteId } = useParams()
  const targetId = +(noteId || -1)

  return { noteId: targetId }
}

export function useActiveNote() {
  const { noteId } = useActiveNoteId()

  const noteDB = useNoteDB()
  const note = useMemo(() => noteDB.get(noteId) ?? null, [noteDB, noteId])

  return { note, noteId }
}
