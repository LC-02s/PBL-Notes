import React from 'react'
import { THEME_COLOR } from '../../App.theme'
import styled, { css } from 'styled-components'

export default function FolderList() {

  const data = { 
    '1asdf': { index: 0, colorChip: THEME_COLOR['red'], length: 2 }, 
    '2asdf': { index: 1, colorChip: THEME_COLOR['orange'], length: 0 }, 
    '3asdf': { index: 2, colorChip: THEME_COLOR['yellow'], length: 1 }, 
    '4asdf': { index: 3, colorChip: THEME_COLOR['green'], length: 2 }, 
  }

  return (
    <FolderListContainer>
      <h1>My Folder</h1>
      <ul>
        <li>
          <FolderListBtn $active={true}><span>모든 폴더</span><span>5</span></FolderListBtn>
        </li>
        {
        Object.entries(data).map(([ title, { colorChip, length } ], idx) => (
          <li key={title}>
            <FolderListBtn $active={false} $color={colorChip}>
              <span>{ title }</span><span>{ length }</span>
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

const FolderListBtn = styled.button<{ $color?: String, $active: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 4px;
  ${({ theme, $active }) => $active && css`
    background-color: ${theme.currentTheme === 'light' ? 'rgba(255,255,255, 0.4)' : 'rgba(0,0,0, 0.32)'};
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
      background-color: ${({ theme, $color }) => $color ? $color : theme.grayScale500};
    }
  }
  & > span:last-of-type {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale500};
  }
`;