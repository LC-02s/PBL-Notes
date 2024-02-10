import { createSlice } from "@reduxjs/toolkit"

export type UI = {
    theme:  'light' | 'dark' | String,
    menu: {},
    sidebar: {},
}

const initialState: UI = {
    theme: localStorage.getItem('theme') ?? 'light',
    menu: {},
    sidebar: {},
}

const ui = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeTheme: (state, _action?:any) => {
            const prevTheme = state.theme === 'light';
            state.theme = prevTheme ? 'dart' : 'light';
            localStorage.setItem('theme', prevTheme ? 'dart' : 'light');
        }
    }
});

export const { changeTheme } = ui.actions;

export default ui.reducer;