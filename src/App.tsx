import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAppSelector } from './app/hooks';
import { lightTheme, darkTheme } from './App.theme';
import MenuBar from './components/menu/MenuBar';
import Modal from './components/Modal';
import SideBar from './components/SideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import NoteView from './components/note/NoteView';


export default function App() {

    const currentTheme = useAppSelector(({ ui }) => ui.theme) === 'light';

    useEffect(() => {
      if (currentTheme) document.body.classList.remove('darkTheme'); 
      else document.body.classList.add('darkTheme');
    }, [currentTheme]);

    return (
      <ThemeProvider theme={currentTheme ? lightTheme : darkTheme}>
        <SideBar />
        <ContentsWrapper>
          <section><MenuBar /></section>
          <section>
            <Routes>
              <Route path='/' element={<NoteView />} />
              <Route path='/archive' element={<NoteView />} />
              <Route path='/trash' element={<NoteView />} />
              <Route path='/tag/:name' element={<NoteView />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </section>
        </ContentsWrapper>
        <ModalWrapper><Modal /></ModalWrapper>
      </ThemeProvider>
    );
}

// styled components
const ContentsWrapper = styled.article`
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 100%;
    border-left: 1px solid ${({ theme }) => theme.grayScale200};
    background-color: ${({ theme }) => theme.grayScale000};
    transition: background 0.3s, border 0.3s;

    & > section:first-of-type {display: block; width: 100%; height: 48px;}
    & > section:last-of-type {flex: 1; display: block; width: 100%; height: 100%; max-height: calc(100% - 48px);}
`;

const ModalWrapper = styled.div`
    position: absolute;
    z-index: 99999;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`;