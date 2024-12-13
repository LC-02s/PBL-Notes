import type { Folder } from '@/entities/folder'
import type { Note } from '@/entities/note'
import { DEFAULT_SORT_TYPE, DEFAULT_SORTED_AT } from '@/shared/constants'
import type { SortType, SortedAt } from '@/shared/types'

type CompareCallbackKey = `${SortType}/${SortedAt}`

type CompareCallbackFactor = Record<CompareCallbackKey, (a: Note, b: Note) => number>

const compareFn: CompareCallbackFactor = {
  'create/desc': (a, b) => a.createAt - b.createAt,
  'create/asc': (a, b) => b.createAt - a.createAt,
  'update/desc': (a, b) => a.updateAt - b.updateAt,
  'update/asc': (a, b) => b.updateAt - a.updateAt,
  'title/desc': (a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0),
  'title/asc': (a, b) => (a.title < b.title ? 1 : a.title > b.title ? -1 : 0),
}

export default function compareBySortType({
  type = DEFAULT_SORT_TYPE,
  sortedAt = DEFAULT_SORTED_AT,
}: Partial<Folder['sort']>) {
  return compareFn[`${type}/${sortedAt}`]
}
