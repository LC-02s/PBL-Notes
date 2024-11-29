import React from 'react'
import Dialog from './Dialog'
import type { DialogButtonVariable } from './Dialog.style'
import Break from './Break'

interface ConfirmDialogProps {
  content: string
  open: boolean
  type: DialogButtonVariable['variant']
  cancelButtonTitle?: string
  confirmButtonTitle?: string
  onClose: () => void
  onCancel?: (status: false) => void
  onConfirm?: (status: true) => void
}

export default function ConfirmDialog({
  content,
  open,
  type = 'info',
  cancelButtonTitle,
  confirmButtonTitle,
  onClose,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const cancel = React.useCallback(() => {
    onCancel?.(false)
    onClose()
  }, [onCancel, onClose])

  const confirm = React.useCallback(() => {
    onConfirm?.(true)
    onClose()
  }, [onConfirm, onClose])

  return (
    <Dialog open={open} position="top">
      <Dialog.Title />
      <Dialog.Content>
        <p>
          <Break value={content} />
        </p>
      </Dialog.Content>
      <Dialog.Footer className="border-none">
        <Dialog.Button onClick={cancel}>{cancelButtonTitle || '취소'}</Dialog.Button>
        <Dialog.Button variant={type} onClick={confirm}>
          {confirmButtonTitle || '확인'}
        </Dialog.Button>
      </Dialog.Footer>
    </Dialog>
  )
}
