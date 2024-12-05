import { create } from 'zustand'
import { getNow, reportOnError, reportOnSuccess } from '@/shared/utils'
import type { Note, NoteDB } from '../types'
import { convertNoteListToDB, extractMarkdownTitle } from '../utils'
import { DEFAULT_NOTE_VALUE } from '../constants'

type OnSuccessParams = { onSuccess?: () => void }
type OnFailedParams = { onFailed?: () => void }

interface NoteStore {
  noteDB: NoteDB
  setNoteDB: (payload: NoteDB) => void

  tempNote: Note | null
  setTempNote: (payload: Pick<Note, 'createAt'>) => void

  noteSession: boolean
  setNoteSession: (payload: boolean) => void

  addNote: (
    payload: Pick<Note, 'createAt'> & Partial<Pick<Note, 'included'>> & OnSuccessParams,
  ) => void

  deleteNote: (payload: Pick<Note, 'createAt'>) => void

  modifyNote: (
    payload: Pick<Note, 'createAt'> & Partial<Note> & OnSuccessParams & OnFailedParams,
  ) => void

  setTempNoteMarkdown: (payload: Pick<Note, 'createAt' | 'markdown'>) => void

  softDeleteNotesByIncluded: (payload: Pick<Note, 'included'>) => void

  resetIncluded: (payload: Pick<Note, 'included'>) => void
}

function tempNoteInterceptor(store: NoteStore): NoteStore | Pick<NoteStore, 'noteDB' | 'tempNote'> {
  const { noteDB, tempNote } = store

  if (!tempNote) {
    return store
  }

  const prevNote = noteDB.get(tempNote.createAt)

  if (!prevNote || prevNote.markdown === tempNote.markdown) {
    return store
  }

  const updateAt = getNow()
  const title = extractMarkdownTitle(tempNote.markdown)
  const note: Note = { ...tempNote, title, updateAt }

  noteDB.set(tempNote.createAt, note)

  return { noteDB: new Map(noteDB), tempNote: note }
}

export const useNoteStore = create<NoteStore>((set) => ({
  noteDB: new Map(),
  setNoteDB: (noteDB) => set({ noteDB }),

  tempNote: null,

  setTempNote: ({ createAt }) =>
    set((prev) => {
      const store = tempNoteInterceptor(prev)
      const { noteDB, tempNote } = store
      const targetNote = noteDB.get(createAt)

      if (!targetNote || (tempNote && tempNote.createAt === createAt)) {
        return store
      }

      if (!tempNote || !!(tempNote.markdown && tempNote.title)) {
        return { noteDB, tempNote: targetNote }
      }

      noteDB.delete(tempNote.createAt)

      return { noteDB: new Map(noteDB), tempNote: targetNote }
    }),

  noteSession: false,
  setNoteSession: (noteSession) => set({ noteSession }),

  addNote: ({ createAt, included = DEFAULT_NOTE_VALUE.included, onSuccess }) =>
    set((prev) => {
      const store = tempNoteInterceptor(prev)
      const { noteDB, tempNote } = store

      if (noteDB.has(createAt)) {
        reportOnError('노트 생성에 실패했어요')

        return store
      }

      const note: Note = { createAt, updateAt: createAt, ...DEFAULT_NOTE_VALUE, included }

      noteDB.set(createAt, note)
      reportOnSuccess('노트가 생성되었어요!')
      onSuccess?.()

      if (!tempNote) {
        return { noteDB: new Map(noteDB), tempNote: note }
      }

      return { noteDB, tempNote: note }
    }),

  deleteNote: ({ createAt }) =>
    set((prev) => {
      const store = tempNoteInterceptor(prev)
      const { noteDB, tempNote } = store
      const success = noteDB.delete(createAt)

      if (!success) {
        reportOnError('노트 삭제에 실패했어요')

        return store
      }

      reportOnSuccess('노트가 삭제되었어요!')

      if (!tempNote || tempNote.createAt === createAt) {
        return { noteDB: new Map(noteDB), tempNote: null }
      }

      return { noteDB: new Map(noteDB), tempNote }
    }),

  modifyNote: ({ createAt, onSuccess, onFailed, ...note }) =>
    set((prev) => {
      const store = tempNoteInterceptor(prev)
      const { noteDB, tempNote } = store
      const targetNote = noteDB.get(createAt)

      if (!targetNote) {
        onFailed?.()

        return store
      }

      const newNote: Note = { ...targetNote, ...note, updateAt: getNow() }

      noteDB.set(targetNote.createAt, newNote)
      onSuccess?.()

      if (tempNote && targetNote.createAt === tempNote.createAt) {
        return { noteDB: new Map(noteDB), tempNote: newNote }
      }

      return { noteDB: new Map(noteDB), tempNote }
    }),

  setTempNoteMarkdown: ({ createAt, markdown }) =>
    set((prev) => {
      const { tempNote } = prev

      if (!tempNote || tempNote.createAt !== createAt) {
        return prev
      }

      Object.assign(tempNote, { title: extractMarkdownTitle(markdown), markdown })

      return { tempNote: { ...tempNote } }
    }),

  softDeleteNotesByIncluded: ({ included }) =>
    set((prev) => {
      const { noteDB } = tempNoteInterceptor(prev)
      const noteList = [...noteDB.values()].map((note) => {
        if (included === note.included) {
          return { ...note, modifiable: false, included: DEFAULT_NOTE_VALUE.included }
        }

        return note
      })

      return { noteDB: convertNoteListToDB(noteList), tempNote: null }
    }),

  resetIncluded: ({ included }) =>
    set((prev) => {
      const { noteDB } = tempNoteInterceptor(prev)
      const noteList = [...noteDB.values()].map((note) => {
        if (included === note.included) {
          return { ...note, included: DEFAULT_NOTE_VALUE.included }
        }

        return note
      })

      return { noteDB: convertNoteListToDB(noteList), tempNote: null }
    }),
}))

export const useNoteDB = () => useNoteStore((store) => store.noteDB)

export const useTempNote = () => useNoteStore((store) => store.tempNote)

export const useNoteSession = () => useNoteStore((store) => store.noteSession)

export const useAddNote = () => useNoteStore((store) => store.addNote)

export const useDeleteNote = () => useNoteStore((store) => store.deleteNote)

export const useModifyNote = () => useNoteStore((store) => store.modifyNote)

export const useSetTempNote = () => useNoteStore((store) => store.setTempNote)

export const useSetTempNoteMarkdown = () => useNoteStore((store) => store.setTempNoteMarkdown)

export const useHandleNoteIncluded = () => ({
  softDeleteNotesByIncluded: useNoteStore((store) => store.softDeleteNotesByIncluded),
  resetIncluded: useNoteStore((store) => store.resetIncluded),
})
