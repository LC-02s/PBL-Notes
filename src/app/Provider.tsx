import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastViewer } from '@/shared/ui'

export default function Provider({ children }: React.PropsWithChildren) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        {children}
        <ToastViewer />
      </BrowserRouter>
    </React.StrictMode>
  )
}
