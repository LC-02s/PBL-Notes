import { getNow } from '@/shared/utils'
import { DELETE_TARGET_MS } from '../constants'
import type { Note } from '../types'

export default function filterDeletedNotesOutOfDate(noteList: Note[]) {
  const now = getNow()

  return noteList.filter(({ updateAt, modifiable }) => {
    return modifiable || now - updateAt <= DELETE_TARGET_MS
  })
}
