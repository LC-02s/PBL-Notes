import React from 'react'
import { reportOnError } from '@/shared/utils'
import { saveData } from '../utils'
import useNoteList from './useNoteList'
import useSettingTempNote from './useSettingTempNote'

interface UseSaveNoteDataParams {
  onStart: () => void
  onEnd: () => void
}

export default function useAutoSaveNoteData({ onStart, onEnd }: UseSaveNoteDataParams) {
  const noteList = useNoteList()

  useSettingTempNote()

  React.useEffect(() => {
    onStart()
    saveData(noteList)
      .catch((error) => {
        console.warn(error)
        reportOnError('노트 정보 저장에 실패했어요')
      })
      .finally(onEnd)
  }, [noteList, onStart, onEnd])
}
