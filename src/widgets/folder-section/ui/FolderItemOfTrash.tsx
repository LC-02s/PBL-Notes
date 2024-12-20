import { useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { TRASH_PATH } from '@/entities/folder'
import { useNoteListWithFilter } from '@/entities/note'
import { Icon } from '@/shared/ui'
import FolderItem from './FolderItem'

export default function FolderItemOfTrash() {
  const { pathname } = useLocation()
  const isInTrashPath = pathname.startsWith(TRASH_PATH)

  const trashNoteList = useNoteListWithFilter((note) => !note.modifiable)

  return (
    <AnimatePresence>
      {(isInTrashPath || trashNoteList.length > 0) && (
        <motion.li
          initial={{ y: '-24%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-24%', opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
        >
          <FolderItem
            to={TRASH_PATH}
            title="최근 삭제한 노트 보기"
            length={trashNoteList.length}
            active={isInTrashPath}
            disabled={pathname === TRASH_PATH}
          >
            <Icon.TrashBinOutline className="text-base text-gray600 transition-colors" />
            <span>최근 삭제한 항목</span>
          </FolderItem>
        </motion.li>
      )}
    </AnimatePresence>
  )
}
