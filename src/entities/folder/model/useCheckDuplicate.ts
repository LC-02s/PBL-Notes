import type { Folder } from './interface'
import useFolderList from './useFolderList'

export default function useCheckDuplicate() {
  const folderList = useFolderList()

  return (value: Folder['name'], exception?: Folder['name']) => {
    if (!exception) {
      return folderList.some(({ name }) => name === value)
    }

    return folderList.some(({ name }) => name !== exception && name === value)
  }
}
