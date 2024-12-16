import { useFolderList } from '@/entities/folder'
import FolderItemOfUser from './FolderItemOfUser'

export default function FolderListOfUser() {
  const folderList = useFolderList()

  return (
    <li>
      <ul>
        {folderList.map((folder) => (
          <FolderItemOfUser key={folder.id} folder={folder} />
        ))}
      </ul>
    </li>
  )
}
