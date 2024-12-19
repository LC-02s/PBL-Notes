import { useCallback } from 'react'
import { useModifyNote, useActiveNote } from '@/entities/note'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'
import { cn, reportOnError, reportOnSuccess } from '@/shared/utils'

const onSuccess = (isLocked: boolean) =>
  reportOnSuccess(isLocked ? '노트 잠금이 해제되었어요!' : '노트가 잠겼어요!')

const onFailed = () => reportOnError('노트 잠금에 실패했어요')

export default function LockNoteButton() {
  const { note } = useActiveNote()
  const modifyNote = useModifyNote()

  const isLocked = !!note && note.modifiable && note.isLocked
  const isDisabled = !note || !note.modifiable

  const toggle = useCallback(() => {
    if (note) {
      modifyNote({
        createAt: note.createAt,
        isLocked: !note.isLocked,
        onSuccess: () => onSuccess(isLocked),
        onFailed,
      })
    }
  }, [note, isLocked, modifyNote])

  return (
    <MenuButton
      title={isLocked ? '잠금 해제' : '노트 잠금'}
      active={isLocked}
      disabled={isDisabled}
      onClick={toggle}
    >
      <Icon.UnlockedOutline
        className={cn(
          'absolute inset-0 m-auto opacity-100 transition-opacity',
          isLocked && 'opacity-0',
        )}
      />
      <Icon.LockBold
        className={cn(
          'absolute inset-0 m-auto opacity-0 transition-opacity',
          isLocked && 'opacity-100',
        )}
      />
      <HiddenText>{isLocked ? '잠금 해제' : '노트 잠금'}</HiddenText>
    </MenuButton>
  )
}
