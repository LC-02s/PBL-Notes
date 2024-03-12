import React from 'react'
import FolderList from './FolderList';
import FolderAddBtn from './FolderAddBtn';
import styled from 'styled-components';

export default function SideBar() {
  return (
    <SideBarWrapper>
        <div><FolderList /></div>
        <div><FolderAddBtn /></div>
    </SideBarWrapper>
  )
}

// styled components
const SideBarWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
    width: 240px;
    height: 100%;

    & > div {
        display: block;
        width: 100%;
        height: auto;
    }
    & > div:first-of-type {flex: 1; overflow-y: auto;}
    & > div:last-of-type {padding: 12px;}
`;