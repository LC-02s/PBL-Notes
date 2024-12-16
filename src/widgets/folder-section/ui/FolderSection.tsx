import { AddFolderButton } from '@/features/create-folder'
import FolderItemOfIndex from './FolderItemOfIndex'
import FolderItemOfTrash from './FolderItemOfTrash'
import FolderListOfUser from './FolderListOfUser'
import FolderTitle from './FolderTitle'

function FolderTop() {
  return (
    <div className="block h-auto w-full flex-1 overflow-y-auto">
      <div className="block h-auto w-full p-3">
        <FolderTitle />
        <ul>
          <FolderItemOfIndex />
          <FolderListOfUser />
          <FolderItemOfTrash />
        </ul>
      </div>
    </div>
  )
}

function FolderBottom() {
  return (
    <div className="block h-auto w-full p-3">
      <AddFolderButton />
    </div>
  )
}

export default function FolderSection() {
  return (
    <aside className="flex h-full w-60 flex-col items-stretch justify-between">
      <FolderTop />
      <FolderBottom />
    </aside>
  )
}
