import React from 'react'
import type Button from './Button'
import Break from './Break'
import Dialog from './Dialog'

interface ConfirmDialogProps {
  content: string
  open: boolean
  type: React.ComponentProps<typeof Button>['variant']
  cancelButtonTitle?: string
  confirmButtonTitle?: string
  onClose: () => void
  onCancel?: (status: false) => void
  onConfirm?: (status: true) => void
}

export default function ConfirmDialog({
  content,
  open,
  type = 'warn',
  cancelButtonTitle,
  confirmButtonTitle,
  onClose,
  onCancel,
  onConfirm,
  children,
}: React.PropsWithChildren<ConfirmDialogProps>) {
  const cancel = React.useCallback(() => {
    onCancel?.(false)
    onClose()
  }, [onCancel, onClose])

  const confirm = React.useCallback(() => {
    onConfirm?.(true)
    onClose()
  }, [onConfirm, onClose])

  return (
    <Dialog open={open} position="top" size="sm" cancelWithOutsideClick>
      <Dialog.Title />
      <Dialog.Content>
        <p>
          <Break value={content} />
        </p>
        {children}
      </Dialog.Content>
      <Dialog.Footer className="border-none p-0">
        <Dialog.Button onClick={cancel}>{cancelButtonTitle || '취소'}</Dialog.Button>
        <Dialog.Button variant={type} onClick={confirm}>
          {confirmButtonTitle || '삭제'}
        </Dialog.Button>
      </Dialog.Footer>
    </Dialog>
  )
}
