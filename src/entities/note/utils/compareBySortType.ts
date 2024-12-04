import { DEFAULT_SORT_TYPE, DEFAULT_SORTED_AT } from '@/shared/constants'
import type { SortType, SortedAt } from '@/shared/types'
import type { Note } from '../types'

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

interface CompareBySortTypeParams {
  sortType?: SortType
  sortedAt?: SortedAt
}

export default function compareBySortType({
  sortType = DEFAULT_SORT_TYPE,
  sortedAt = DEFAULT_SORTED_AT,
}: CompareBySortTypeParams) {
  return compareFn[`${sortType}/${sortedAt}`]
}
