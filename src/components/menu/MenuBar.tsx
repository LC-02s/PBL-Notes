import React from 'react'
import styled from 'styled-components'
import DeleteBtn from './buttons/DeleteBtn';
import ViewBtns from './buttons/ViewBtns';
import ThemeBtn from './buttons/ThemeBtn';
import WriteBtn from './buttons/WriteBtn';
import LockBtn from './buttons/LockBtn';
import PinBtn from './buttons/PinBtn';
import SearchBar from './SearchBar';

export default function MenuBar() {
  return (
    <MenuContainer>
      <ListMenuWrap>
        <ViewBtns /> <DeleteBtn />
      </ListMenuWrap>
      <VerticalLine />
      <MemoMenuWrap>
        <div>
          <WriteBtn /> 
          <div><LockBtn /><PinBtn /></div>
        </div>
        <SearchBar />
        <ThemeBtn />
      </MemoMenuWrap>
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.grayScale000};
  border-bottom: 1px solid ${({ theme }) => theme.grayScale200};
  transition: background 0.3s, border 0.3s;
`;

const ListMenuWrap = styled.div`
  position: relative;
  display: flex;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  height: 100%;
  padding: 8px;
`;

const MemoMenuWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: calc(100% - 240px);
  height: 100%;
  padding: 8px;

  & > div:first-of-type {gap: 12px !important;}
  div:first-of-type {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
  }
`;

const VerticalLine = styled.div`
  display: block;
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.grayScale200};
  transition: background 0.3s;
`;