import { create } from 'zustand'
import { getNow, reportOnError, reportOnSuccess } from '@/shared/utils'
import type { Folder, FolderDB } from '../types'
import { DEFAULT_NOTE_SORT_TYPE, DEFAULT_COLOR_CHIP } from '../constants'
import { convertFolderListToDB } from '../utils'

interface FolderStore {
  folderDB: FolderDB
  setFolderDB: (payload: FolderDB) => void

  folderSession: boolean
  setFolderSession: (payload: boolean) => void

  addFolder: (
    payload: Pick<Folder, 'name' | 'color'> & {
      onSuccess?: (id: Folder['id']) => void
      onFailed?: (id: Folder['id']) => void
    },
  ) => void
  modifyFolder: (payload: Pick<Folder, 'id'> & Partial<Folder>) => void
  deleteFolder: (payload: Pick<Folder, 'id'>) => void

  changeFolderIndex: (payload: { id: Folder['id']; destination: number }) => void
}

export const useFolderStore = create<FolderStore>((set) => ({
  folderDB: new Map(),
  setFolderDB: (folderDB) => set({ folderDB }),

  folderSession: false,
  setFolderSession: (folderSession) => set({ folderSession }),

  addFolder: ({ name, color = DEFAULT_COLOR_CHIP, onSuccess, onFailed }) =>
    set((prev) => {
      const { folderDB } = prev
      const id = getNow()

      if (folderDB.has(id)) {
        reportOnError('폴더 생성에 실패했어요')
        onFailed?.(id)

        return prev
      }

      folderDB.set(id, { id, name, color, sort: DEFAULT_NOTE_SORT_TYPE })
      reportOnSuccess('폴더가 생성되었어요!')
      onSuccess?.(id)

      return { folderDB: new Map(folderDB) }
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
