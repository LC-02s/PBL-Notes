import { createSlice } from "@reduxjs/toolkit"

export type UI = {
    theme:  'light' | 'dark' | String,
    menu: {},
    isOpenSideBar: boolean,
}

const initialState: UI = {
    theme: localStorage.getItem('theme') ?? 'light',
    menu: {},
    isOpenSideBar: localStorage.getItem('side_bar') === 'false' ? false : true,
}

const ui = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeTheme: (state, _action?:any) => {
            const prevTheme = state.theme === 'light';
            state.theme = prevTheme ? 'dart' : 'light';
            localStorage.setItem('theme', prevTheme ? 'dart' : 'light');
        },
        toggleSideBar: (state, _action?:any) => {
            const prevStatus = state.isOpenSideBar;
            state.isOpenSideBar = !prevStatus;
            localStorage.setItem('side_bar', String(!prevStatus));
        }
    }
});

export const { changeTheme } = ui.actions;

export default ui.reducer;