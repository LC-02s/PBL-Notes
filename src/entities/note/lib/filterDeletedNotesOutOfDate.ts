import { getNow } from '@/shared/lib'
import type { Note } from '../model'
import { DELETE_TARGET_MS } from '../config'

export default function filterDeletedNotesOutOfDate(noteList: Note[]) {
  const now = getNow()

  return noteList.filter(({ updateAt, modifiable }) => {
    return modifiable || now - updateAt <= DELETE_TARGET_MS
  })
}
