import NoteEditorContainer from './NoteEditorContainer'
import NoteListContainer from './NoteListContainer'

export default function NoteSection() {
  return (
    <div className="relative flex size-full flex-1 items-stretch">
      <NoteListContainer />
      <NoteEditorContainer />
    </div>
  )
}
