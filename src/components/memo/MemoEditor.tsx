import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from 'ckeditor5-custom-build'
import styled from 'styled-components';

export default function MemoEditor() {
  return (
    <EditorWrapper>
      <CKEditor
        editor={ CustomEditor }
        data=""
        onReady={(editor) => {
          console.log('isReadOnly: ', editor.isReadOnly);
          console.log('id: ', editor.id);
          // editor.enableReadOnlyMode(editor.id);
          // editor.disableReadOnlyMode(editor.id);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
        }}
      />
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 16px 16px 20px 36px;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayScale700};
  overflow-y: auto;

  h1 {font-size: 17px; font-weight: 600; margin-top: 12px!important; margin-bottom: 8px;}
  ol, ul {padding-left: 28px;}
  blockquote {padding: 0px 18px; border-color: ${({ theme }) => theme.grayScale300}; transition: border 0.3s;}
  & > div {border: none!important; box-shadow: none!important;}
  .ck-editor__editable_inline {min-height: 100%;}
`;