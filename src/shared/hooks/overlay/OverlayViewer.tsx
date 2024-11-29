import React from 'react'
import { useOverlayMap } from './OverlayContext'

export default function OverlayViewer() {
  const overlayMap = useOverlayMap()

  return [...overlayMap.entries()].map(([id, element]) => (
    <React.Fragment key={id}>{element}</React.Fragment>
  ))
}
