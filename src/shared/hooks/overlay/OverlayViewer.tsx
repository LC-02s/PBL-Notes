import { Fragment } from 'react/jsx-runtime'
import { useOverlayElementList } from './OverlayContext'

export default function OverlayViewer() {
  const overlayElementList = useOverlayElementList()

  return overlayElementList.map(([id, element]) => <Fragment key={id}>{element}</Fragment>)
}
