import React from 'react'
import { saveAs } from 'file-saver'
import type { Note } from '@/entities/note'
import { Button, Icon } from '@/shared/ui'
import { formatDate, reportOnError, reportOnSuccess } from '@/shared/utils'

interface SaveAsMarkdownButtonProps {
  note: Note
  onClose: () => void
}

export default function SaveAsMarkdownButton({ note, onClose }: SaveAsMarkdownButtonProps) {
  const save = React.useCallback(() => {
    try {
      const name = note.title || formatDate(note.createAt)
      const file = new Blob([note.markdown], { type: 'text/markdown;charset=utf-8' })

      saveAs(file, `${name}.md`)
      reportOnSuccess('노트 내용이 저장되었어요!')
    } catch {
      reportOnError('노트 내용 저장에 실패했어요')
    } finally {
      onClose()
    }
  }, [note, onClose])

  return (
    <li>
      <Button
        title="노트 내용 다운로드 (markdown)"
        variant="light"
        className="w-full justify-start space-x-2 p-1.5 pl-3"
        onClick={save}
      >
        <Icon.DownloadMinimalisticOutline className="text-xl" />
        <span>노트 내용 다운로드</span>
      </Button>
    </li>
  )
}
