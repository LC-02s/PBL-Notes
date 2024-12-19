import { useMemo } from 'react'
import { useFolderDB, COLOR_CHIP_STYLE } from '@/entities/folder'
import { cn } from '@/shared/utils'
import NoteListItem from './NoteListItem'

export default function NoteListItemWithFolder({
  note,
  index,
}: Omit<React.ComponentPropsWithoutRef<typeof NoteListItem>, 'included'>) {
  const folderDB = useFolderDB()
  const targetFolder = useMemo(() => folderDB.get(note.included), [note, folderDB])

  return (
    <NoteListItem note={note} index={index}>
      {!!targetFolder && (
        <span
          className={cn(
            'relative size-auto whitespace-nowrap pl-3 text-sm text-gray700 transition-colors before:absolute before:inset-y-0 before:left-0.5 before:my-auto before:size-1 before:rounded-full',
            COLOR_CHIP_STYLE[targetFolder.color],
          )}
        >
          {targetFolder.name}
        </span>
      )}
    </NoteListItem>
  )
}
