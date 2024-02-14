import { createSlice } from "@reduxjs/toolkit"
import { Folder, FolderList } from "../types/folder";

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
      const newFolder:Folder = { 
          id: payload.time, name: payload.name, color: payload?.color ?? 'none', sort: { type: 'create', sorted: 'desc' }
      };
      state.folderList.push(newFolder);
      localStorage.setItem('folder', JSON.stringify(state.folderList));
    },
  }
});

export const { addFolder } = folder.actions;

export default folder.reducer;