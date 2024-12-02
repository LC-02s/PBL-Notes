import React from 'react'
import { useFolderDB } from './folderStore'

export default function useFolderList() {
  const folderDB = useFolderDB()

  return React.useMemo(() => [...folderDB.values()], [folderDB])
}
