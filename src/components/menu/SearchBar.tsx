import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../app/hooks'

export default function SearchBar() {

  const { notes } = useAppSelector(({ note }) => note);

  const [ inputValue, setInputValue ] = useState('');
  const [ isFouced, setIsFouced ] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 검색 관련 로직
    console.log(notes.filter(({ title, modifiable }) => modifiable && title.includes(e.target.value)));
  }
  console.log(isFouced);

  return (
    <SearchContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5M1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.21 10.21 0 0 1 11.5 21.75c-5.66 0-10.25-4.59-10.25-10.25" clipRule="evenodd"></path></svg>
      <input type='search' placeholder='검색어를 입력해주세요' value={inputValue} onChange={handleInputChange} onFocus={() => setIsFouced(true)} onBlur={() => setIsFouced(false)} />
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  position: relative;
  display: block;
  width: auto;
  height: auto;
  font-size: 16px;
  color: ${({ theme }) => theme.grayScale500};
  transition: color 0.3s;

  svg {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 8px;
    margin: auto 0px;
  }
  input {
    display: block;
    width: 100%;
    max-width: 280px;
    min-width: 200px;
    height: 32px;
    padding: 4px 4px 4px 32px;
    border: 1px solid ${({ theme }) => theme.grayScale100};
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale700};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.grayScale100};
    outline: none;
    transition: background 0.3s, border 0.3s, box-shadow 0.3s;
  }
  input::placeholder {color: ${({ theme }) => theme.grayScale400};}
  input:focus {
    background-color: ${({ theme }) => theme.grayScale000};
    border-color: ${({ theme }) => theme.grayScale200};
    /* border-color: #3B84D8; */
    /* box-shadow: 0px 0px 0px 2px rgba(59,132,216,0.3); */
  }
`;
