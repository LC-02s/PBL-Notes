import { createSlice } from "@reduxjs/toolkit"

export type UI = {
    theme:  'light' | 'dark' | String,
    menu: {},
    modal: boolean,
    // isOpenSideBar: boolean,
}

const initialState: UI = {
    theme: localStorage.getItem('theme') ?? 'light',
    menu: {},
    modal: false,
    // isOpenSideBar: localStorage.getItem('side_bar') === 'false' ? false : true,
}

const ui = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeTheme: (state, _action?:any) => {
            const nextTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = nextTheme;
            localStorage.setItem('theme', nextTheme);
        },
        toggleModal: (state, _action?:any) => {
            state.modal = !state.modal;
        },
        // toggleSideBar: (state, _action?:any) => {
        //     const prevStatus = state.isOpenSideBar;
        //     state.isOpenSideBar = !prevStatus;
        //     localStorage.setItem('side_bar', String(!prevStatus));
        // }
    }
});

export const { changeTheme, toggleModal } = ui.actions;

export default ui.reducer;