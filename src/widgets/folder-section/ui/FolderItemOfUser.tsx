import { useLocation } from 'react-router'
import type { FolderPath } from '@/entities/folder'
import { type Folder, COLOR_CHIP_STYLE } from '@/entities/folder'
import { useNoteListWithFilter } from '@/entities/note'
import { cn } from '@/shared/lib'
import FolderItem from './FolderItem'

interface UserFolderItemProps {
  folder: Folder
}

export default function FolderItemOfUser({ folder }: UserFolderItemProps) {
  const { pathname } = useLocation()
  const targetPath: FolderPath = `/folder/${folder.id}`

  const noteList = useNoteListWithFilter((note) => note.modifiable && note.included === folder.id)

  return (
    <li>
      <FolderItem
        to={targetPath}
        length={noteList.length}
        title={`폴더 보기: ${folder.name}`}
        className={cn(
          'relative size-auto pl-4 text-sm text-gray700 transition-colors before:absolute before:inset-y-0 before:left-1 before:my-auto before:size-1 before:rounded-full before:bg-gray500',
          COLOR_CHIP_STYLE[folder.color],
        )}
        active={pathname.startsWith(targetPath)}
        disabled={pathname === targetPath}
      >
        {folder.name}
      </FolderItem>
    </li>
  )
}
