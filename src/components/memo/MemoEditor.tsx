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
        onChange={(event) => { console.log(event); }}
        onBlur={(event, editor) => { console.log('Blur.', editor); }}
        onFocus={(event, editor) => { console.log('Focus.', editor); }}
      />
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div`
  position: relative;
  padding: 12px 12px 12px 36px;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayScale700};

  & h1 {font-size: 17px; font-weight: 600; margin-top: 14px; margin-bottom: 8px;}
  & ol, ul {padding-left: 28px;}
`;