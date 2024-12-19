import { NoteEditor } from '@/features/write-note'
import { useTempNote } from '@/entities/note'
import NoteEditorWrapper from './NoteEditorWrapper'

export default function NoteEditorContainer() {
  const tempNote = useTempNote()
  const hasTempNote = !!tempNote

  return (
    <NoteEditorWrapper mount={hasTempNote}>
      {hasTempNote && <NoteEditor tempNote={tempNote} />}
    </NoteEditorWrapper>
  )
}
