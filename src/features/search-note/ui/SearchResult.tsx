import type { Note } from '@/entities/note'
import { Icon } from '@/shared/ui'
import SearchResultItem from './SearchResultItem'

interface SearchResultProps {
  keyword: string
  debouncedKeyword: string
  focusIndex: number
  resultList: Note[]
  reset: () => void
}

export default function SearchResult({
  keyword,
  debouncedKeyword,
  focusIndex,
  resultList,
  reset,
}: SearchResultProps) {
  if (keyword !== debouncedKeyword) {
    return (
      <li className="flex size-full flex-1 items-center justify-center pb-3">
        <Icon.BarsRotateFadeSpinner className="text-2xl text-gray500 transition-colors" />
      </li>
    )
  }

  if (resultList.length <= 0) {
    return (
      <li className="flex size-full flex-1 items-center justify-center pb-3">
        <p className="break-keep text-sm font-medium text-gray500 transition-colors">
          검색 결과가 없어요 ㅠ
        </p>
      </li>
    )
  }

  return resultList.map((note, idx) => (
    <SearchResultItem key={note.createAt} note={note} focus={idx === focusIndex} reset={reset} />
  ))
}
