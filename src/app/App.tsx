import { FolderSection } from '@/widgets/folder-section'
import { Menu } from '@/widgets/menu'
import { NoteSection } from '@/widgets/note-section'
import Provider from './Provider'

import './App.css'

export default function App() {
  return (
    <Provider>
      <FolderSection />
      <section className="flex size-full flex-1 flex-col items-stretch justify-between border-l border-gray200 bg-gray000 transition-colors">
        <div className="block h-12 w-full">
          <Menu />
        </div>
        <article className="block size-full max-h-[calc(100%-3rem)] flex-1">
          <NoteSection />
        </article>
      </section>
    </Provider>
  )
}
