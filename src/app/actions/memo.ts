import { createSlice } from "@reduxjs/toolkit"

export type MemoData = {
  included: string, updateAt: string, markdown: string, isPinned: boolean, isLocked: boolean 
}
export type MemoList = { [createAt: string]: MemoData }
interface MemoState {
  activeMemo: string,
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
    addMemo: (state, { payload }) => {
      const { folder, time } = payload;
      const newMemo:MemoData = {
        included: folder, updateAt: time, markdown: '', isPinned: false, isLocked: false
      }
      Object.assign(state.data, { [payload.time]: newMemo });
      localStorage.setItem('memo', JSON.stringify(state.data));
      state.activeMemo = time;
    },
    deleteMemo: (state, { payload }) => {
        
    },
    saveMemo: (state, { payload }) => {
        
    },
    clearMemo: (state, { payload }) => {
        
    },
  }
});

export const extractTitle = (str:string) => {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}

export const { addMemo, deleteMemo, saveMemo } = memo.actions;

export default memo.reducer;