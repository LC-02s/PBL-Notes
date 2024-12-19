import { useMemo } from 'react'
import { useParams } from 'react-router'
import type { FolderPath } from '@/shared/types'
import { useFolderDB } from './folderStore'

export default function useActiveFolder() {
  const { folderId } = useParams()
  const targetId = +(folderId || -1)

  const folderDB = useFolderDB()
  const folder = useMemo(() => folderDB.get(targetId) ?? null, [folderDB, targetId])

  const path = folder ? (`/folder/${folder.id}` satisfies FolderPath) : null

  return { folder, path }
}
