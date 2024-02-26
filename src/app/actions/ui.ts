import { createSlice } from "@reduxjs/toolkit"

export type UITheme = 'light' | 'dark';
export type UIView = 'list' | 'gallary';

export type ModalType = 'folder/add' | 'folder/modify';
export type UIModal = { type: ModalType, active: boolean };

export type UIConfirm = { active: boolean, text: string, callback: (() => void) | null }

export interface UIState { theme:  UITheme, view: UIView, modal: UIModal, confirm: UIConfirm }

const initialSetting = JSON.parse(localStorage.getItem('setting') ?? '{}');

const initialState: UIState = {
  theme: initialSetting.theme || 'light',
  view: initialSetting.view || 'list',
  modal: { type: 'folder/add', active: false },
  confirm: { active: false, text: '', callback: null },
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
    useConfirm: (state, { payload }: { payload: () => void }) => {
      state.confirm.active = true;
      state.confirm.callback = payload;
    },
    checkConfirm: (state, action) => {
      const { callback } = state.confirm;
      if (callback !== null) { callback(); state.confirm = initialState.confirm; }
    },
    cancelConfirm: (state, action) => {
      state.confirm = initialState.confirm;
    },
  }
});

export const { changeTheme, changeView, modalOn, modalOff, useConfirm, checkConfirm, cancelConfirm } = ui.actions;

export default ui.reducer;