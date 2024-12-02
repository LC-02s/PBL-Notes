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
