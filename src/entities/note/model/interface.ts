import type { NOTE_PATH_KEY } from '../config'

type BaseNote = {
  title: string
  markdown: string
  createAt: number
  updateAt: number
  isPinned: boolean
  isLocked: boolean
  modifiable: boolean
}

export interface LegacyNote extends BaseNote {
  included: string | number
}

export interface Note extends BaseNote {
  included: number
}

export type NoteDB = Map<Note['createAt'], Note>

export type LegacyNoteDB = Map<LegacyNote['createAt'], LegacyNote>

export type NotePathKey = typeof NOTE_PATH_KEY

export type NotePath = `${NotePathKey}/${Note['createAt']}`

export type IncludedNotePath<Path extends string> = `${Path}${NotePath}`
