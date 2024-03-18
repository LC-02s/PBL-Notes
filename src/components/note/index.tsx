import React from 'react'
import NoteList from './NoteList'
import { useAppSelector } from '../../app/hooks'
import NoteEditor from './NoteEditor';
import styled from 'styled-components';

export default function NoteView() {

  const { noteStatus, noteSession, tempData } = useAppSelector(({ note }) => note);
  const { view } = useAppSelector(({ ui }) => ui);

  return (
    <NoteViewContainer>
      {
      noteStatus === 'pending' && !noteSession 
      ? <NoteViewSpinner>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><rect width={6} height={14} x={1} y={4} fill="currentColor"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"></animate><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"></animate><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;0.2"></animate></rect><rect width={6} height={14} x={9} y={4} fill="currentColor" opacity={0.4}><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"></animate><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"></animate><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;0.2"></animate></rect><rect width={6} height={14} x={17} y={4} fill="currentColor" opacity={0.3}><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"></animate><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"></animate><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;0.2"></animate></rect></svg>
        </NoteViewSpinner> 
      : view === 'list' 
        ? <React.Fragment>
            <NoteList />
            <NoteEditor />
          </React.Fragment> 
        : tempData 
          ? <NoteEditor /> 
          : <NoteList /> 
      }
    </NoteViewContainer>
  )
}

// styled components
const NoteViewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const NoteViewSpinner = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 80px;
  font-size: 32px;
  color: ${({ theme }) => theme.grayScale400};
`;
