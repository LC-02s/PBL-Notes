import React from 'react'
import { THEME_COLOR } from '../../App.theme'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setActiveFolder } from '../../app/actions/folder';
// import { setActiveMemo } from '../../app/actions/memo';

export default function FolderList() {

  const { data, activeFolder } = useAppSelector(({ folder }) => folder);
  // const memo = useAppSelector(({ memo }) => memo);
  const dispatch = useAppDispatch();
  const handleFolderClick = (title:string) => {
    dispatch(setActiveFolder(title));
    // if (title !== '') {
    //   const memoTarget = Object.entries(memo.data)
    //     .find(([ , { included } ]) => included === title);
    //   if (memoTarget[0]) dispatch(setActiveMemo(memoTarget[0]));
    // }
  }

  return (
    <FolderListContainer>
      <h1>My Folder</h1>
      <ul>
        <li>
          <FolderListBtn 
            $active={activeFolder === ''} $color='none' 
            onClick={() => dispatch(setActiveFolder(''))}
          >
            <span>모든 폴더</span><span>0</span>
          </FolderListBtn>
        </li>
        {
        Object.entries(data)
          .sort(([ , a], [ , b]) => Number(a.index) - Number(b.index))
          .map(([ title, { colorChip, length } ], idx) => (
            <li key={title}>
              <FolderListBtn 
                $active={activeFolder === title} $color={colorChip === 'none' ? 'none' : THEME_COLOR[colorChip]}
                onClick={(title) => handleFolderClick(String(title))}
              >
                <span>{ title }</span><span>{ String(length) }</span>
              </FolderListBtn>
            </li>
          ))
        }
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

const FolderListBtn = styled.button<{ $color: String, $active: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 4px;
  ${({ theme, $active }) => $active ? 
  css`
    background-color: rgba(${theme.current === 'light' ? '255,255,255' : '0,0,0'}, 0.32);
  `:
  css`
    &:hover,
    &:focus {background-color: rgba(${theme.current === 'light' ? '255,255,255' : '0,0,0'}, 0.12);}
  `}
  transition: background 0.2s;

  & > span {display: inline-block;}
  & > span:first-of-type {
    position: relative;
    padding-left: 12px;
    font-size: inherit;
    font-weight: 400;
    color: ${({ theme, $active }) => $active ? theme.grayScale800 : theme.grayScale700};

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
  & > span:last-of-type {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale500};
  }
`;