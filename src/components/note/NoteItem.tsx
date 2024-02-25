import React from 'react'
import styled, { css } from 'styled-components';
import { Note } from '../../app/types/note';
import moment from 'moment';
import 'moment/locale/ko';
import { THEME_COLOR } from '../../App.theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeActiveNoteId } from '../../app/actions/note';
import { FolderMapValue } from '../../app/types/folder';

type NoteItemsProps = { data: Note, targetPath: string, folderMap: Map<string, FolderMapValue> };

const NoteItem: React.FC<NoteItemsProps> = ({ data, targetPath, folderMap }) => {

  const { activeNoteId } = useAppSelector(({ note }) => note);
  const dispatch = useAppDispatch();

  const color = folderMap.get(data.included)?.color ?? '';
  const isPinned = data.isPinned && data.modifiable;

  return (
    <NoteItemContents $active={activeNoteId === data.createAt}>
      <button type='button' draggable={true} disabled={activeNoteId === data.createAt} onClick={() => dispatch(changeActiveNoteId(data.createAt))}>
        <NoteItemTitle $isPinned={isPinned}>
          <span>{ data.title || '새로운 메모' }</span>
          { isPinned && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.184 7.805l-2.965-2.967c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107"></path></svg> }
        </NoteItemTitle>
        <p>
          { 
          targetPath === 'all' && 
            <FolderTagEl $color={color ? THEME_COLOR[color] : 'none'}>
              { data.included }
            </FolderTagEl>
          }
          <TimeStampEl>{ moment(new Date(+data.updateAt)).fromNow() }</TimeStampEl>
        </p>
      </button>
    </NoteItemContents>
  )
}

export default NoteItem;

// styled components
const NoteItemContents = styled.li<{ $active: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  
  button {
    display: block;
    width: 100%;
    height: auto;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.grayScale200};
    border-radius: 4px;
    ${({ $active, theme }) => $active && css`
      border-color: ${theme.grayScale100};
      background-color: ${theme.grayScale100};
    `}
    transition: background 0.3s, border 0.3s;
  
    & > p {display: flex; flex-flow: row wrap; justify-content: flex-start; align-items: center; gap: 4px 8px; margin: 4px 0px 0px; width: 100%; height: auto; font-size: 0px;}
  }
`;

const NoteItemTitle = styled.h3<{ $isPinned: boolean }>`
  display: block; 
  width: 100%; 
  height: auto;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.grayScale700};
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: color 0.3s;
  ${({ $isPinned, theme }) => $isPinned && css`
    position: relative;
    padding-left: 16px;
    svg {position: absolute; top: 3px; left: 0px; display: inline-block; font-size: 14px; color: ${theme.grayScale500}; transform: scale(-1, 1);}
  `}
`;

const FolderTagEl = styled.span<{ $color: string }>`
  position: relative;
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  width: auto;
  height: auto;
  padding-left: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.grayScale600};
  line-height: 16px;
  border-radius: 4px;
  transition: color 0.3s;
  
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 2px;
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: auto 0px;
    border-radius: 50%;
    background-color: ${({ theme, $color }) => $color === 'none' ? theme.grayScale500 : $color};
  }
`;

const TimeStampEl = styled.span`
  display: block;
  width: auto;
  height: auto;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayScale400};
  word-break: keep-all;
  line-height: 16px;
`;