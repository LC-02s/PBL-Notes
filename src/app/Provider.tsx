import React from 'react'

export default function Provider({ children }: React.PropsWithChildren) {
  return <React.StrictMode>{children}</React.StrictMode>
}
