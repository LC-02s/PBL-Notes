import { useParams } from 'react-router'
import { useFolderDB } from './folderStore'

export default function useActiveFolder() {
  const { folderId } = useParams()
  const folderDB = useFolderDB()
  const targetId = +(folderId || -1)
  const folder = folderDB.get(targetId) ?? null

  return { folder }
}
