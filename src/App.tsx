import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { lightTheme, darkTheme } from './App.theme';
import { Route, Routes } from 'react-router-dom';
import { getNotesFromDB } from './app/actions/note';
import { getFoldersFromDB } from './app/actions/folder';
import Folder from './components/folder';
import Menu from './components/menu';
import Note from './components/note';
import Modal from './components/Modal';
import NotFound from './components/NotFound';


export default function App() {

    const currentTheme = useAppSelector(({ ui }) => ui.theme) === 'light';
    const { noteSession } = useAppSelector(({ note }) => note);
    const { folderSession } = useAppSelector(({ folder }) => folder);

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!folderSession) dispatch(getFoldersFromDB());
      if (folderSession && !noteSession) dispatch(getNotesFromDB());
    }, [ noteSession, folderSession, dispatch ]);

    useEffect(() => {
      if (currentTheme) document.body.classList.remove('darkTheme'); 
      else document.body.classList.add('darkTheme');
    }, [currentTheme]);

    return (
      <ThemeProvider theme={currentTheme ? lightTheme : darkTheme}>
        <Folder />
        <ContentsWrapper>
          <section><Menu /></section>
          <section>
            <Routes>
              <Route path='/' element={<Note />} />
              <Route path='/trash' element={<Note />} />
              <Route path='/folder/:name' element={<Note />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </section>
        </ContentsWrapper>
        <Modal />
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