import React from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch } from '../../../app/hooks';
import { changeTheme } from '../../../app/actions/ui';

export default function ThemeBtn() {

    const dispatch = useAppDispatch();

    return (
        <ThemeButton title='활성 테마 변경' onClick={() => dispatch(changeTheme(undefined))}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" className="moon" viewBox="0 0 384 512">
                <path d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" className="sun" viewBox="0 0 512 512">
                <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391l-19.9 107.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.9-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1l90.3-62.3c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 11192 0 96 96 0 11-192 0zm224 0a128 128 0 10-256 0 128 128 0 10256 0z"></path>
            </svg>
        </ThemeButton>
    );
}

// styled components
const ThemeButton = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 32px;
    font-size: 20px;
    user-select: none;
    fill: ${({ theme }) => theme.grayScale500};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.grayScale000};
    transition: fill 0.5s, background 0.3s;

    &:hover,
    &:focus {background-color: ${({ theme }) => theme.grayScale100};}
    .moon {
        position: absolute;
        animation: keyframes-fill .5s;
    }
    .sun {
        position: absolute;
        display: none;
        animation: keyframes-fill .5s;
    }
    
    ${({ theme }) => theme.current === 'light' && css`
        .moon {display: none; !important}
        .sun {display: block; !important}
    `}

    /* ------ Animation ------ */
    @keyframes keyframes-fill {
        0% {transform: rotate(-360deg) scale(0); opacity: 0;}
        75% {transform: rotate(25deg);}
    }
`;
