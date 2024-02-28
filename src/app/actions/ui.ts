import { createSlice } from "@reduxjs/toolkit"

export type UITheme = 'light' | 'dark';
export type UIView = 'list' | 'gallary';

export type ModalType = 'folder/add' | 'folder/modify';
export type UIModal = { type: ModalType, active: boolean };

export interface UIState { theme:  UITheme, view: UIView, modal: UIModal, isDrag: boolean }

const initialSetting = JSON.parse(localStorage.getItem('setting') ?? '{}');

const initialState: UIState = {
  theme: initialSetting.theme || 'light',
  view: initialSetting.view || 'list',
  modal: { type: 'folder/add', active: false },
  isDrag: false,
}

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeTheme: (state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = nextTheme;
      localStorage.setItem('setting', JSON.stringify({ theme: state.theme, view: state.view }));
    },
    changeView: (state, { payload }) => {
      state.view = payload;
      localStorage.setItem('setting', JSON.stringify({ theme: state.theme, view: state.view }));
    },
    modalOff: (state) => {
      state.modal.active = false;
    },
    modalOn: (state, { payload }: { payload: ModalType }) => {
      state.modal.type = payload;
      state.modal.active = true;
    },
    toggleIsDragging: (state) => {
      state.isDrag = !state.isDrag;
    }
  }
});

export const { changeTheme, changeView, modalOn, modalOff, toggleIsDragging } = ui.actions;

export default ui.reducer;