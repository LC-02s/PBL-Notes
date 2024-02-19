import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import NoteItem from './NoteItem';
import { Note } from '../../app/types/note';
import usePathname from '../../hooks/usePathname';

export default function NoteList() {

  const [ targetName, targetPath ] = usePathname();

  const { view } = useAppSelector(({ ui }) => ui);
  const { basicNotes, archiveNotes, deletedNotes } = useAppSelector(({ note }) => note);
  
  const [ currentNotes, setCurrentNotes ] = useState<Note[]>([]);

  useEffect(() => {
    if (targetName === '') {
      setCurrentNotes(targetPath === 'archive' ? archiveNotes : (targetPath === 'trash' ? deletedNotes : []));
    } else {
      setCurrentNotes(targetName === 'all' ?  basicNotes : basicNotes.filter(({ included }) => included === targetName));
    }
  }, [ targetName, targetPath, basicNotes, archiveNotes, deletedNotes ]);

  const pinnedNotes = currentNotes.filter(({ isPinned }) => isPinned);
  const filteredNotes = currentNotes.filter(({ isPinned }) => !isPinned);

  return (
    <NoteListContainer $viewType={view === 'list'}>
      {
      (pinnedNotes.length !== 0 || filteredNotes.length !== 0) ?
        <React.Fragment>
          {
          // 고정 메모 출력
          pinnedNotes.length > 0 && 
            <li>
              <h2>Pinned Notes ({ pinnedNotes.length })</h2>
              <ul>{ pinnedNotes.map((data, idx) => (<NoteItem key={data.createAt} data={data} index={idx} />)) }</ul>
            </li>
          }
          {
          // 메모 출력
          filteredNotes.length > 0 && 
            <li>
              <h2>All Notes ({ filteredNotes.length })</h2>
              <ul>{ filteredNotes.map((data, idx) => (<NoteItem key={data.createAt} data={data} index={idx} />)) }</ul>
            </li>
          }
        </React.Fragment> :
        <NoteListItemEmpty>메모 없음</NoteListItemEmpty>
      }
    </NoteListContainer>
  )
}

// styled components
const NoteListItemEmpty = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 0px 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.grayScale400};
  white-space: nowrap;
  transition: color 0.3s;
`;

const NoteListContainer = styled.ul<{ $viewType: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  padding: 12px;
  overflow-y: auto;
  transition: border 0.3s;
  
  ${({ $viewType }) => $viewType ? css`
    width: 241px;
    border-right: 1px solid ${({ theme }) => theme.grayScale200};
    & > li + li {margin: 14px 0px 0px;}
  ` : css`
    & > li + li {margin: 18px 0px 0px;}
  `}

  & > li:not(${NoteListItemEmpty}) {
    display: block;
    width: 100%;
    height: auto;

    & > h2 {
      display: block;
      width: 100%;
      height: auto;
      margin: 0px 0px 4px;
      font-size: 14px;
      font-weight: 400;
      color: ${({ theme }) => theme.grayScale500};
    }
    & > ul {
      display: block;
      width: 100%;
      height: auto;
  
      ${({ $viewType }) => $viewType ? css`
        & > li + li {margin: 8px 0px 0px;}
      ` : css`
        display: grid;
        grid-template-columns: repeat(5, minmax(180px, 1fr));
        gap: 12px;
      `}
    }
  }
`;