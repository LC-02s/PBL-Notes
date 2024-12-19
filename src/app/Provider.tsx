import { StrictMode } from 'react'
import { OverlayViewer } from '@/shared/hooks'
import { ToastViewer } from '@/shared/ui'
import AppRouter from './AppRouter'

export default function Provider({ children }: React.PropsWithChildren) {
  return (
    <StrictMode>
      <AppRouter>
        {children}
        <OverlayViewer />
      </AppRouter>
      <ToastViewer />
    </StrictMode>
  )
}
