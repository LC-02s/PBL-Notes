import React from 'react'
import type { Note } from '../types'
import useNoteList from './useNoteList'

interface NoteFilter {
  (note: Note, index: number, array: Note[]): unknown
}

export default function useNoteListFilter(selector: NoteFilter) {
  const noteList = useNoteList()

  return React.useMemo(() => noteList.filter(selector), [noteList, selector])
}
