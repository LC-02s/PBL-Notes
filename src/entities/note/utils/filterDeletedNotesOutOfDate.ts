import { getNow } from '@/shared/utils'
import type { Note } from '../types'
import { DELETE_TARGET_MS } from '../constants'

export default function filterDeletedNotesOutOfDate(noteList: Note[]) {
  const now = getNow()

  return noteList.filter(({ updateAt, modifiable }) => {
    return modifiable || now - updateAt <= DELETE_TARGET_MS
  })
}
