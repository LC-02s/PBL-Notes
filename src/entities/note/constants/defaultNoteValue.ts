import type { Note } from '../types'

const DEFAULT_NOTE_VALUE: Omit<Note, 'createAt' | 'updateAt'> = {
  title: '',
  markdown: '',
  isPinned: false,
  isLocked: false,
  modifiable: true,
  included: 0,
}

export default DEFAULT_NOTE_VALUE
