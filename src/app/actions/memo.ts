import { createSlice } from "@reduxjs/toolkit"
import { FolderData } from "./folder";

export type MemoData = {
  included: keyof FolderData, title: string, updateAt: string, markdown: string, isPinned: boolean, isLocked: boolean 
}
export type MemoList = { [createAt: string]: MemoData }
interface MemoState {
  activeMemo: keyof MemoList | '',
  data: MemoList,
  dataLength: number,
}

const initialData = JSON.parse(localStorage.getItem('memo') ?? '{}');

const initialState: MemoState = {
  activeMemo: '',
  data: initialData,
  dataLength: Object.keys(initialData).length,
}

const memo = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setActiveMemo: (state, { payload }: { payload: keyof MemoList }) => {
      // state.activeMemo = payload
    },
    addMemo: (state, { payload }: { payload: { id: keyof MemoList, time: string, folder: keyof FolderData } }) => {
      const { id, folder, time } = payload;
      const newMemo:MemoData = {
        included: folder, title: '', updateAt: time, markdown: '', isPinned: false, isLocked: false
      }
      Object.assign(state.data, { [id]: newMemo });
      localStorage.setItem('memo', JSON.stringify(state.data));
      state.dataLength += 1;
      state.activeMemo = id;
    },
    deleteMemo: (state, { payload }) => {
        
    },
    modifyMemo: (state, { payload }: { payload: { id: string, data: string, time: string } }) => {
      state.data[payload.id].title = extractTitle(payload.data);
      state.data[payload.id].markdown = payload.data;
      state.data[payload.id].updateAt = payload.time;
      localStorage.setItem('memo', JSON.stringify(state.data));
    },
    toggleMemoLock: (state, { payload }: { payload: keyof MemoList } ) => {
      state.data[payload].isLocked = !state.data[payload].isLocked;
    },
    toggleMemoPin: (state, { payload }: { payload: keyof MemoList } ) => {
      state.data[payload].isPinned = !state.data[payload].isPinned;
    },
    clearMemo: (state, { payload }) => {
        
    },
  }
});

export const extractTitle = (str:string) => {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}

export const { setActiveMemo, addMemo, deleteMemo, modifyMemo, toggleMemoLock, toggleMemoPin, clearMemo } = memo.actions;

export default memo.reducer;