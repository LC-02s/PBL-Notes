import { createSlice } from "@reduxjs/toolkit"
import { Folder, FolderSortType } from "../types/folder";

interface FolderState { folderList: Folder[], defaultSort: FolderSortType }

export const defaultSortType: FolderSortType = { type: 'create', sortedAt: 'desc' };

const initialData = JSON.parse(localStorage.getItem('folder') ?? '[]');
const initialSort = JSON.parse(localStorage.getItem('defaultSort') ?? String(defaultSortType));

const initialState: FolderState = {
  folderList: initialData,
  defaultSort: initialSort,
}

const folder = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    addFolder: (state, { payload } : { payload: { time: number, name: string, color: string } }) => {
      const newFolder:Folder = { 
          id: payload.time, name: payload.name, color: payload.color, sort: defaultSortType
      };
      state.folderList.push(newFolder);
      localStorage.setItem('folder', JSON.stringify(state.folderList));
    },
    modifyFolder: (state, { payload }: { payload: { targetIndex: number, name: string, color: string } }) => {
      const { targetIndex, name, color } = payload;
      if (targetIndex >= 0) {
        state.folderList[targetIndex].name = name;
        state.folderList[targetIndex].color = color;
      }
    },
    deleteFolder: (state, { payload }: { payload: number }) => {
      state.folderList = state.folderList.filter(({ id }) => id !== payload);
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
    changeFolderIndex: (state, { payload }: { payload: { targetIndex: number, destination: number } }) => {
      const { targetIndex, destination } = payload;
      if (targetIndex !== destination) {
        const newFolderList = [ ...state.folderList ];
        const [ targetFolder ] = newFolderList.splice(targetIndex, 1);
        newFolderList.splice(destination, 0, targetFolder)
        state.folderList = newFolderList;
      }
    },
  }
});

export const { addFolder, modifyFolder, deleteFolder, changeSortTypeOfFolder, changeFolderIndex } = folder.actions;

export default folder.reducer;