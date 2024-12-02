import React from 'react'
import { reportOnError } from '@/shared/utils'
import { convertFolderListToDB, getInitialData } from '../utils'
import { useFolderStore } from './folderStore'

export default function useInitFolderData() {
  const setFolderDB = useFolderStore((store) => store.setFolderDB)
  const setFolderSession = useFolderStore((store) => store.setFolderSession)

  React.useEffect(() => {
    getInitialData()
      .then(convertFolderListToDB)
      .then(setFolderDB)
      .then(() => setFolderSession(true))
      .catch((error) => {
        console.warn(error)
        reportOnError('폴더 데이터를 불러오는데 실패했어요')
        setFolderSession(false)
      })
  }, [setFolderDB, setFolderSession])
}
