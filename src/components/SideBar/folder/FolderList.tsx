import React from 'react'
import { THEME_COLOR } from '../../../App.theme'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {  } from '../../../app/actions/folder';
import { NavLink } from 'react-router-dom';

export default function FolderList() {

  const { basicNotes, archiveNotes, deletedNotes } = useAppSelector(({ note }) => note);
  const { folderList } = useAppSelector(({ folder }) => folder);

  const dispatch = useAppDispatch();

  return (
    <FolderListContainer>
      <h1>My Folder</h1>
      <ul>
        <FolderListIconItem $type='' $color='none'>
          <NavLink to='/' state='all' className={({ isActive }) => isActive ? 'active' : ''}>
            <span>모든 노트</span><span>{ basicNotes.length }</span>
          </NavLink>
        </FolderListIconItem>
        {
          folderList.map(({ id, name, color }) => (
            <FolderListItem key={id} $color={color === 'none' ? 'none' : THEME_COLOR[color]}>
              <NavLink to={`/tag/${name}`} state={name} className={({ isActive }) => isActive ? 'active' : ''}>
                <span>{ name }</span><span>{ basicNotes.filter(({ included }) => included === name).length }</span>
              </NavLink>
            </FolderListItem>
          ))
        }
        <FolderListIconItem $type='archive' $color='none'>
          <NavLink to='/archive' state='all' className={({ isActive }) => isActive ? 'active' : ''}>
            <span>보관된 항목</span><span>{ archiveNotes.length }</span>
          </NavLink>
        </FolderListIconItem>
        <FolderListIconItem $type='trash' $color='none'>
          <NavLink to='/trash' state='all' className={({ isActive }) => isActive ? 'active' : ''}>
            <span>최근 삭제한 항목</span><span>{ deletedNotes.length }</span>
          </NavLink>
        </FolderListIconItem>
      </ul>
    </FolderListContainer>
  )
}

// styled components
const FolderListContainer = styled.div`
  display: block;
  width: 100%;
  height: auto;
  padding: 12px;

  & + & {margin: 12px 0px 0px;}
  & > h1 {
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 4px;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.grayScale500};
    white-space: nowrap;
  }
`;

const FolderListItem = styled.button<{ $color: string }>`
  display: block;
  width: 100%;
  height: auto;
    
  & > a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 6px 8px;
    font-size: 14px;
    border-radius: 4px;
    transition: background 0.2s;
    &:hover,
    &:focus {background-color: rgba(${({ theme }) => theme.current === 'light' ? '255,255,255' : '0,0,0'}, 0.12);}
  }
  & > a.active,
  & > a.active:hover,
  & > a.active:focus {
    background-color: rgba(${({ theme }) => theme.current === 'light' ? '255,255,255' : '0,0,0'}, 0.32);
  }
  & > a > span {display: inline-block;}
  & > a > span:first-of-type {
    position: relative;
    padding-left: 12px;
    font-size: inherit;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale700};

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      display: inline-block;
      width: 4px;
      height: 4px;
      margin: auto 0px;
      border-radius: 50%;
      background-color: ${({ theme, $color }) => $color === 'none' ? theme.grayScale500 : $color};
    }
  }
  & > a > span:last-of-type {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale500};
  }
`;

const FolderListIconItem = styled(FolderListItem)<{ $type: string }>`

`;