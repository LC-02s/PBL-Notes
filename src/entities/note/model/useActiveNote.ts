import React from 'react'
import { useParams } from 'react-router'
import { useNoteDB, useNoteSession } from './noteStore'

export default function useActiveNote() {
  const { noteId } = useParams()
  const targetId = +(noteId || -1)

  const noteDB = useNoteDB()
  const note = React.useMemo(() => noteDB.get(targetId) ?? null, [noteDB, targetId])

  const noteSession = useNoteSession()
  const isNotFound = React.useMemo(() => {
    return noteSession && !noteDB.has(targetId)
  }, [noteSession, noteDB, targetId])

  return { note, noteId: targetId, isNotFound }
}
