import { useMemo } from 'react'
import { useFolderDB } from './folderStore'

export default function useFolderList() {
  const folderDB = useFolderDB()

  return useMemo(() => [...folderDB.values()], [folderDB])
}
