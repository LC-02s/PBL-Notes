import { create } from 'zustand'
import { reportOnSuccess } from '@/shared/lib'
import type { ViewType } from './interface'
import { DEFAULT_VIEW_TYPE, VIEW_TYPE_KEY, VIEW_TYPE_LABEL } from '../config'

interface ViewTypeStore {
  viewType: ViewType
  setViewType: (viewType: ViewType) => void
}

function saveViewType(viewType: ViewType) {
  localStorage.setItem(VIEW_TYPE_KEY, viewType)
  reportOnSuccess(`${VIEW_TYPE_LABEL[viewType]}로 변경되었어요!`)

  return { viewType }
}

export const useViewType = create<ViewTypeStore>((set) => ({
  viewType: (localStorage.getItem(VIEW_TYPE_KEY) as ViewType | null) || DEFAULT_VIEW_TYPE,
  setViewType: (viewType) => set(saveViewType(viewType)),
}))
