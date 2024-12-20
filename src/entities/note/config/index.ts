import type { Note } from '../model'

export const NOTE_DB_KEY = 'notes'

export const DELETED_NOTES_ARCHIVE_DATE = 30

export const DELETE_TARGET_MS = 1000 * 60 * 60 * 24 * DELETED_NOTES_ARCHIVE_DATE

export const DEFAULT_NOTE_VALUE: Omit<Note, 'createAt' | 'updateAt'> = {
  title: '',
  markdown: '',
  isPinned: false,
  isLocked: false,
  modifiable: true,
  included: 0,
}

export const NOTE_PATH_KEY = '/note'
