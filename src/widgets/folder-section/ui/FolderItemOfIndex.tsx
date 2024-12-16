import { useLocation } from 'react-router'
import { useNoteListWithFilter } from '@/entities/note'
import { INDEX_PATH, NOTE_PATH_KEY } from '@/shared/constants'
import { Icon } from '@/shared/ui'
import FolderItem from './FolderItem'

export default function FolderItemOfIndex() {
  const { pathname } = useLocation()
  const isIndexPath = pathname === INDEX_PATH

  const noteList = useNoteListWithFilter((note) => note.modifiable)

  return (
    <li>
      <FolderItem
        length={noteList.length}
        title="모든 노트 보기"
        active={isIndexPath || pathname.startsWith(NOTE_PATH_KEY)}
        disabled={isIndexPath}
      >
        <Icon.FolderOutline className="mx-px text-sm text-gray600 transition-colors" />
        <span>모든 노트</span>
      </FolderItem>
    </li>
  )
}
