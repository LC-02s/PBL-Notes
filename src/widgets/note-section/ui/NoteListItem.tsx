import { Link } from 'react-router'
import { motion } from 'motion/react'
import { type Note, useActiveNoteId, useTempNote } from '@/entities/note'
import type {
  NotePathInFolder,
  NotePathInTrash,
  NotePath,
  FolderPath,
  TrashPath,
} from '@/shared/types'
import { Icon } from '@/shared/ui'
import { cn, formatDateFromNow } from '@/shared/utils'
import { DEFAULT_NOTE_TITLE } from '../constants'

interface NoteListItemTitleProps {
  defaultTitle: string
}

function NoteListItemTitle({ defaultTitle }: NoteListItemTitleProps) {
  const tempNote = useTempNote()

  if (!tempNote || !tempNote.title) {
    return <>{defaultTitle}</>
  }

  return <>{tempNote.title}</>
}

interface NoteListItemWrapperProps {
  index: number
}

function NoteListItemWrapper({
  index,
  children,
}: React.PropsWithChildren<NoteListItemWrapperProps>) {
  return (
    <motion.li
      initial={{ y: '-24%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.1, delay: index * 0.06 }}
    >
      {children}
    </motion.li>
  )
}

type TargetNotePath = NotePathInFolder | NotePathInTrash | NotePath

interface NoteListItemProps extends NoteListItemWrapperProps {
  includedPath?: FolderPath | TrashPath
  note: Note
}

export default function NoteListItem({
  note,
  index,
  includedPath,
  children,
}: React.PropsWithChildren<NoteListItemProps>) {
  const active = useActiveNoteId()
  const isActiveNote = note.createAt === active.noteId
  const title = note.title || DEFAULT_NOTE_TITLE

  return (
    <NoteListItemWrapper index={index}>
      <Link
        to={`${includedPath ?? ''}/note/${note.createAt}` satisfies TargetNotePath}
        title={`노트 보기: ${title}`}
        className={cn(
          'block w-full rounded border border-gray200 px-3 py-2 transition-colors',
          isActiveNote && 'border-gray100 bg-gray100',
        )}
        onClick={(e) => {
          if (isActiveNote) e.preventDefault()
        }}
      >
        <h4
          className={cn(
            'w-full truncate text-base font-medium text-gray700 transition-colors',
            note.isPinned && 'relative pl-5',
          )}
        >
          {isActiveNote ? <NoteListItemTitle defaultTitle={title} /> : title}
          {note.isPinned && (
            <Icon.PinBold className="absolute left-0 top-1 -scale-x-100 text-sm text-gray500 transition-colors" />
          )}
        </h4>
        <p className="mt-2 flex w-full flex-wrap items-center justify-start gap-x-2 gap-y-1">
          {children}
          <span className="whitespace-nowrap text-sm text-gray400 transition-colors">
            {formatDateFromNow(note.updateAt)}
          </span>
        </p>
      </Link>
    </NoteListItemWrapper>
  )
}
