import { createSlice } from "@reduxjs/toolkit"

type UI = {
    theme:  String | 'light' | 'dark',
}

const initialState: UI = {
    theme: localStorage.getItem('theme') ?? 'light',
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