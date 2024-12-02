import { create } from 'zustand'
import { DEFAULT_COLOR_CHIP } from '@/shared/constants'
import { reportOnError, reportOnSuccess } from '@/shared/utils'
import type { Folder, FolderDB } from '../types'
import { DEFAULT_NOTE_SORT_TYPE } from '../constants'
import { convertFolderListToDB } from '../utils'

interface FolderStore {
  folderDB: FolderDB
  setFolderDB: (payload: FolderDB) => void

  folderSession: boolean
  setFolderSession: (payload: boolean) => void

  addFolder: (payload: Pick<Folder, 'name' | 'color'>) => void
  modifyFolder: (payload: Pick<Folder, 'id'> & Partial<Folder>) => void
  deleteFolder: (payload: Pick<Folder, 'id'>) => void

  changeFolderIndex: (payload: { id: Folder['id']; destination: number }) => void
}

export const useFolderStore = create<FolderStore>((set) => ({
  folderDB: new Map(),
  setFolderDB: (folderDB) => set({ folderDB }),

  folderSession: false,
  setFolderSession: (folderSession) => set({ folderSession }),

  addFolder: ({ name, color = DEFAULT_COLOR_CHIP }) =>
    set((prev) => {
      const clonedDB = new Map(prev.folderDB)
      const id = new Date().getTime()

      clonedDB.set(id, { id, name, color, sort: DEFAULT_NOTE_SORT_TYPE })
      reportOnSuccess('폴더가 생성되었어요!')

      return { folderDB: clonedDB }
    }),

  modifyFolder: ({ id, ...folder }) =>
    set((prev) => {
      const { folderDB } = prev
      const targetFolder = folderDB.get(id)

      if (!targetFolder) {
        reportOnError('폴더 정보 수정에 실패했어요')

        return prev
      }

      folderDB.set(id, { ...targetFolder, ...folder })
      reportOnSuccess('폴더 정보가 수정되었어요!')

      return { folderDB: new Map(folderDB) }
    }),

  deleteFolder: ({ id: targetId }) =>
    set((prev) => {
      const { folderDB } = prev
      const success = folderDB.delete(targetId)

      if (!success) {
        reportOnError('폴더 삭제에 실패했어요')

        return prev
      }

      reportOnSuccess('폴더가 삭제되었어요!')

      return { folderDB: new Map(folderDB) }
    }),

  changeFolderIndex: ({ id: targetId, destination }) =>
    set((prev) => {
      const { folderDB } = prev
      const targetFolder = folderDB.get(targetId)

      if (!targetFolder) {
        reportOnError('폴더 재 정렬에 실패했어요')

        return prev
      }

      const folderList = [...folderDB.values()]
      const targetIndex = folderList.findIndex(({ id }) => id === targetFolder.id)
      const [tempFolder] = folderList.splice(targetIndex, 1)

      folderList.splice(destination, 0, tempFolder)
      reportOnSuccess('폴더가 정렬되었어요!')

      return { folderDB: convertFolderListToDB(folderList) }
    }),
}))

export const useFolderDB = () => useFolderStore((store) => store.folderDB)

export const useFolderSession = () => useFolderStore((store) => store.folderSession)

export const useAddFolder = () => useFolderStore((store) => store.addFolder)

export const useModifyFolder = () => useFolderStore((store) => store.modifyFolder)

export const useDeleteFolder = () => useFolderStore((store) => store.deleteFolder)

export const useChangeFolderIndex = () => useFolderStore((store) => store.changeFolderIndex)
