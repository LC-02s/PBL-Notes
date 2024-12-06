import React from 'react'
import { OverlayViewer } from '@/shared/hooks'
import { ToastViewer } from '@/shared/ui'
import AppRouter from './AppRouter'

export default function Provider({ children }: React.PropsWithChildren) {
  return (
    <React.StrictMode>
      <AppRouter>
        {children}
        <OverlayViewer />
      </AppRouter>
      <ToastViewer />
    </React.StrictMode>
  )
}
