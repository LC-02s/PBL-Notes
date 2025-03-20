import { useMemo } from 'react'
import { compareBySortType } from '@/features/change-sort-type'
import type { Folder, FolderPath } from '@/entities/folder'
import { useNoteListWithFilter, dividePinnedNoteList } from '@/entities/note'
import NoteList from './NoteList'
import NoteListItem from './NoteListItem'
import NoteListWithLabel from './NoteListWithLabel'
import NoteListWrapper from './NoteListWrapper'

interface IncludedNoteListProps {
  folder: Folder
  path: FolderPath
}

export default function NoteListOfIncluded({ folder, path }: IncludedNoteListProps) {
  const noteList = useNoteListWithFilter(
    (note) => note.modifiable && note.included === folder.id,
    [folder.id],
  )
  const { sortedAt, type } = folder.sort
  const sortedList = useMemo(() => {
    return noteList.sort(compareBySortType({ sortedAt, type }))
  }, [sortedAt, type, noteList])

  const { pinned, basic } = dividePinnedNoteList(sortedList)

  return (
    <NoteListWrapper length={noteList.length}>
      <NoteListWithLabel prefix="Pinned" length={pinned.length}>
        <NoteList
          list={pinned}
          renderItem={(note, idx) => (
            <NoteListItem key={note.createAt} note={note} includedPath={path} index={idx} />
          )}
        />
      </NoteListWithLabel>
      <NoteListWithLabel prefix="All" length={basic.length}>
        <NoteList
          list={basic}
          renderItem={(note, idx) => (
            <NoteListItem key={note.createAt} note={note} includedPath={path} index={idx} />
          )}
        />
      </NoteListWithLabel>
    </NoteListWrapper>
  )
}
