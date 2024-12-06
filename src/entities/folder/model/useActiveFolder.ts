import React from 'react'
import { useParams } from 'react-router'
import type { FolderPath } from '@/shared/types'
import { useFolderDB, useFolderSession } from './folderStore'

export default function useActiveFolder() {
  const { folderId } = useParams()
  const targetId = +(folderId || -1)

  const folderDB = useFolderDB()
  const folder = React.useMemo(() => folderDB.get(targetId) ?? null, [folderDB, targetId])

  const path = folder ? (`/folder/${folder.id}` satisfies FolderPath) : null

  const folderSession = useFolderSession()
  const isNotFound = React.useMemo(() => {
    return folderSession && !folderDB.has(targetId)
  }, [folderSession, folderDB, targetId])

  return { folder, path, isNotFound }
}
