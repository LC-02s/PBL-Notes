import React from 'react'
import { reportOnError } from '@/shared/utils'
import {
  convertNoteListToDB,
  filterDeletedNotesOutOfDate,
  getInitialData,
  legacyNoteMapper,
} from '../utils'
import { useNoteStore } from './noteStore'

export default function useInitNoteData({
  mapper,
  onEnd,
}: {
  mapper: Map<string, number>
  onEnd?: () => void
}) {
  const setNoteDB = useNoteStore((store) => store.setNoteDB)
  const setNoteSession = useNoteStore((store) => store.setNoteSession)

  const init = React.useCallback(() => {
    setNoteSession(false)
    getInitialData()
      .then((data) => legacyNoteMapper(data, mapper))
      .then(filterDeletedNotesOutOfDate)
      .then(convertNoteListToDB)
      .then(setNoteDB)
      .then(() => setNoteSession(true))
      .catch((error) => {
        console.warn(error)
        reportOnError('노트 데이터를 불러오는데 실패했어요')
        setNoteSession(false)
      })
      .finally(onEnd)
  }, [setNoteDB, setNoteSession, mapper, onEnd])

  return { init }
}
