import { useParams } from 'react-router'
import { useNoteDB } from './noteStore'

export default function useActiveNote() {
  const { noteId } = useParams()
  const targetId = +(noteId || -1)

  const noteDB = useNoteDB()
  const activeNote = noteDB.get(targetId) ?? null

  return { note: activeNote, noteId: targetId }
}