import type { ViewType } from '../model'

export const DEFAULT_VIEW_TYPE: ViewType = 'list'

export const VIEW_TYPE_LABEL: Record<ViewType, string> = {
  list: '목록형 보기',
  gallery: '갤러리형 보기',
}

export const VIEW_TYPE_KEY = 'view'
