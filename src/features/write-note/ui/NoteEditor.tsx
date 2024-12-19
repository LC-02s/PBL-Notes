import { useState, useRef, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { BalloonEditor } from 'ckeditor5'
import { type Note, useModifyNote, useSetTempNoteMarkdown } from '@/entities/note'
import { EDITOR_CONFIG } from '../constants'

import 'ckeditor5/ckeditor5.css'

interface NoteEditorProps {
  tempNote: Note
}

export default function NoteEditor({ tempNote }: NoteEditorProps) {
  const [editor, setEditor] = useState<BalloonEditor | null>(null)
  const markdownRef = useRef('')

  const isDisabled = tempNote.isLocked || !tempNote.modifiable

  const setTempNoteMarkdown = useSetTempNoteMarkdown()
  const modifyNote = useModifyNote()

  useEffect(() => {
    if (isDisabled) {
      editor?.enableReadOnlyMode(editor.id)
      return
    }

    editor?.disableReadOnlyMode(editor.id)
  }, [editor, isDisabled])

  return (
    <div className="editor-wrapper relative block size-full flex-1 overflow-y-auto bg-gray000 px-6 pb-9 pt-4 text-base font-normal text-gray700 transition-colors xl:px-8 xl:pb-12">
      <CKEditor
        editor={BalloonEditor}
        config={EDITOR_CONFIG}
        data={tempNote.markdown}
        onReady={setEditor}
        onChange={(_, editor) => {
          setTempNoteMarkdown({ createAt: tempNote.createAt, markdown: editor.getData() })
        }}
        onFocus={(_, editor) => (markdownRef.current = editor.getData())}
        onBlur={(_, editor) => {
          const markdown = editor.getData()

          if (markdownRef.current !== markdown) {
            modifyNote({ createAt: tempNote.createAt, markdown })
          }
        }}
      />
    </div>
  )
}
