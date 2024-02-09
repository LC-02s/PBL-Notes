import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ThemeBtn from './components/ThemeBtn';
import { useAppSelector } from './app/hooks';
import { lightTheme, darkTheme } from './theme';


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
            <SideBarWrapper>sidebar(folder)</SideBarWrapper>
            <ContentsWrapper>
                <section>menubar</section>
                <section>memo</section>
            </ContentsWrapper>
            <ThemeBtnWrapper><ThemeBtn /></ThemeBtnWrapper>
        </ThemeProvider>
    );
}

const SideBarWrapper = styled.section`
    display: block;
    width: 200px;
    height: 100%;
    padding: 12px;
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