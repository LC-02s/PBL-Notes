import { NoteEditor } from '@/features/write-note'
import NoteListContainer from './NoteListContainer'

export default function NoteSection() {
  return (
    <div className="relative flex size-full flex-1 items-stretch">
      <NoteListContainer />
      <NoteEditor />
    </div>
  )
}
