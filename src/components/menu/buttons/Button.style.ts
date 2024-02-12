import styled, { css } from "styled-components";

export const MenuBtn = styled.button<{ $active?: boolean, $hidden?: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 32px;
    font-size: 20px;
    color: ${({ theme }) => theme.grayScale600};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.grayScale000};
    opacity: 1;
    visibility: visible;
    transition: background 0.3s, color 0.5s, opacity 0.5s;
    ${({ $active }) => $active && css`
        background-color: ${({ theme }) => theme.grayScale100};
        svg:first-of-type {opacity: 0;}
        svg:last-of-type {opacity: 1;}
    `}
    ${({ $hidden }) => $hidden && css`
        opacity: 0;
        visibility: hidden;
    `}

    &:hover,
    &:focus {background-color: ${({ theme }) => theme.grayScale100};}
    &:disabled {color: ${({ theme }) => theme.grayScale400};}
    &:disabled:hover,
    &:disabled:focus {background-color: ${({ theme }) => theme.grayScale000};}
`;

export const MenuToggleBtn = styled(MenuBtn)`
    position: relative;
    svg {position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; margin: auto; transition: opacity 0.2s;}
    svg:last-of-type {opacity: 0;}
    ${({ $active }) => $active && css`
        background-color: ${({ theme }) => theme.grayScale100};
        svg:first-of-type {opacity: 0;}
        svg:last-of-type {opacity: 1;}
    `}
`;