import { createSlice } from "@reduxjs/toolkit"

export type UITheme = 'light' | 'dark';
export type UIView = 'list' | 'gallary';
export type ModalType = 'folder/add' | 'folder/modify';
export type UIModal = { type: ModalType, active: boolean };

export interface UIState { theme:  UITheme, view: UIView, modal: UIModal, tutorial: boolean }

const initialSetting = JSON.parse(localStorage.getItem('setting') ?? '{}');
const initialState: UIState = {
  theme: initialSetting.theme || 'light',
  view: initialSetting.view || 'list',
  modal: { type: 'folder/add', active: false },
  tutorial: false,
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
    modalOff: (state, action) => {
      state.modal.active = false;
    },
    modalOn: (state, { payload }: { payload: ModalType }) => {
      state.modal.type = payload;
      state.modal.active = true;
    },
  }
});

export const { changeTheme, changeView, modalOn, modalOff } = ui.actions;

export default ui.reducer;