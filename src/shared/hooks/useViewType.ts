import { create } from 'zustand'
import type { ViewType } from '../types'
import { VIEW_TYPE_KEY } from '../constants'

interface ThemeStore {
  viewType: ViewType
  setViewType: (viewType: ViewType) => void
}

function saveViewType(viewType: ViewType) {
  localStorage.setItem(VIEW_TYPE_KEY, viewType)

  return { viewType }
}

const useViewTypeStore = create<ThemeStore>((set) => ({
  viewType: (localStorage.getItem(VIEW_TYPE_KEY) as ViewType | null) || 'list',
  setViewType: (viewType) => set(saveViewType(viewType)),
}))

export default function useViewType() {
  return useViewTypeStore()
}
