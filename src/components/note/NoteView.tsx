import React from 'react'
import NoteList from './NoteList'
import { useAppSelector } from '../../app/hooks'
import NoteEditor from './NoteEditor';
import styled from 'styled-components';

export default function NoteView() {

  const { tempData } = useAppSelector(({ note }) => note);
  const { view } = useAppSelector(({ ui }) => ui);

  return (
    <NoteViewContainer>
      {
      view === 'list' ? 
        <React.Fragment>
          <NoteList />
          { tempData && <NoteEditor /> } 
        </React.Fragment> :
      tempData ? 
        <NoteEditor /> : <NoteList />
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
