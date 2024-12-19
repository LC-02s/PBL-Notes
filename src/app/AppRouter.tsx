import { BrowserRouter, Route, Routes } from 'react-router'
import { RootNotFound } from '@/shared/ui'

export default function AppRouter({ children }: React.PropsWithChildren) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={children} />
        <Route path="/note/:noteId" element={children} />
        <Route path="/folder/:folderId" element={children} />
        <Route path="/folder/:folderId/note/:noteId" element={children} />
        <Route path="/trash" element={children} />
        <Route path="/trash/note/:noteId" element={children} />
        <Route path="/*" element={<RootNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
