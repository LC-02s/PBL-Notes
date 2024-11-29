import React from 'react'
import { ConfirmDialog } from '../../ui'
import useOverlay from './useOverlay'

export type ConfirmConfig = Pick<
  React.ComponentProps<typeof ConfirmDialog>,
  'type' | 'cancelButtonTitle' | 'confirmButtonTitle'
>

export default function useConfirm(config?: ConfirmConfig) {
  const overlay = useOverlay()

  return (content: string) =>
    new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => {
        return (
          <ConfirmDialog
            content={content}
            open={isOpen}
            type={config?.type}
            cancelButtonTitle={config?.cancelButtonTitle}
            confirmButtonTitle={config?.confirmButtonTitle}
            onClose={close}
            onCancel={resolve}
            onConfirm={resolve}
          />
        )
      })
    })
}
