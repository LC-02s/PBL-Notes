import React from 'react'
import {
  convertFolderListToNameMap,
  useFolderList,
  useFolderSession,
  useInitFolderData,
} from '@/entities/folder'
import { useInitNoteData } from '@/entities/note'
import { useBooleanState } from '@/shared/hooks'

export default function useLoadData() {
  const onceRef = React.useRef(false)
  const [isLoading, { setFalse: done }] = useBooleanState(true)

  const folderSession = useFolderSession()
  const folderList = useFolderList()
  const mapper = React.useMemo(() => convertFolderListToNameMap(folderList), [folderList])
  const { init } = useInitNoteData({ mapper, onEnd: done })

  useInitFolderData()

  React.useEffect(() => {
    if (folderSession && !onceRef.current) {
      init()
      onceRef.current = true
    }
  }, [folderSession, init])

  return { isLoading, folderSession }
}
