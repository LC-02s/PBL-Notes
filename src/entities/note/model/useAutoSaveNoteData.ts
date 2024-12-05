import React from 'react'
import { reportOnError } from '@/shared/utils'
import { useDocumentEvent, useWindowEvent } from '@/shared/hooks'
import { saveData } from '../utils'
import useNoteList from './useNoteList'
import useSettingTempNote from './useSettingTempNote'

interface UseSaveNoteDataParams {
  onStart: () => void
  onEnd: () => void
}

export default function useAutoSaveNoteData({ onStart, onEnd }: UseSaveNoteDataParams) {
  const noteList = useNoteList()
  const { note } = useSettingTempNote()

  const save = React.useCallback(() => {
    onStart()
    saveData(noteList)
      .catch((error) => {
        console.warn(error)
        reportOnError('노트 정보 저장에 실패했어요')
      })
      .finally(onEnd)
  }, [noteList, onStart, onEnd])

  React.useEffect(save, [noteList, save])

  useWindowEvent('beforeunload', (e) => {
    if (!note || !note.modifiable || note.isLocked) return

    save()
    e.preventDefault()
    e.returnValue = ''
  })

  useDocumentEvent('visibilitychange', () => {
    if (!note || !note.modifiable || note.isLocked) return

    if (document.visibilityState === 'hidden') {
      save()
    }
  })
}
