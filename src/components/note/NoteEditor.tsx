import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from 'ckeditor5-custom-build'
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { modifyTempNote, modifyTempNoteDone } from '../../app/actions/note';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

export default function NoteEditor() {

  const { tempData } = useAppSelector(({ note }) => note);
  const dispatch = useAppDispatch();
  
  const isDisabled = (tempData?.isLocked ?? false) || !(tempData?.modifiable ?? true);
  const [ editorHandler, setEditorHandler ] = useState<BalloonEditor | null>(null);
  const prevData = useRef<string>('');

  useEffect(() => {
    if (editorHandler) {
      if (isDisabled) editorHandler.enableReadOnlyMode(editorHandler.id);
      else editorHandler.disableReadOnlyMode(editorHandler.id);
    }
  }, [ isDisabled, editorHandler ]);

  if (tempData !== null) {
    return (
      <EditorWrapper $isDisable={isDisabled}>
        <CKEditor
          editor={ CustomEditor }
          data={tempData?.markdown ?? ''}
          onReady={(editor) => { setEditorHandler(editor); }}
          onFocus={(event, editor) => { prevData.current = tempData.markdown; }}
          onChange={(event, editor) => { dispatch(modifyTempNote(editor.getData())); }}
          onBlur={(event, editor) => {
            const data = editor.getData();
            if (data !== prevData.current) {
              const time = Number(new Date().getTime());
              dispatch(modifyTempNoteDone({ data, time }));
            }
            prevData.current = '';
          }}
        />
      </EditorWrapper>
    )
  } else return <></>;

}

const EditorWrapper = styled.div<{ $isDisable: boolean }>`
  position: relative;
  flex: 1;
  display: block;
  width: 100%;
  height: 100%;
  padding: ${({ $isDisable }) => $isDisable ? '18px 32px' : '16px 16px 20px 36px'};
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayScale700};
  overflow-y: auto;

  h1 {font-size: 17px; font-weight: 600; margin-top: 12px!important; margin-bottom: 8px;}
  ol, ul {padding-left: 28px;}
  blockquote {padding: 0px 18px; border-color: ${({ theme }) => theme.grayScale300}; transition: border 0.3s;}
  & > div {border: none!important; box-shadow: none!important;}
  .ck-editor__editable_inline {min-height: 100%;}
  .ck .ck-placeholder::before, 
  .ck.ck-placeholder::before {color: ${({ theme }) => theme.grayScale400};}
`;