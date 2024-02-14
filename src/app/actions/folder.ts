import { createSlice } from "@reduxjs/toolkit"
import { FolderList } from "../types/folder";

interface FolderState { folderList: FolderList }

const initialData = JSON.parse(localStorage.getItem('folder') ?? '[]');

const initialState: FolderState = {
  folderList: initialData,
}

const folder = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    addFolder: (state, { payload }) => {
      
    },
  }
});

export const { addFolder } = folder.actions;

export default folder.reducer;