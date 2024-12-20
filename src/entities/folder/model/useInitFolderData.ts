import { useEffect } from 'react'
import { reportOnError } from '@/shared/lib'
import { convertFolderListToDB, getInitialData } from '../lib'
import { useFolderStore } from './store'

export default function useInitFolderData() {
  const setFolderDB = useFolderStore((store) => store.setFolderDB)
  const setFolderSession = useFolderStore((store) => store.setFolderSession)

  useEffect(() => {
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
