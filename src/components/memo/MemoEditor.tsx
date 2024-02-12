import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import CustomEditor from 'ckeditor5-custom-build'
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { modifyMemo } from '../../app/actions/memo';

export default function MemoEditor() {

  const memo = useAppSelector(({ memo }) => memo);
  const isDisabled = memo.activeMemo  === '';
  const dispatch = useAppDispatch();

  return (
    <EditorWrapper $isDisable={isDisabled}>
      <CKEditor
        editor={ CustomEditor }
        data={memo.data[memo.activeMemo].markdown || ''}
        onReady={(editor) => {
          if (isDisabled) editor.enableReadOnlyMode(editor.id);
          else editor.disableReadOnlyMode(editor.id);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          dispatch(modifyMemo({ id: String(memo.activeMemo), data, time: String(new Date()) }));
        }}
      />
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div<{ $isDisable: boolean }>`
  position: relative;
  flex: 1;
  display: block;
  width: 100%;
  height: 100%;
  padding: ${({ $isDisable }) => $isDisable ? '18px' : '16px 16px 20px 36px'};
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