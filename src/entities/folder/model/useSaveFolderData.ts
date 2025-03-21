import { useEffect } from 'react'
import { reportOnError } from '@/shared/lib'
import { saveData } from '../lib'
import { useFolderSession } from './store'
import useFolderList from './useFolderList'

interface UseSaveFolderDataParams {
  onStart: () => void
  onEnd: () => void
}

export default function useAutoSaveFolderData({ onStart, onEnd }: UseSaveFolderDataParams) {
  const folderList = useFolderList()
  const folderSession = useFolderSession()

  useEffect(() => {
    if (folderSession) {
      onStart()
      saveData(folderList)
        .catch((error) => {
          console.warn(error)
          reportOnError('폴더 정보 저장에 실패했어요')
        })
        .finally(onEnd)
    }
  }, [folderSession, folderList, onStart, onEnd])
}
