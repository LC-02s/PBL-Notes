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
        onReady={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
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
  & > div {border: none!important; box-shadow: none!important;}
  .ck-editor__editable_inline {min-height: 100%;}
`;