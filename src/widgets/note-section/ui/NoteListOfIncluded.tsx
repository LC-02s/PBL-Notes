import React from 'react'
import { compareBySortType } from '@/features/change-sort-type'
import type { Folder } from '@/entities/folder'
import { useNoteListWithFilter, useDividePinnedNoteList } from '@/entities/note'
import type { FolderPath } from '@/shared/types'
import NoteList from './NoteList'
import NoteListItem from './NoteListItem'
import NoteListWithLabel from './NoteListWithLabel'
import NoteListWrapper from './NoteListWrapper'

interface IncludedNoteListProps {
  folder: Folder
  path: FolderPath
}

export default function NoteListOfIncluded({ folder, path }: IncludedNoteListProps) {
  const noteList = useNoteListWithFilter((note) => note.modifiable && note.included === folder.id)
  const sortedList = React.useMemo(() => {
    return noteList.sort(compareBySortType(folder.sort))
  }, [folder, noteList])

  const { pinned, basic } = useDividePinnedNoteList(sortedList)

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
