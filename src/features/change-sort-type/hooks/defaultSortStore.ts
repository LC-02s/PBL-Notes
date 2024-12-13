import { create } from 'zustand'
import type { Folder } from '@/entities/folder'
import { DEFAULT_SORT_TYPE, DEFAULT_SORTED_AT, LEGACY_DEFAULT_SORT_KEY } from '@/shared/constants'
import type { SortedAt, SortType } from '@/shared/types'
import { reportOnSuccess } from '@/shared/utils'

interface DefaultSortStore {
  sortType: SortType
  sortedAt: SortedAt
  setDefaultSort: (payload: Partial<Folder['sort']>) => void
}

function saveDefaultSortSetting({
  type,
  sortedAt,
}: Partial<Folder['sort']>): (store: DefaultSortStore) => Partial<DefaultSortStore> {
  return (prev) => {
    const store = { sortType: type || prev.sortType, sortedAt: sortedAt || prev.sortedAt }
    const data = JSON.stringify({ type: store.sortType, sortedAt: store.sortedAt })

    localStorage.setItem(LEGACY_DEFAULT_SORT_KEY, data)
    reportOnSuccess('기본 정렬 방식이 변경되었어요!')

    return store
  }
}

const defaultSortData = localStorage.getItem(LEGACY_DEFAULT_SORT_KEY) || '{}'
const defaultSortSetting: Partial<Folder['sort']> = JSON.parse(defaultSortData)

export const useDefaultSortStore = create<DefaultSortStore>((set) => ({
  sortType: defaultSortSetting.type || DEFAULT_SORT_TYPE,
  sortedAt: defaultSortSetting.sortedAt || DEFAULT_SORTED_AT,
  setDefaultSort: (payload) => set(saveDefaultSortSetting(payload)),
}))

export const useDefaultSortSetting = () => ({
  type: useDefaultSortStore((store) => store.sortType),
  sortedAt: useDefaultSortStore((store) => store.sortedAt),
})
