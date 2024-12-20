import type { Folder, FolderDB, FolderNameMap } from '../model'

export function convertFolderListToDB(folderList: Folder[]) {
  return folderList.reduce<FolderDB>((db, folder) => {
    return db.set(folder.id, folder)
  }, new Map())
}

export function convertFolderListToNameMap(folderList: Folder[]) {
  return folderList.reduce<FolderNameMap>((map, folder) => {
    return map.set(folder.name, folder.id)
  }, new Map())
}
