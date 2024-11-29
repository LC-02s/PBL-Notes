import React from 'react'

export interface OverlayElementState {
  isOpen: boolean
  close: () => void
  exit: () => void
}

export interface CreateOverlayElement {
  (props: OverlayElementState): JSX.Element
}

export interface OverlayControllerProps {
  overlayElement: CreateOverlayElement
  onExit: () => void
}

export interface OverlayControlRef {
  close: () => void
}

export interface OverlayStore {
  overlay: Map<string, React.ReactNode>
  mount(id: string, element: React.ReactNode): void
  unmount(id: string): void
}
