import type { Note, NoteDB } from '../types'

export function convertNoteListToDB(noteList: Note[]) {
  return noteList.reduce<NoteDB>((db, note) => {
    return db.set(note.createAt, note)
  }, new Map())
}
