import { useCallback, useEffect } from 'react'
import { useDocumentEvent, useWindowEvent } from '@/shared/lib'
import { reportOnError } from '@/shared/lib'
import { saveData } from '../lib'
import { useNoteSession } from './noteStore'
import useNoteList from './useNoteList'
import useSettingTempNote from './useSettingTempNote'

interface UseSaveNoteDataParams {
  onStart: () => void
  onEnd: () => void
}

export default function useAutoSaveNoteData({ onStart, onEnd }: UseSaveNoteDataParams) {
  const noteList = useNoteList()
  const noteSession = useNoteSession()

  const save = useCallback(() => {
    if (noteSession) {
      onStart()
      saveData(noteList)
        .catch((error) => {
          console.warn(error)
          reportOnError('노트 정보 저장에 실패했어요')
        })
        .finally(onEnd)
    }
  }, [noteSession, noteList, onStart, onEnd])

  useEffect(save, [noteSession, noteList, save])

  useSettingTempNote(noteSession)

  useWindowEvent('beforeunload', save)

  useDocumentEvent('visibilitychange', save)
}
