import { createSlice } from "@reduxjs/toolkit"
import { Folder, FolderList, FolderSortType } from "../types/folder";

interface FolderState { folderList: FolderList, defaultSort: FolderSortType, activeFolderId: number }

const initialData = JSON.parse(localStorage.getItem('folder') ?? '[]');
const initialSort = JSON.parse(localStorage.getItem('defaultSort') ?? '{"type":"create","sortedAt":"desc"}');

const initialState: FolderState = {
  folderList: initialData,
  defaultSort: initialSort,
  activeFolderId: -1,
}

const folder = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    addFolder: (state, { payload }) => {
      const newFolder:Folder = { 
          id: payload.time, name: payload.name, color: payload?.color ?? 'none', sort: { type: 'create', sortedAt: 'desc' }
      };
      state.folderList.push(newFolder);
      localStorage.setItem('folder', JSON.stringify(state.folderList));
    },
    changeSortTypeOfFolder: (state, { payload }) => {
      if (payload.name === '') {
        state.defaultSort = payload.sort;
        localStorage.setItem('defaultSort', JSON.stringify(state.defaultSort));
      } else {
        const targetFolderIndex = state.folderList.findIndex(({ name }) => name === payload.name);
        state.folderList[targetFolderIndex].sort = payload.sort;
        localStorage.setItem('folder', JSON.stringify(state.folderList));
      }
    },
  }
});

export const { addFolder, changeSortTypeOfFolder } = folder.actions;

export default folder.reducer;