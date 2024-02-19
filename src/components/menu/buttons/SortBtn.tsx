import React, { useEffect, useRef, useState } from 'react'
import { MenuBtn } from './Button.style'
import styled from 'styled-components'
import { SortType, SortedAt } from '../../../app/types/folder';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeSortTypeOfFolder } from '../../../app/actions/folder';
import useClickOutOfElement from '../../../hooks/useElementClickOutOfArea';
import useDelay from '../../../hooks/useDelay';
import { changeCurrentNoteDataSort } from '../../../app/actions/note';
import usePathname from '../../../hooks/usePathname';

export default function SortBtn() {

  const { folderList, defaultSort } = useAppSelector(({ folder }) => folder);
  const dispatch = useAppDispatch();

  const [ , targetName, isInvaild ] = usePathname();
  const isDisabled = isInvaild || (targetName !== 'all' && !folderList.some(({ name }) => targetName === name));
  
  const [ isClicked, setIsClicked ] = useState(false);
  const [ inputRadioType, setInputRadioType ] = useState<SortType | string>('create');
  const [ inputRadioSorted, setInputRadioSorted ] = useState<SortedAt | string>('desc');

  const targetAreaRef = useRef<HTMLDivElement | null>(null);
  const isOutOfClicked = useClickOutOfElement(targetAreaRef);
  const visibleDelay = useDelay(isClicked);

  useEffect(() => {
    if (targetName === 'all') {
      setInputRadioType(defaultSort.type);
      setInputRadioSorted(defaultSort.sortedAt);
    } else {
      if (targetName === '') return;
      const targetFolderIndex = folderList.findIndex(({ name }) => name === targetName);
      if (targetFolderIndex >= 0) {
        const { type, sortedAt } = folderList[targetFolderIndex].sort;
        setInputRadioType(type);
        setInputRadioSorted(sortedAt);
      }
    }
  }, [ targetName, folderList, defaultSort ]);

  useEffect(() => { if (isOutOfClicked) { setIsClicked(false); } }, [ isOutOfClicked, setIsClicked ]);

  const handleBtnClick = () => { setIsClicked(!isClicked); }
  const handleTypeRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setInputRadioType(e.target.value); 
    dispatch(changeSortTypeOfFolder({ name: targetName, sort: { type: e.target.value, sortedAt: inputRadioSorted } }));
    dispatch(changeCurrentNoteDataSort({ name: targetName, sort: `${e.target.value}/${inputRadioSorted}` }));
  }
  const handleSortedRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setInputRadioSorted(e.target.value); 
    dispatch(changeSortTypeOfFolder({ name: targetName, sort: { type: inputRadioType, sortedAt: e.target.value } }));
    dispatch(changeCurrentNoteDataSort({ name: targetName, sort: `${inputRadioType}/${e.target.value}` }));
  }

  return (
    <SortBtnContainer ref={targetAreaRef}>
      <MenuBtn title='정렬 방식 변경' disabled={isDisabled} onClick={handleBtnClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 18V6m0 0l4 4.125M16 6l-4 4.125M8 6v12m0 0l4-4.125M8 18l-4-4.125"></path></svg>
      </MenuBtn>
      <SortBtnTool $isVisible={isClicked}>
        <div>
          <SortRadioBtn as='label' title='기준: 생성일' $active={inputRadioType === 'create'} $hidden={!visibleDelay}>
            <input name='type' type='radio' value='create' onChange={handleTypeRadioChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={12} cy={12} r={10}></circle><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5"></path></g></svg>
          </SortRadioBtn>
          <SortRadioBtn as='label' title='기준: 편집일' $active={inputRadioType === 'update'} $hidden={!visibleDelay}>
            <input name='type' type='radio' value='update' onChange={handleTypeRadioChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.68 11.333h-.75zm0 1.667l-.528.532a.75.75 0 0 0 1.056 0zm2.208-1.134A.75.75 0 1 0 4.83 10.8zM2.528 10.8a.75.75 0 0 0-1.056 1.065zm16.088-3.408a.75.75 0 1 0 1.277-.786zM12.079 2.25c-5.047 0-9.15 4.061-9.15 9.083h1.5c0-4.182 3.42-7.583 7.65-7.583zm-9.15 9.083V13h1.5v-1.667zm1.28 2.2l1.679-1.667L4.83 10.8l-1.68 1.667zm0-1.065L2.528 10.8l-1.057 1.065l1.68 1.666zm15.684-5.86A9.158 9.158 0 0 0 12.08 2.25v1.5a7.658 7.658 0 0 1 6.537 3.643zM20.314 11l.527-.533a.75.75 0 0 0-1.054 0zM18.1 12.133a.75.75 0 0 0 1.055 1.067zm3.373 1.067a.75.75 0 1 0 1.054-1.067zM5.318 16.606a.75.75 0 1 0-1.277.788zm6.565 5.144c5.062 0 9.18-4.058 9.18-9.083h-1.5c0 4.18-3.43 7.583-7.68 7.583zm9.18-9.083V11h-1.5v1.667zm-1.276-2.2L18.1 12.133l1.055 1.067l1.686-1.667zm0 1.066l1.686 1.667l1.054-1.067l-1.686-1.666zM4.04 17.393a9.197 9.197 0 0 0 7.842 4.357v-1.5a7.697 7.697 0 0 1-6.565-3.644z"></path></svg>
          </SortRadioBtn>
          <SortRadioBtn as='label' title='기준: 제목' $active={inputRadioType === 'title'} $hidden={!visibleDelay}>
            <input name='type' type='radio' value='title' onChange={handleTypeRadioChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" fillRule="evenodd" d="M7.934 2h8.132c.886 0 1.65 0 2.262.082c.655.088 1.284.287 1.793.797c.51.51.709 1.138.797 1.793C21 5.284 21 6.048 21 6.934V7.95a1 1 0 1 1-2 0V7c0-.971-.002-1.599-.064-2.061c-.059-.434-.153-.57-.229-.646c-.076-.076-.212-.17-.646-.229C17.6 4.002 16.971 4 16 4h-3v17a1 1 0 1 1-2 0V4H8c-.971 0-1.599.002-2.061.064c-.434.059-.57.153-.646.229c-.076.076-.17.212-.229.646C5.002 5.4 5 6.029 5 7v.95a1 1 0 1 1-2 0V6.934c0-.886 0-1.65.082-2.262c.088-.655.287-1.284.797-1.793c.51-.51 1.138-.709 1.793-.797C6.284 2 7.048 2 7.934 2" clipRule="evenodd"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10"></path></g></svg>
          </SortRadioBtn>
        </div>
        <div>
          <SortRadioBtn as='label' title='오름차순' $active={inputRadioSorted === 'desc'} $hidden={!visibleDelay}>
            <input name='sorted' type='radio' value='desc' onChange={handleSortedRadioChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}><path d="M4 8h9m-7 5h7m-5 5h5"></path><path strokeLinejoin="round" d="M17 20V4l3 4"></path></g></svg>
          </SortRadioBtn>
          <SortRadioBtn as='label' title='내림차순' $active={inputRadioSorted === 'asc'} $hidden={!visibleDelay}>
            <input name='sorted' type='radio' value='asc' onChange={handleSortedRadioChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}><path d="M4 16h9m-7-5h7M8 6h5"></path><path strokeLinejoin="round" d="M17 4v16l3-4"></path></g></svg>
          </SortRadioBtn>
        </div>
      </SortBtnTool>
    </SortBtnContainer>
  )
}

const SortBtnContainer = styled.div`
  position: relative;
  display: block;
  width: auto;
  height: auto;
`;

const SortBtnTool = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  right: -160%;
  bottom: -46px;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: auto;
  height: auto;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.grayScale200};
  background-color: ${({ theme }) => theme.grayScale000};
  font-size: 0px;
  visibility: ${({ $isVisible }) => $isVisible ? 'visible' : 'hidden'};
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transition: background 0.3s, border 0.3s, opacity 0.3s;

  & > div {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    width: auto;
    height: auto;
    font-size: 0px;
  }
  & > div:first-of-type::after {
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: -7px;
    width: 1px;
    height: auto;
    margin: 8px 0px;
    background-color: ${({ theme }) => theme.grayScale200};
    transition: background 0.3s;
  }
`;

const SortRadioBtn = styled(MenuBtn)`
  cursor: pointer;
  & > input {display: none;}
`;