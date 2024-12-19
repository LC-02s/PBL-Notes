import { useCallback } from 'react'
import { useModifyNote, useActiveNote } from '@/entities/note'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'
import { cn, reportOnError, reportOnSuccess } from '@/shared/utils'

const onSuccess = (isPinned: boolean) =>
  reportOnSuccess(isPinned ? '노트 고정이 해제되었어요!' : '노트가 고정되었어요!')

const onFailed = () => reportOnError('노트 고정에 실패했어요')

export default function PinNoteButton() {
  const { note } = useActiveNote()
  const modifyNote = useModifyNote()

  const isPinned = !!note && note.modifiable && note.isPinned
  const isDisabled = !note || !note.modifiable

  const toggle = useCallback(() => {
    if (note) {
      modifyNote({
        createAt: note.createAt,
        isPinned: !note.isPinned,
        onSuccess: () => onSuccess(isPinned),
        onFailed,
      })
    }
  }, [note, isPinned, modifyNote])

  return (
    <MenuButton
      title={isPinned ? '고정 해제' : '노트 고정'}
      active={isPinned}
      disabled={isDisabled}
      onClick={toggle}
    >
      <Icon.PinOutline
        className={cn(
          'absolute inset-0 m-auto opacity-100 transition-opacity',
          isPinned && 'opacity-0',
        )}
      />
      <Icon.PinBold
        className={cn(
          'absolute inset-0 m-auto opacity-0 transition-opacity',
          isPinned && 'opacity-100',
        )}
      />
      <HiddenText>{isPinned ? '고정 해제' : '노트 고정'}</HiddenText>
    </MenuButton>
  )
}
