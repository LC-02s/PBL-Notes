import { createRoot } from 'react-dom/client'
import { App } from '@/app'

const mainEl = document.getElementById('main') || document.body
const root = createRoot(mainEl)

root.render(<App />)
