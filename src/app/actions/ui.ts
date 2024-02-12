import { createSlice } from "@reduxjs/toolkit"

export type UI = {
  theme:  'light' | 'dark' | String,
  view: 'list' | 'gallary' | string,
  modal: boolean,
  // isOpenSideBar: boolean,
}

const initialSetting = JSON.parse(localStorage.getItem('setting') ?? '{}');
const initialState: UI = {
  theme: initialSetting.theme || 'light',
  view: initialSetting.view || 'list',
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
      localStorage.setItem('setting', JSON.stringify({ theme: state.theme, view: state.view }));
    },
    changeView: (state, { payload }) => {
      state.view = payload;
      localStorage.setItem('setting', JSON.stringify({ theme: state.theme, view: state.view }));
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

export const { changeTheme, changeView, toggleModal } = ui.actions;

export default ui.reducer;