import React from 'react'
import NoteList from './NoteList'
import { useAppSelector } from '../../app/hooks'
import NoteEditor from './NoteEditor';
import styled from 'styled-components';

export default function NoteView() {

  const { tempData, activeNoteIndex } = useAppSelector(({ note }) => note);
  const isActive = !((activeNoteIndex ?? -1) >= 0);
  const { view } = useAppSelector(({ ui }) => ui);

  return (
    <NoteViewContainer>
      {
      view === 'list' ? 
        <React.Fragment>
          <NoteList />
          { tempData && <NoteEditor /> } 
        </React.Fragment> :
      isActive ? 
        <NoteList /> : <NoteEditor />
      }
    </NoteViewContainer>
  )
}

const NoteViewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;
