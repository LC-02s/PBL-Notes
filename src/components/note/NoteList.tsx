import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import NoteItem from './NoteItem';
import { Note } from '../../app/types/note';
import usePathname from '../../hooks/usePathname';
import { noteDataSort } from '../../app/actions/note';
import { useNavigate } from 'react-router-dom';

export default function NoteList() {

  const [ targetPath, targetName, isInvaild, isNotFound ] = usePathname();
  const navigate = useNavigate();

  const { view } = useAppSelector(({ ui }) => ui);
  const { folderList, defaultSort } = useAppSelector(({ folder }) => folder);
  const { notes } = useAppSelector(({ note }) => note);
  
  const [ currentNotes, setCurrentNotes ] = useState<Note[]>([]);

  useEffect(() => {
    if (isInvaild) { setCurrentNotes(notes.filter(({ modifiable }) => !modifiable)); return }
    let targetNotes;
    if (targetPath === 'all') { 
      targetNotes = noteDataSort(notes.filter(({ modifiable }) => modifiable), `${defaultSort.type}/${defaultSort.sortedAt}`);
    } else {
      if (isNotFound) { navigate('/notfound'); return }
      const targetFolderIndex = folderList.findIndex(({ name }) => name === targetName);
      const targetSort = folderList[targetFolderIndex]?.sort ?? { type: 'create', sortedAt: 'desc' };
      targetNotes = noteDataSort(notes.filter(({ included, modifiable }) => included === targetName && modifiable), `${targetSort.type}/${targetSort.sortedAt}`);
    }
    setCurrentNotes(targetNotes);
  }, [ targetPath, targetName, isInvaild, isNotFound, notes, folderList, defaultSort, navigate ]);

  const pinnedNotes = isInvaild ? [] : currentNotes.filter(({ isPinned }) => isPinned);
  const filteredNotes = isInvaild ? currentNotes : currentNotes.filter(({ isPinned }) => !isPinned);

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
              <ul>{ pinnedNotes.map((data, idx) => (<NoteItem key={data.createAt} data={data} targetPath={targetPath} />)) }</ul>
            </li>
          }
          {
          // 메모 출력
          filteredNotes.length > 0 && 
            <li>
              <h2>All Notes ({ filteredNotes.length })</h2>
              <ul>{ filteredNotes.map((data, idx) => (<NoteItem key={data.createAt} data={data} targetPath={targetPath} />)) }</ul>
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
  padding: ${({ $viewType }) => $viewType ? '12px' : '24px'};
  overflow-y: auto;
  transition: border 0.3s;
  
  ${({ $viewType }) => $viewType ? css`
    width: 241px;
    border-right: 1px solid ${({ theme }) => theme.grayScale200};
    & > li + li {margin: 14px 0px 0px;}
  ` : css`
    & > li + li {margin: 20px 0px 0px;}
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
        grid-template-columns: repeat(auto-fill, minmax(200px, auto));
        gap: 12px;
      `}
    }
  }
`;