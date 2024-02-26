import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Folder, FolderSortType } from "../types/folder";
import { getDataFromDB, saveDataToDB } from "../database";

export const getFoldersFromDB = createAsyncThunk(
  'note/getFoldersFromDB',
  async () => {
    try {
      const data: Folder[] = await getDataFromDB('folders');
      return { data, status: true, errCode: null }
    } 
    catch(err) { return { data: null, status: false, errCode: err } }
  }
);

interface FolderState { 
  folderSession: boolean, 
  folderStatus: 'pending' | 'fulfilled' | 'rejected', 
  folderList: Folder[], 
  defaultSort: FolderSortType 
}

export const defaultSortType: FolderSortType = { type: 'create', sortedAt: 'desc' };

const initialSort = JSON.parse(localStorage.getItem('defaultSort') ?? JSON.stringify(defaultSortType));

const initialState: FolderState = {
  folderSession: false,
  folderStatus: 'pending',
  folderList: [],
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
      saveDataToDB('folders', state.folderList);
    },
    modifyFolder: (state, { payload }: { payload: { targetIndex: number, name: string, color: string } }) => {
      const { targetIndex, name, color } = payload;
      if (targetIndex >= 0) {
        state.folderList[targetIndex].name = name;
        state.folderList[targetIndex].color = color;
        saveDataToDB('folders', state.folderList);
      }
    },
    deleteFolder: (state, { payload }: { payload: number }) => {
      state.folderList = state.folderList.filter(({ id }) => id !== payload);
      saveDataToDB('folders', state.folderList);
    },
    changeSortTypeOfFolder: (state, { payload }) => {
      if (payload.name === '') {
        state.defaultSort = payload.sort;
        localStorage.setItem('defaultSort', JSON.stringify(state.defaultSort));
      } else {
        const targetFolderIndex = state.folderList.findIndex(({ name }) => name === payload.name);
        state.folderList[targetFolderIndex].sort = payload.sort;
        saveDataToDB('folders', state.folderList);
      }
    },
    changeFolderIndex: (state, { payload }: { payload: { targetIndex: number, destination: number } }) => {
      const { targetIndex, destination } = payload;
      if (targetIndex !== destination) {
        const newFolderList = [ ...state.folderList ];
        const [ targetFolder ] = newFolderList.splice(targetIndex, 1);
        newFolderList.splice(destination, 0, targetFolder)
        state.folderList = newFolderList;
        saveDataToDB('folders', state.folderList);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFoldersFromDB.pending, (state) => {
        state.folderStatus = 'pending';
      })
      .addCase(getFoldersFromDB.fulfilled, (state, { payload }) => {
        state.folderList = payload.data ?? [];
        state.folderSession = true;
        state.folderStatus = 'fulfilled';
      })
      .addCase(getFoldersFromDB.rejected, (state) => {
        state.folderList = [];
        state.folderSession = true;
        state.folderStatus = 'rejected';
      })
  },
});

export const { addFolder, modifyFolder, deleteFolder, changeSortTypeOfFolder, changeFolderIndex } = folder.actions;

export default folder.reducer;