import { useState, useCallback, useRef, useEffect } from 'react'
import { useNoteListWithFilter } from '@/entities/note'
import { useBooleanState, useDebounce, useOutsideClick, useWindowEvent } from '@/shared/lib'
import { DropdownWrapper, Icon, TextInput } from '@/shared/ui'
import ResetButton from './ResetButton'
import SearchResult from './SearchResult'

export default function SearchBar() {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)
  const hasKeyword = !!keyword
  const reset = useCallback(() => setKeyword(''), [])

  const resultList = useNoteListWithFilter(
    (note) => note.markdown.includes(debouncedKeyword),
    [debouncedKeyword],
  )

  const [isFocus, { setTrue: focus, setFalse: blur }] = useBooleanState()
  const isOpen = isFocus && hasKeyword

  const [focusIndex, setFocusIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(blur)

  const focusPrev = useCallback(() => {
    setFocusIndex((prev) => {
      if (prev <= 0) {
        inputRef.current?.focus()
        return -1
      }

      return prev - 1
    })
  }, [])

  const focusNext = useCallback(() => {
    setFocusIndex((prev) => {
      if (prev >= resultList.length - 1) {
        inputRef.current?.focus()
        return -1
      }

      return prev + 1
    })
  }, [resultList])

  useEffect(() => setFocusIndex(-1), [keyword])

  useWindowEvent('keydown', (e) => {
    if (!isOpen) return

    if (e.key === 'Escape' || e.key === 'Tab') {
      e.preventDefault()
      setFocusIndex(-1)
      blur()
      inputRef.current?.blur()
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusPrev()
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusNext()
    }
  })

  return (
    <div ref={containerRef} className="relative w-full min-w-40 max-w-72">
      <Icon.MagnifierOutline className="absolute inset-y-0 left-2 my-auto text-gray500 transition-colors" />
      <TextInput
        ref={inputRef}
        className="h-8 rounded bg-gray100 pl-8 pr-6 text-sm focus:bg-gray000"
        value={keyword}
        placeholder="검색어를 입력해주세요"
        onChange={(e) => setKeyword(e.currentTarget.value)}
        onFocus={focus}
      />
      <ResetButton mount={hasKeyword} reset={reset} />
      <DropdownWrapper
        open={isOpen}
        className="inset-x-0 flex max-h-[32vh] min-h-60 flex-col items-stretch justify-start overflow-y-auto p-2"
      >
        <SearchResult
          keyword={keyword}
          debouncedKeyword={debouncedKeyword}
          resultList={resultList}
          focusIndex={focusIndex}
          reset={reset}
        />
      </DropdownWrapper>
    </div>
  )
}
