import { DEFAULT_SORT_TYPE, DEFAULT_SORTED_AT } from '@/shared/constants'
import type { Folder } from '../types'

const DEFAULT_NOTE_SORT_TYPE: Folder['sort'] = {
  type: DEFAULT_SORT_TYPE,
  sortedAt: DEFAULT_SORTED_AT,
}

export default DEFAULT_NOTE_SORT_TYPE
