import { FolderDeleteButton } from '@/features/delete-folder'
import { DataLoader } from '@/features/load-data'
import { ModifyFolderButton } from '@/features/modify-folder'

export default function FolderTitle() {
  return (
    <div className="mb-2 flex h-auto w-full items-center justify-between space-x-6">
      <h1 className="flex w-auto items-center justify-start space-x-2">
        <span className="whitespace-nowrap text-sm font-medium text-gray700 transition-colors">
          My Notes
        </span>
        <DataLoader />
      </h1>
      <ModifyFolderButton deleteButton={FolderDeleteButton} />
    </div>
  )
}
