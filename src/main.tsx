import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import { getMainElement } from '@/shared/utils'

const mainEl = getMainElement()
const root = createRoot(mainEl)

root.render(<App />)
