import localForage from 'localforage'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import { getMainElement } from '@/shared/utils'

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'PBL-Notes',
  version: 1.0,
  storeName: 'data',
  description: 'my notes database',
})

const mainEl = getMainElement()
const root = createRoot(mainEl)

root.render(<App />)
