import { useViewType } from '@/features/change-view-type'
import type { Note } from '@/entities/note'
import { cn } from '@/shared/lib'

function NoteListGrid({ children }: React.PropsWithChildren) {
  const { viewType } = useViewType()

  return (
    <ul
      className={cn(
        'w-full',
        viewType === 'gallery'
          ? 'grid columns-auto grid-cols-[repeat(auto-fill,_minmax(12.5rem,_auto))] gap-3'
          : 'space-y-2',
      )}
    >
      {children}
    </ul>
  )
}

interface NoteListProps {
  list: Note[]
  renderItem: (note: Note, index: number) => React.ReactNode
}

export default function NoteList({ list, renderItem }: NoteListProps) {
  return <NoteListGrid>{list.map(renderItem)}</NoteListGrid>
}
