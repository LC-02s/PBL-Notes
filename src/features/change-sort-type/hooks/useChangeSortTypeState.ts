import React from 'react'
import { useActiveFolder, useModifyFolder } from '@/entities/folder'
import { DEFAULT_SORT_TYPE, DEFAULT_SORTED_AT } from '@/shared/constants'
import type { SortedAt, SortType } from '@/shared/types'
import { useDefaultSortSetting, useDefaultSortStore } from './defaultSortStore'

export default function useChangeSortTypeState() {
  const { folder } = useActiveFolder()
  const modifyFolder = useModifyFolder()

  const defaultSortSetting = useDefaultSortSetting()
  const setDefaultSortSetting = useDefaultSortStore((store) => store.setDefaultSort)

  const [sortType, setSortType] = React.useState(DEFAULT_SORT_TYPE)
  const [sortedAt, setSortedAt] = React.useState(DEFAULT_SORTED_AT)

  const submitSortType = React.useCallback(
    (value: SortType) => {
      setSortType(value)

      if (!folder) {
        setDefaultSortSetting({ type: value })
        return
      }

      modifyFolder({ id: folder.id, sort: { type: value, sortedAt } })
    },
    [folder, modifyFolder, sortedAt, setDefaultSortSetting],
  )

  const submitSortedAt = React.useCallback(
    (value: SortedAt) => {
      setSortedAt(value)

      if (!folder) {
        setDefaultSortSetting({ sortedAt: value })
        return
      }

      modifyFolder({ id: folder.id, sort: { type: sortType, sortedAt: value } })
    },
    [folder, modifyFolder, sortType, setDefaultSortSetting],
  )

  React.useEffect(() => {
    const target = !folder ? defaultSortSetting : folder.sort

    setSortType(target.type)
    setSortedAt(target.sortedAt)
  }, [folder, defaultSortSetting])

  return { sortType, submitSortType, sortedAt, submitSortedAt }
}
