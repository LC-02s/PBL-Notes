import { create } from 'zustand'
import type { ViewType } from '../types'
import { DEFAULT_VIEW_TYPE, VIEW_TYPE_KEY, VIEW_TYPE_LABEL } from '../constants'
import { reportOnSuccess } from '../utils'

interface ThemeStore {
  viewType: ViewType
  setViewType: (viewType: ViewType) => void
}

function saveViewType(viewType: ViewType) {
  localStorage.setItem(VIEW_TYPE_KEY, viewType)
  reportOnSuccess(`${VIEW_TYPE_LABEL[viewType]}로 변경되었어요!`)

  return { viewType }
}

const useViewTypeStore = create<ThemeStore>((set) => ({
  viewType: (localStorage.getItem(VIEW_TYPE_KEY) as ViewType | null) || DEFAULT_VIEW_TYPE,
  setViewType: (viewType) => set(saveViewType(viewType)),
}))

export default function useViewType() {
  return useViewTypeStore()
}
