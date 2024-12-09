import React from 'react'
import { reportOnError } from '@/shared/utils'
import { saveData } from '../utils'
import { useFolderSession } from './folderStore'
import useFolderList from './useFolderList'

interface UseSaveFolderDataParams {
  onStart: () => void
  onEnd: () => void
}

export default function useAutoSaveFolderData({ onStart, onEnd }: UseSaveFolderDataParams) {
  const folderList = useFolderList()
  const folderSession = useFolderSession()

  React.useEffect(() => {
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
