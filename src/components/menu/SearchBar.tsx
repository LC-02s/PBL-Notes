import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Note } from '../../app/types/note';
import { changeActiveNoteId } from '../../app/actions/note';
import useClickOutOfElement from '../../hooks/useElementClickOutOfArea';

export default function SearchBar() {

  const { notes } = useAppSelector(({ note }) => note);
  const dispatch = useAppDispatch();

  const [ inputValue, setInputValue ] = useState('');
  const [ isFouced, setIsFouced ] = useState(false);
  const [ searchResult, setSearchResult ] = useState<Note[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchArea = useRef<HTMLDivElement | null>(null);

  const isOutOfClicked = useClickOutOfElement(searchArea);
  useEffect(() => { if (isOutOfClicked) { setIsFouced(false); } }, [ isOutOfClicked, setIsFouced ]);

  const initState = () => { setInputValue(''); setSearchResult([]); }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setSearchResult(value ? notes.filter(({ title, modifiable }) => modifiable && title.includes(e.target.value)) : []);
  }
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Tab' && e.shiftKey) setIsFouced(false);
  }
  const handleInitSearchValueBtnClick = () => {
    initState();
    inputRef.current?.focus();
  }
  const handleInitSearchValueBtnBlur = () => {
    if (searchResult.length === 0) setIsFouced(false);
  }
  const handleSearchResultBtnClick = (id: number) => {
    initState();
    dispatch(changeActiveNoteId(id));
    inputRef.current?.blur();
  }
  const handleSearchResultBtnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.code === 'Tab' && e.shiftKey) return;
    else if (e.code === 'Tab' && index === searchResult.length - 1) setIsFouced(false);
  }

  return (
    <SearchContainer ref={searchArea} $isFocused={isFouced}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5M1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.21 10.21 0 0 1 11.5 21.75c-5.66 0-10.25-4.59-10.25-10.25" clipRule="evenodd"></path></svg>
      <input type='text' placeholder='검색어를 입력해주세요' ref={inputRef} value={inputValue} onChange={handleInputChange} onFocus={() => setIsFouced(true)} onKeyDown={handleInputKeyDown} />
      <button type='button' disabled={inputValue ? false : true} onClick={handleInitSearchValueBtnClick} onBlur={handleInitSearchValueBtnBlur}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M11.142 20c-2.227 0-3.341 0-4.27-.501c-.93-.502-1.52-1.42-2.701-3.259l-.681-1.06C2.497 13.634 2 12.86 2 12c0-.86.497-1.634 1.49-3.18l.68-1.06c1.181-1.838 1.771-2.757 2.701-3.259C7.801 4 8.915 4 11.142 4h2.637c3.875 0 5.813 0 7.017 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.204 6.828C19.592 20 17.654 20 13.78 20z"></path><path strokeLinecap="round" d="m15.5 9.5l-5 5m0-5l5 5"></path></g></svg>
      </button>
      <SearchResultContainer $active={isFouced && inputValue !== ''}>
        {
        searchResult.length > 0 ? 
          <ul>
            { searchResult.map(({ title, createAt }, idx) => (<li key={String(createAt)}>
              <button type='button' onClick={() => handleSearchResultBtnClick(createAt)} onKeyDown={(e) => handleSearchResultBtnKeyDown(e, idx)}>
                { title }
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="m16.394 2.021l.066.018c1.1.295 1.971.528 2.656.776c.701.253 1.273.542 1.744.983a4.75 4.75 0 0 1 1.378 2.389c.147.628.112 1.268-.02 2.001c-.127.718-.36 1.589-.655 2.688l-.536 1.999c-.294 1.099-.528 1.97-.775 2.656c-.254.7-.543 1.272-.984 1.743a4.75 4.75 0 0 1-2.302 1.358a4.75 4.75 0 0 1-1.106 1.567c-.471.441-1.043.73-1.744.984c-.685.248-1.556.481-2.655.776l-.067.018c-1.1.294-1.97.527-2.688.656c-.733.131-1.373.166-2.002.02a4.75 4.75 0 0 1-2.388-1.38c-.44-.47-.73-1.042-.984-1.743c-.247-.685-.48-1.556-.775-2.656l-.536-1.998c-.294-1.1-.528-1.97-.656-2.688c-.131-.733-.166-1.373-.02-2.002a4.75 4.75 0 0 1 1.38-2.388c.47-.44 1.042-.73 1.743-.984c.685-.247 1.556-.48 2.655-.775l.034-.01l.751-.2c.392-1.399.736-2.388 1.408-3.105a4.75 4.75 0 0 1 2.388-1.379c.629-.146 1.268-.111 2.002.02c.717.128 1.588.362 2.688.656M7.455 7.503c-1.093.293-1.876.505-2.478.722c-.61.22-.967.424-1.227.668a3.25 3.25 0 0 0-.944 1.634c-.08.348-.079.76.036 1.397c.115.647.332 1.457.637 2.597l.518 1.932c.305 1.14.523 1.95.746 2.567c.22.61.424.968.668 1.228a3.25 3.25 0 0 0 1.634.944c.347.08.76.078 1.397-.036c.647-.115 1.457-.332 2.597-.637c1.14-.306 1.95-.523 2.568-.747c.609-.22.967-.424 1.227-.667c.138-.13.263-.27.376-.419a10.077 10.077 0 0 1-.554-.095c-.672-.134-1.48-.35-2.475-.617l-.058-.015c-1.099-.295-1.97-.528-2.655-.776c-.701-.253-1.273-.542-1.744-.983a4.75 4.75 0 0 1-1.379-2.389c-.146-.628-.111-1.268.02-2.001c.128-.718.362-1.589.656-2.688zm5.987-4.661c-.638-.115-1.05-.117-1.397-.036a3.25 3.25 0 0 0-1.634.944c-.436.465-.705 1.185-1.171 2.893c-.076.278-.156.577-.243.902l-.518 1.932c-.305 1.14-.522 1.95-.637 2.597c-.115.637-.117 1.05-.036 1.397a3.25 3.25 0 0 0 .944 1.634c.26.244.618.447 1.227.668c.618.223 1.428.44 2.568.746c1.025.275 1.785.478 2.403.6c.615.123 1.033.153 1.375.111c.075-.01.146-.022.216-.038a3.25 3.25 0 0 0 1.634-.944c.244-.26.448-.618.668-1.227c.223-.618.44-1.428.746-2.568l.518-1.932c.305-1.14.522-1.95.637-2.597c.114-.637.117-1.05.036-1.397a3.25 3.25 0 0 0-.944-1.634c-.26-.244-.618-.447-1.227-.668c-.619-.223-1.428-.44-2.568-.746c-1.14-.305-1.95-.522-2.597-.637m-2.39 6.964a.75.75 0 0 1 .919-.53l4.83 1.294a.75.75 0 0 1-.389 1.448l-4.83-1.294a.75.75 0 0 1-.53-.918m-.777 2.898a.75.75 0 0 1 .92-.53l2.897.776a.75.75 0 0 1-.388 1.449l-2.898-.777a.75.75 0 0 1-.53-.918" clipRule="evenodd"></path></svg>
              </button>
            </li>)) } 
          </ul> :
          <p>검색결과가 없습니다</p>
        }
      </SearchResultContainer>
    </SearchContainer>
  )
}

// styled components
const SearchContainer = styled.div<{ $isFocused: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  max-width: 280px;
  min-width: 200px;
  height: auto;
  font-size: 16px;
  color: ${({ theme }) => theme.grayScale500};
  transition: color 0.3s;

  & > svg {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 8px;
    margin: auto 0px;
  }
  input {
    display: block;
    width: 100%;
    height: 32px;
    padding: 4px 28px 4px 32px;
    border: 1px solid ${({ theme }) => theme.grayScale100};
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale700};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.grayScale100};
    outline: none;
    transition: color 0.3s, background 0.3s, border 0.3s, box-shadow 0.3s;
    ${({ $isFocused }) => $isFocused && css`
      background-color: ${({ theme }) => theme.grayScale000};
      border-color: ${({ theme }) => theme.grayScale200};
    `}
  }
  input:focus {border-color: #3B84D8;}
  input::placeholder {color: ${({ theme }) => theme.grayScale400};}

  & > button {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: fit-content;
    padding: 2px;
    margin: auto 0px;
    transition: all 0.3s;

    svg {font-size: 18px;}
  }
  & > button:disabled {
    display: none;
  }
`;

const SearchResultContainer = styled.div<{ $active: boolean }>`
  position: absolute;
  z-index: 9;
  top: 36px;
  left: 0px;
  right: 0px;
  display: inline-block;
  max-height: 240px;
  background-color: ${({ theme }) => theme.grayScale000};
  border: 1px solid ${({ theme }) => theme.grayScale200};
  border-radius: 4px;
  overflow-y: auto;
  visibility: ${({ $active }) => $active ? 'visible' : 'hidden'};
  transition: background 0.3s, border 0.3s;

  ul {padding: 6px 8px;}
  ul, li {
    display: block;
    width: 100%;
    height: auto;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 24px 12px;
    font-size: 14px;
    font-weight: 400;
    color: inherit;
    text-align: center;
  }
  button {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 8px 32px 8px 8px;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale600};
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 4px;
    transition: background 0.3s, color 0.3s;
    svg {
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 8px;
      margin: auto 0px;
      font-size: 18px;
      color: ${({ theme }) => theme.grayScale500};
      visibility: hidden;
      transition: color 0.3s;
    }
  }
  button:hover,
  button:focus {
    background-color: ${({ theme }) => theme.grayScale100};
    svg {visibility: visible;}
  }
`;