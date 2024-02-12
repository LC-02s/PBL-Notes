import React from 'react'
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../app/actions/ui';

export default function FolderAddBtn() {

  const dispatch = useAppDispatch();

  return (
    <FolderAddButton onClick={() => dispatch(toggleModal(undefined))}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" d="M10 14h2m0 0h2m-2 0v2m0-2v-2"></path><path d="M2 6.95c0-.883 0-1.324.07-1.692A4 4 0 0 1 5.257 2.07C5.626 2 6.068 2 6.95 2c.386 0 .58 0 .766.017a4 4 0 0 1 2.18.904c.144.119.28.255.554.529L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.352C14.098 6 14.675 6 15.828 6h.374c2.632 0 3.949 0 4.804.77c.079.07.154.145.224.224c.77.855.77 2.172.77 4.804V14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z"></path></g></svg>
      <span>New Folder</span>
    </FolderAddButton>
  )
}

// styled components
const FolderAddButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  width: auto;
  height: auto;
  padding: 4px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.grayScale500};
  transition: color 0.3s;

  &:hover,
  &:focus {color: #3B84D8;}
  & > svg {transition: fill 0.3s;}
  & > span {
    font-size: 14px;
    font-weight: inherit;
    color: inherit;
  }
`;