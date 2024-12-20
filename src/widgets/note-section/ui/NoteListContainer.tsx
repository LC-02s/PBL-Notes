import { useLocation } from 'react-router'
import { TRASH_PATH, useActiveFolder } from '@/entities/folder'
import NoteListOfIncluded from './NoteListOfIncluded'
import NoteListOfIndex from './NoteListOfIndex'
import NoteListOfTrash from './NoteListOfTrash'

export default function NoteListContainer() {
  const { pathname } = useLocation()
  const { folder, path } = useActiveFolder()

  if (pathname.startsWith(TRASH_PATH)) {
    return <NoteListOfTrash />
  }

  if (!folder || !path) {
    return <NoteListOfIndex />
  }

  return <NoteListOfIncluded folder={folder} path={path} />
}
