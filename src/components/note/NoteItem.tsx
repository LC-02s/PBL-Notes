import React from 'react'
import styled, { css } from 'styled-components';
import { Note } from '../../app/types/note';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { THEME_COLOR } from '../../App.theme';
import { useAppSelector } from '../../app/hooks';

type MemoItemsProps = { data: Note, index: number };

const NoteItem: React.FC<MemoItemsProps> = ({ data, index }) => {

  const { folderList } = useAppSelector(({ folder }) => folder);
  const { activeNoteIndex } = useAppSelector(({ note }) => note);
  const { state } = useLocation();
  const folderIndex = folderList.findIndex(({ name }) => name === data.included);
  const color = folderIndex >= 0 ? folderList[folderIndex].color : false;

  return (
    <NoteItemContents $active={activeNoteIndex === data.createAt}>
      <NoteItemTitle $isPinned={data.isPinned}>
        <span>{ data.title || '새로운 메모' }</span>
        { data.isPinned && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.184 7.805l-2.965-2.967c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107"></path></svg> }
      </NoteItemTitle>
      <p>
        <TimeStampEl>{ moment(new Date(+data.updateAt)).fromNow() }</TimeStampEl>
        { 
        state === 'all' && 
          <FolderTagEl $color={color ? THEME_COLOR[color] : 'none'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6.86 1.25h.127c.351 0 .577 0 .798.02a4.75 4.75 0 0 1 2.59 1.073c.17.142.33.302.579.55l.576.577c.846.845 1.171 1.161 1.547 1.37c.218.121.449.217.689.286c.413.117.866.124 2.062.124h.425c1.273 0 2.3 0 3.111.102c.841.106 1.556.332 2.144.86c.098.088.192.182.28.28c.529.588.754 1.303.86 2.144c.102.812.102 1.838.102 3.111v2.31c0 1.837 0 3.293-.153 4.432c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V6.86c0-.797 0-1.303.082-1.74A4.75 4.75 0 0 1 5.12 1.331c.438-.082.944-.082 1.74-.082m.09 1.5c-.917 0-1.271.003-1.553.056a3.25 3.25 0 0 0-2.59 2.591c-.054.282-.057.636-.057 1.553V14c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-2.202c0-1.336-.001-2.267-.09-2.975c-.087-.689-.246-1.06-.487-1.328a2.238 2.238 0 0 0-.168-.168c-.268-.241-.64-.4-1.328-.487c-.707-.089-1.639-.09-2.975-.09h-.484c-1.048 0-1.724 0-2.363-.182c-.35-.1-.689-.24-1.008-.417c-.58-.324-1.058-.801-1.8-1.543l-.077-.078l-.55-.55a8.03 8.03 0 0 0-.503-.482a3.25 3.25 0 0 0-1.771-.734a8.029 8.029 0 0 0-.696-.014m7.548 8.69a.75.75 0 0 1 .063 1.058l-2.667 3a.75.75 0 0 1-1.121 0l-1.334-1.5a.75.75 0 1 1 1.122-.996l.772.87l2.107-2.37a.75.75 0 0 1 1.058-.062" clipRule="evenodd"></path></svg>
            { data.included }
          </FolderTagEl>
        }
      </p>
    </NoteItemContents>
  )
}

export default NoteItem;

// styled components
const NoteItemContents = styled.li<{ $active: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  padding: 8px 12px;
  border-radius: 4px;
  ${({ $active, theme }) => $active && css`
    background-color: ${theme.grayScale100};
  `}
  transition: background 0.3s;

  & > p {display: block; width: 100%; height: auto;}
`;

const NoteItemTitle = styled.h3<{ $isPinned: boolean }>`
  display: block; 
  width: 100%; 
  height: auto;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.grayScale700};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ $isPinned, theme }) => $isPinned && css`
    position: relative;
    padding-right: 24px;
    svg {position: absolute; top: 2px; right: 0px; display: inline-block; font-size: 16px; color: ${theme.grayScale500};}
  `}
`;

const FolderTagEl = styled.span<{ $color: string }>`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  margin: 4px 0px 0px;
  font-size: 12px;
  border-radius: 4px;
  color: ${({ theme, $color }) => $color === 'none' ? theme.grayScale500 : $color};
  line-height: 15px;
  svg {font-size: 14px;}
`;

const TimeStampEl = styled.span`
  display: block;
  width: 100%;
  height: auto;
  margin: 2px 0px 0px;
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayScale400};
  word-break: keep-all;
`;