import React from 'react'
import type { FocusableElement } from '@/shared/types'
import { ConfirmDialog } from '@/shared/ui'
import useOverlay from './useOverlay'

type ConfirmProps = React.ComponentProps<typeof ConfirmDialog>

type ConfirmConfig = {
  type?: ConfirmProps['type']
  cancelButtonTitle?: ConfirmProps['cancelButtonTitle']
  confirmButtonTitle?: ConfirmProps['confirmButtonTitle']
}

interface DefaultConfirmConfig<E extends FocusableElement> extends ConfirmConfig {
  startedAt?: React.MutableRefObject<E | null>
}

export default function useConfirm<E extends FocusableElement>(
  defaultConfig?: DefaultConfirmConfig<E>,
) {
  const { startedAt, open } = useOverlay<E>()

  return {
    startedAt,
    confirm: (content: string, config?: ConfirmConfig) =>
      new Promise<boolean>((resolve) => {
        open(({ isOpen, close }) => {
          return (
            <ConfirmDialog
              content={content}
              open={isOpen}
              type={config?.type || defaultConfig?.type}
              cancelButtonTitle={config?.cancelButtonTitle || defaultConfig?.cancelButtonTitle}
              confirmButtonTitle={config?.confirmButtonTitle || defaultConfig?.confirmButtonTitle}
              onClose={close}
              onCancel={resolve}
              onConfirm={resolve}
            />
          )
        })
      }),
  }
}
