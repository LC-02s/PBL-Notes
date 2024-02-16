import React from 'react'
import { MenuBtn } from './Button.style'
import styled from 'styled-components'

export default function SortBtn() {
  return (
    <SortBtnContainer>
      <MenuBtn title='정렬 방식 변경'>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 18V6m0 0l4 4.125M16 6l-4 4.125M8 6v12m0 0l4-4.125M8 18l-4-4.125"></path></svg>
      </MenuBtn>
    </SortBtnContainer>
  )
}

const SortBtnContainer = styled.div`
  position: relative;
  display: block;
  width: auto;
  height: auto;
`;
