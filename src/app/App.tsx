import { OverlayViewer } from '@/shared/hooks'
import Provider from './Provider'

import './App.css'

export default function App() {
  return (
    <Provider>
      <OverlayViewer />
    </Provider>
  )
}
