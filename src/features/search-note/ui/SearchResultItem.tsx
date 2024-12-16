import React from 'react'
import { Link } from 'react-router'
import type { Note } from '@/entities/note'
import { TRASH_PATH } from '@/shared/constants'
import type { FolderPath, NotePath } from '@/shared/types'

interface SearchResultItemProps {
  note: Note
  focus: boolean
  reset: () => void
}

export default function SearchResultItem({
  note,
  focus: isFocusing,
  reset,
}: SearchResultItemProps) {
  const anchorRef = React.useRef<HTMLAnchorElement | null>(null)

  const path = React.useMemo(() => {
    const withIncluded = !note.included ? '' : (`/folder/${note.included}` satisfies FolderPath)
    const targetPathKey = note.modifiable ? withIncluded : TRASH_PATH
    const notePath = `/note/${note.createAt}` satisfies NotePath

    return `${targetPathKey}${notePath}`
  }, [note])

  React.useEffect(() => {
    if (isFocusing) {
      anchorRef.current?.focus()
    }
  }, [isFocusing])

  return (
    <li>
      <Link
        ref={anchorRef}
        to={path}
        title={`노트 바로가기: ${note.title}`}
        className="block truncate rounded px-2 py-1 transition-colors hover:bg-gray100 focus:bg-gray100 active:bg-gray100"
        onClick={reset}
      >
        {note.title}
      </Link>
    </li>
  )
}
