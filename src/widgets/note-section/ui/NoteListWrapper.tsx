import { useViewType } from '@/shared/hooks'
import { cn } from '@/shared/utils'

interface NoteListWrapperProps {
  length: number
}

function NoteListPlaceholder({ length, children }: React.PropsWithChildren<NoteListWrapperProps>) {
  if (length > 0) {
    return children
  }

  return (
    <li className="flex size-full flex-1 items-center justify-center">
      <p className="whitespace-nowrap text-base font-medium text-gray400 transition-colors">
        메모 없음
      </p>
    </li>
  )
}

export default function NoteListWrapper({
  length,
  children,
}: React.PropsWithChildren<NoteListWrapperProps>) {
  const { viewType } = useViewType()

  return (
    <ul
      className={cn(
        'h-full overflow-y-auto border-gray200 transition-colors',
        viewType === 'list'
          ? 'w-[calc(15rem+1px)] space-y-4 border-r p-3 pb-6'
          : 'w-full space-y-5 p-6 pb-12',
      )}
    >
      <NoteListPlaceholder length={length}>{children}</NoteListPlaceholder>
    </ul>
  )
}
