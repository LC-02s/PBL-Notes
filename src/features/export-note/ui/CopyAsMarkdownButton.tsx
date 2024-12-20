import { useCallback } from 'react'
import type { Note } from '@/entities/note'
import { copyToClipboard, reportOnError, reportOnSuccess } from '@/shared/lib'
import { Button, Icon } from '@/shared/ui'

interface CopyAsMarkdownButtonProps {
  note: Note
  onClose: () => void
}

export default function CopyAsMarkdownButton({ note, onClose }: CopyAsMarkdownButtonProps) {
  const copy = useCallback(async () => {
    const status = await copyToClipboard(note.markdown)

    if (!status) {
      reportOnError('노트 내용 복사에 실패했어요')
      return
    }

    reportOnSuccess('노트 내용이 복사되었어요!')
    onClose()
  }, [note, onClose])

  return (
    <li>
      <Button
        title="노트 내용 복사하기 (markdown)"
        variant="light"
        className="w-full justify-start space-x-2 p-1.5 pl-3"
        onClick={copy}
      >
        <Icon.CopyOutline className="mx-px text-lg" />
        <span>노트 내용 복사하기</span>
      </Button>
    </li>
  )
}
