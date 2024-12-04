import { useParams } from 'react-router'
import type { FolderPath } from '@/shared/types'
import { useFolderDB } from './folderStore'

export default function useActiveFolder() {
  const { folderId } = useParams()
  const folderDB = useFolderDB()
  const targetId = +(folderId || -1)
  const folder = folderDB.get(targetId) ?? null
  const path: FolderPath | null = folder ? `/folder/${folder.id}` : null

  return { folder, path }
}
