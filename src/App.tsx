import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ThemeBtn from './components/ThemeBtn';
import { useAppSelector } from './app/hooks';
import { lightTheme, darkTheme } from './App.theme';
import FolderList from './components/folder/FolderList';
import FolderAddBtn from './components/folder/FolderAddBtn';


export default function App() {

    const currentTheme = useAppSelector(({ ui }) => ui.theme) === 'light';

    useEffect(() => {
        if (currentTheme) {
            document.body.classList.remove('darkTheme');
        } else {
            document.body.classList.add('darkTheme');
        }
    }, [currentTheme]);

    return (
        <ThemeProvider theme={currentTheme ? lightTheme : darkTheme}>
            <SideBarWrapper>
                <div><FolderList /></div>
                <div><FolderAddBtn /></div>
            </SideBarWrapper>
            <ContentsWrapper>
                <section>menubar</section>
                <section>memo</section>
            </ContentsWrapper>
            <ThemeBtnWrapper><ThemeBtn /></ThemeBtnWrapper>
        </ThemeProvider>
    );
}

// styled components
const SideBarWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
    width: 240px;
    height: 100%;

    & > div {
        display: block;
        width: 100%;
        height: auto;
    }
    & > div:first-of-type {flex: 1; overflow-y: auto;}
    & > div:last-of-type {padding: 12px;}
`;

const ContentsWrapper = styled.article`
    flex: 1;
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.grayScale000};
    transition: background 0.3s;
`;

const ThemeBtnWrapper = styled.div`
    position: absolute;
    z-index: 999;
    bottom: 12px;
    right: 12px;
    display: inline-block;
    width: auto;
    height: auto;
    font-size: 0px;
`;