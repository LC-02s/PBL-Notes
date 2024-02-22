import { createSlice } from "@reduxjs/toolkit"

export type UITheme = 'light' | 'dark';
export type UIView = 'list' | 'gallary';

export interface UIState { theme:  UITheme, view: UIView, modal: boolean }

const initialSetting = JSON.parse(localStorage.getItem('setting') ?? '{}');
const initialState: UIState = {
  theme: initialSetting.theme || 'light',
  view: initialSetting.view || 'list',
  modal: false,
}

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = nextTheme;
      localStorage.setItem('setting', JSON.stringify({ theme: state.theme, view: state.view }));
    },
    changeView: (state, { payload }) => {
      state.view = payload;
      localStorage.setItem('setting', JSON.stringify({ theme: state.theme, view: state.view }));
    },
    toggleModal: (state, action) => {
      state.modal = !state.modal;
    },
  }
});

export const { changeTheme, changeView, toggleModal } = ui.actions;

export default ui.reducer;