import type { Note } from './interface'

export default function useDividePinnedNoteList(noteList: Note[]) {
  const pinned = noteList.filter((note) => note.isPinned)
  const basic = noteList.filter((note) => !note.isPinned)

  return { pinned, basic }
}
