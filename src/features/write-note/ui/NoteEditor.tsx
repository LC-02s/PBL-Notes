import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { BalloonEditor } from 'ckeditor5'
import { type Note, useModifyNote, useSetTempNoteMarkdown, useTempNote } from '@/entities/note'
import { EDITOR_CONFIG } from '../constants'

import 'ckeditor5/ckeditor5.css'

interface NoteEditorProps {
  activeNote: Note
}

export default function NoteEditor({ activeNote }: NoteEditorProps) {
  const [editor, setEditor] = React.useState<BalloonEditor | null>(null)

  const tempNote = useTempNote()
  const isDisabled = !tempNote || tempNote.isLocked || !tempNote.modifiable

  const setTempNoteMarkdown = useSetTempNoteMarkdown()
  const modifyNote = useModifyNote()

  React.useEffect(() => {
    editor?.[isDisabled ? 'enableReadOnlyMode' : 'disableReadOnlyMode'](editor.id)
  }, [editor, isDisabled])

  if (!tempNote) {
    return null
  }

  return (
    <div className="editor-wrapper relative block size-full flex-1 overflow-y-auto bg-gray000 px-6 pb-9 pt-4 text-base font-normal text-gray700 transition-colors xl:px-8 xl:pb-12">
      <CKEditor
        editor={BalloonEditor}
        config={EDITOR_CONFIG}
        data={tempNote.markdown}
        onReady={setEditor}
        onChange={(_, e) => {
          setTempNoteMarkdown({ createAt: tempNote.createAt, markdown: e.getData() })
        }}
        onBlur={(_, e) => {
          const markdown = e.getData()

          if (activeNote.markdown !== markdown) {
            modifyNote({ createAt: tempNote.createAt, markdown })
          }
        }}
      />
    </div>
  )
}
