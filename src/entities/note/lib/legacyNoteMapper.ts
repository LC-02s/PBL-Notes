import type { LegacyNote, Note } from '../model'

export default function legacyNoteMapper(
  noteList: LegacyNote[],
  mapper: Map<string, number>,
): Note[] {
  return noteList.map((note) => {
    if (typeof note.included === 'number') {
      return note as Note
    }

    return { ...note, included: mapper.get(note.included) || 0 }
  })
}
