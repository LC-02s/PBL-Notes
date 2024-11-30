import React from 'react'
import { useOverlayElementList } from './OverlayContext'

export default function OverlayViewer() {
  const overlayElementList = useOverlayElementList()

  return overlayElementList.map(([id, element]) => (
    <React.Fragment key={id}>{element}</React.Fragment>
  ))
}
