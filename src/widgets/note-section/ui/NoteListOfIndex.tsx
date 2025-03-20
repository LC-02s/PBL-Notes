import { useMemo } from 'react'
import { useDefaultSortSetting, compareBySortType } from '@/features/change-sort-type'
import { useNoteListWithFilter, dividePinnedNoteList } from '@/entities/note'
import NoteList from './NoteList'
import NoteListItemWithFolder from './NoteListItemWithFolder'
import NoteListWithLabel from './NoteListWithLabel'
import NoteListWrapper from './NoteListWrapper'

export default function NoteListOfIndex() {
  const noteList = useNoteListWithFilter((note) => note.modifiable)
  const { sortedAt, type } = useDefaultSortSetting()
  const sortedList = useMemo(() => {
    return noteList.sort(compareBySortType({ sortedAt, type }))
  }, [noteList, sortedAt, type])

  const { pinned, basic } = dividePinnedNoteList(sortedList)

  return (
    <NoteListWrapper length={noteList.length}>
      <NoteListWithLabel prefix="Pinned" length={pinned.length}>
        <NoteList
          list={pinned}
          renderItem={(note, idx) => (
            <NoteListItemWithFolder key={note.createAt} note={note} index={idx} />
          )}
        />
      </NoteListWithLabel>
      <NoteListWithLabel prefix="All" length={basic.length}>
        <NoteList
          list={basic}
          renderItem={(note, idx) => (
            <NoteListItemWithFolder key={note.createAt} note={note} index={idx} />
          )}
        />
      </NoteListWithLabel>
    </NoteListWrapper>
  )
}
