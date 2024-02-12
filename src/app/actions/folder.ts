import { createSlice } from "@reduxjs/toolkit"

export type ColorChip = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'none';
export type SortType = { type: 'create' | 'update' | 'title' | string, sort: 'desc' | 'asc' | string };
export type FolderDetail = { index: Number, colorChip: ColorChip, length: Number, sort: SortType };
export type FolderData = { [key: string] : FolderDetail } | {};
export type FolderDataKey = keyof FolderData | ''

interface FolderState {
  activeFolder: FolderDataKey,
  data: FolderData,
  dataLength: Number,
}

const initialData = JSON.parse(localStorage.getItem('folder') ?? '{}');

const initialState: FolderState = {
  activeFolder: '',
  data: initialData,
  dataLength: Object.keys(initialData).length,
}

const folder = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setActiveFolder: (state, { payload }) => {
      state.activeFolder = payload || '';
    },
    addFolder: (state, { payload }) => {
      const { dataLength } = state;
      const sort = { type: 'create', sort: 'desc' };
      const newFolder:FolderDetail = { 
          index: dataLength, colorChip: payload?.color ?? 'none', length: 0, sort
      };
      Object.assign(state.data, { [payload.id]: newFolder });
      state.dataLength = Number(dataLength) + 1;
      localStorage.setItem('folder', JSON.stringify(state.data));
    },
  }
});

export const { setActiveFolder, addFolder } = folder.actions;

export default folder.reducer;