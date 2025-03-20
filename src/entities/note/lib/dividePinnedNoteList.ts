import type { Note } from '../model'

export default function dividePinnedNoteList(noteList: Note[]) {
  const pinned = noteList.filter((note) => note.isPinned)
  const basic = noteList.filter((note) => !note.isPinned)

  return { pinned, basic }
}
