import { useMemo } from 'react'
import { useDefaultSortSetting, compareBySortType } from '@/features/change-sort-type'
import { DELETED_NOTES_ARCHIVE_DATE, useNoteListWithFilter } from '@/entities/note'
import { useViewType } from '@/shared/hooks'
import { Icon } from '@/shared/ui'
import NoteList from './NoteList'
import NoteListItem from './NoteListItem'
import NoteListWithLabel from './NoteListWithLabel'
import NoteListWrapper from './NoteListWrapper'

function TrashComment() {
  const { viewType } = useViewType()

  return (
    <li>
      <p className="flex items-center justify-start break-keep px-0.5 text-sm text-gray400 transition-colors">
        {viewType === 'gallery' && <Icon.DangerCircleOutline className="mr-1 text-base" />}
        노트는 삭제한 시점으로부터 {DELETED_NOTES_ARCHIVE_DATE}일이 지나면 영구적으로 삭제돼요
      </p>
    </li>
  )
}

function TrashContainer({ children }: React.PropsWithChildren) {
  const noteList = useNoteListWithFilter((note) => !note.modifiable)
  const defaultSortSetting = useDefaultSortSetting()
  const sortedList = useMemo(() => {
    return noteList.sort(compareBySortType(defaultSortSetting))
  }, [noteList, defaultSortSetting])

  return (
    <NoteListWrapper length={noteList.length}>
      {children}
      <NoteListWithLabel prefix="Deleted" length={sortedList.length}>
        <NoteList
          list={sortedList}
          renderItem={(note, idx) => (
            <NoteListItem key={note.createAt} note={note} includedPath="/trash" index={idx} />
          )}
        />
      </NoteListWithLabel>
    </NoteListWrapper>
  )
}

export default function NoteListOfTrash() {
  return (
    <TrashContainer>
      <TrashComment />
    </TrashContainer>
  )
}
