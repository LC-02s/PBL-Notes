import React from 'react'
import styled from 'styled-components'
import DeleteBtn from './buttons/DeleteBtn';
import ViewBtns from './buttons/ViewBtns';
import ThemeBtn from './buttons/ThemeBtn';
import WriteBtn from './buttons/WriteBtn';
import LockBtn from './buttons/LockBtn';
import PinBtn from './buttons/PinBtn';
import SearchBar from './SearchBar';
import SortBtn from './buttons/SortBtn';

export default function MenuBar() {
  return (
    <MenuContainer>
      <ListMenuWrapper>
        <ViewBtns /> <DeleteBtn />
      </ListMenuWrapper>
      <VerticalLine />
      <NoteMenuWrapper>
        <NoteMenuDivision $gap={true}>
          <WriteBtn /> 
          <NoteMenuDivision>
            <LockBtn /><PinBtn />
          </NoteMenuDivision>
        </NoteMenuDivision>
        <SearchMenuWrapper>
          <SearchBar />
          <SortBtn />
        </SearchMenuWrapper>
        <ThemeBtn />
      </NoteMenuWrapper>
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
  font-size: 0px;
  background-color: ${({ theme }) => theme.grayScale000};
  border-bottom: 1px solid ${({ theme }) => theme.grayScale200};
  transition: background 0.3s, border 0.3s;
`;

const ListMenuWrapper = styled.div`
  position: relative;
  display: flex;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 0px;
  width: 240px;
  height: 100%;
  padding: 8px;
`;

const NoteMenuWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: calc(100% - 240px);
  height: 100%;
  padding: 8px;
  font-size: 0px;
`;

const NoteMenuDivision = styled.div<{ $gap?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ $gap }) => $gap ? '12px' : '4px'};
  font-size: 0px;
`;

const VerticalLine = styled.div`
  display: block;
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.grayScale200};
  transition: background 0.3s;
`;

const SearchMenuWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 0px;
`;