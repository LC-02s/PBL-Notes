import { useRef, useMemo, useEffect } from 'react'
import {
  convertFolderListToNameMap,
  useFolderList,
  useFolderSession,
  useInitFolderData,
} from '@/entities/folder'
import { useInitNoteData } from '@/entities/note'
import { useBooleanState } from '@/shared/lib'

export default function useLoadData() {
  const onceRef = useRef(false)
  const [isLoading, { setFalse: done }] = useBooleanState(true)

  const folderSession = useFolderSession()
  const folderList = useFolderList()
  const mapper = useMemo(() => convertFolderListToNameMap(folderList), [folderList])
  const { init } = useInitNoteData({ mapper, onEnd: done })

  useInitFolderData()

  useEffect(() => {
    if (folderSession && !onceRef.current) {
      init()
      onceRef.current = true
    }
  }, [folderSession, init])

  return { isLoading, folderSession }
}
