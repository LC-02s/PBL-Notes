import React from 'react'
import styled from 'styled-components'
import { MenuBtn } from './Button.style';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeView } from '../../app/actions/ui';
import { resetActiveNote } from '../../app/actions/note';

export default function ViewBtns() {

  const viewType = useAppSelector(({ ui }) => ui.view);
  const { tempData } = useAppSelector(({ note }) => note);
  const isDisabled = tempData === null;
  const dispatch = useAppDispatch();

  return (
    <ViewBtnContainer>
      <MenuBtn $active={viewType === 'list'} title='목록형 보기' onClick={() => dispatch(changeView('list'))}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 9.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM5.75 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75"></path><path fill="currentColor" fillRule="evenodd" d="M9.944 2.25c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433v2.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h5.022a.768.768 0 0 0 .072-.001c1.384-.004 2.523-.027 3.451-.152c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-2.112c0-1.838 0-3.294-.153-4.433c-.158-1.172-.49-2.121-1.238-2.87c-.749-.748-1.698-1.08-2.87-1.238c-.928-.125-2.067-.148-3.45-.152a.763.763 0 0 0-.073 0l-.91-.001zm4.306 1.5H10c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.289v2c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4.25zm1.5 16.494c1.034-.01 1.858-.042 2.54-.134c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-2c0-1.907-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-.68-.092-1.505-.123-2.539-.134z" clipRule="evenodd"></path></svg>
      </MenuBtn>
      <MenuBtn $active={viewType === 'gallary'} title='갤러리형 보기' onClick={() => dispatch(changeView('gallary'))}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6.448 1.75c-.898 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.725c-.456.456-.642 1.023-.726 1.65c-.08.595-.08 1.345-.08 2.243v.104c0 .898 0 1.648.08 2.242c.084.628.27 1.195.725 1.65c.456.456 1.023.642 1.65.726c.595.08 1.345.08 2.243.08h.104c.898 0 1.648 0 2.242-.08c.628-.084 1.195-.27 1.65-.726c.456-.455.642-1.022.726-1.65c.08-.594.08-1.344.08-2.242v-.104c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08zM3.616 3.616c.13-.13.328-.237.79-.3c.482-.064 1.13-.066 2.094-.066s1.612.002 2.095.067c.461.062.659.169.789.3c.13.13.237.327.3.788c.064.483.066 1.131.066 2.095c0 .964-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789c-.13.13-.327.237-.788.3c-.483.064-1.131.066-2.095.066c-.964 0-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3c-.13-.13-.237-.327-.3-.788c-.064-.483-.066-1.131-.066-2.095c0-.964.002-1.612.067-2.095c.062-.461.169-.659.3-.789m13.831 9.134c-.899 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.726c-.456.455-.642 1.022-.726 1.65c-.08.594-.08 1.343-.08 2.242v.104c0 .899 0 1.648.08 2.242c.084.628.27 1.195.726 1.65c.455.456 1.022.642 1.65.726c.594.08 1.343.08 2.242.08h.104c.898 0 1.648 0 2.242-.08c.628-.084 1.195-.27 1.65-.726c.456-.455.642-1.022.726-1.65c.08-.594.08-1.343.08-2.242v-.104c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.343-.08-2.242-.08zm-2.832 1.866c.13-.13.328-.237.79-.3c.482-.064 1.13-.066 2.094-.066s1.612.002 2.095.066c.461.063.659.17.789.3c.13.13.237.328.3.79c.064.482.066 1.13.066 2.094s-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789c-.13.13-.327.237-.788.3c-.483.064-1.131.066-2.095.066c-.964 0-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3c-.13-.13-.237-.327-.3-.788c-.064-.483-.066-1.131-.066-2.095c0-.964.002-1.612.066-2.095c.063-.461.17-.659.3-.789M6.448 12.75h.104c.898 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.726c.456.455.642 1.022.726 1.65c.08.594.08 1.343.08 2.242v.104c0 .899 0 1.648-.08 2.242c-.084.628-.27 1.195-.726 1.65c-.455.456-1.022.642-1.65.726c-.594.08-1.343.08-2.242.08h-.104c-.898 0-1.648 0-2.242-.08c-.628-.084-1.195-.27-1.65-.726c-.456-.455-.642-1.022-.726-1.65c-.08-.594-.08-1.343-.08-2.242v-.104c0-.899 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08m-2.043 1.566c-.461.063-.659.17-.789.3c-.13.13-.237.328-.3.79c-.064.482-.066 1.13-.066 2.094s.002 1.612.067 2.095c.062.461.169.659.3.789c.13.13.327.237.788.3c.483.064 1.131.066 2.095.066c.964 0 1.612-.002 2.095-.067c.461-.062.659-.169.789-.3c.13-.13.237-.327.3-.788c.064-.483.066-1.131.066-2.095c0-.964-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789c-.13-.13-.327-.237-.788-.3c-.483-.064-1.131-.066-2.095-.066c-.964 0-1.612.002-2.095.066M17.448 1.75c-.899 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.725c-.456.456-.642 1.023-.726 1.65c-.08.595-.08 1.345-.08 2.243v.104c0 .898 0 1.648.08 2.242c.084.628.27 1.195.726 1.65c.455.456 1.022.642 1.65.726c.594.08 1.343.08 2.242.08h.104c.899 0 1.648 0 2.242-.08c.628-.084 1.195-.27 1.65-.726c.456-.455.642-1.022.726-1.65c.08-.594.08-1.344.08-2.242v-.104c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.343-.08-2.242-.08zm-2.832 1.866c.13-.13.328-.237.79-.3c.482-.064 1.13-.066 2.094-.066s1.612.002 2.095.067c.461.062.659.169.789.3c.13.13.237.327.3.788c.064.483.066 1.131.066 2.095c0 .964-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789c-.13.13-.327.237-.788.3c-.483.064-1.131.066-2.095.066c-.964 0-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3c-.13-.13-.237-.327-.3-.788c-.064-.483-.066-1.131-.066-2.095c0-.964.002-1.612.066-2.095c.063-.461.17-.659.3-.789" clipRule="evenodd"></path></svg>
      </MenuBtn>
      <MenuBtn $hidden={viewType !== 'gallary' || isDisabled} title='뒤로 가기' onClick={() => dispatch(resetActiveNote())}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081" clipRule="evenodd"></path></svg>
      </MenuBtn>
    </ViewBtnContainer>
  )
}

// styled components
const ViewBtnContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  width: auto;
  height: 100%;
`;