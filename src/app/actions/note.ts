import { createSlice } from "@reduxjs/toolkit"
import { Note } from "../types/note";

// const initialBasicNote = JSON.parse(localStorage.getItem('basicNotes') ?? '[]');

const temp = [
  {createAt: 1708310444782, included: "fasdf", isLocked: false, isPinned: false, markdown: "# asdf\n\nasdf", modifiable: true, title: "asdf", updateAt: 1708310449173},
  {createAt: 1708310603468, included: "qwefasd", isLocked: false, isPinned: true, markdown: "# asdfdf\n\nasdfsadf", modifiable: true, title: "asdfdf", updateAt: 1708310607067},
  {createAt: 1708310640750, included: "fasdf", isLocked: false, isPinned: true, markdown: "# asdfasdf\n\nasdfasdfasdfsadf", modifiable: true, title: "asdfasdf", updateAt: 1708310645586},
  {createAt: 1708310675862, included: "fasdf", isLocked: false, isPinned: false, markdown: "# 12312\n\nasdfasd", modifiable: true, title: "12312", updateAt: 1708310678827},
]

interface NoteState {
  activeNoteId: number,
  tempData: Note | null,
  notes: Note[],
}

const initialState: NoteState = {
  activeNoteId: -1,
  tempData: null,
  notes: temp,
}

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addTempNote: (state, { payload }: { payload: { folder: string, time: number } }) => {
      const { folder, time } = payload;
      saveTempData(state);
      if (folder) {
        const newNote:Note = {
          included: folder, title: '', createAt: time, updateAt: time, markdown: '', 
          isPinned: false, isLocked: false, modifiable: true,
        }
        state.tempData = newNote;
        state.notes.push(newNote);
        state.activeNoteId = time;
      }
    },
    modifyTempNote: (state, { payload }: { payload: string }) => {
      if (state.tempData !== null) {
        const modifyingNote = { ...state.tempData, markdown: payload, title: extractTitle(payload) };
        const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.activeNoteId);
        state.tempData = modifyingNote;
        state.notes[targetIndex] = modifyingNote;
      }
    },
    modifyTempNoteDone: (state, { payload }: { payload: { data: string, time: number } }) => {
      const { data, time } = payload;
      if (state.tempData !== null) {
        const modifyingNote = { ...state.tempData, markdown: data, title: extractTitle(data), updateAt: time };
        const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.activeNoteId);
        state.tempData = modifyingNote;
        state.notes[targetIndex] = modifyingNote;
      }
    },
    deleteNote: (state, action) => {
      if (state.tempData !== null) {
        if (extractTitle(state.tempData.markdown) === '') {
          state.notes = state.notes.filter(({ createAt }) => createAt !== state.activeNoteId);
        } else if (state.tempData.modifiable) {
          const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.activeNoteId);
          state.notes[targetIndex].modifiable = false;
        } else {
          state.notes = state.notes.filter(({ createAt }) => createAt !== state.activeNoteId);
        }
        state.tempData = null;
        state.activeNoteId = -1;
      }
    },
    selectFolder: (state, { payload }: { payload: string }) => {
      if (payload === 'trash') saveTempData(state);
    },
    changeCurrentNoteDataSort: (state, { payload }: { payload: string }) => {
      state.notes = noteDataSort(state.notes, payload);
    },
    changeActiveNoteId: (state, { payload }: { payload: number }) => {
      saveTempData(state);
      const targetIndex = state.notes.findIndex(({ createAt }) => createAt === payload);
      state.tempData = state.notes[targetIndex];
      state.activeNoteId = payload;
    },
    changePinnedState: (state, action) => {
      if (state.tempData !== null) {
        const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
        state.tempData.isPinned = !state.tempData.isPinned;
        state.notes[targetIndex].isPinned = state.tempData.isPinned;
      }
    },
    changeLockedState: (state, action) => {
      if (state.tempData !== null) {
        const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
        state.tempData.isLocked = !state.tempData.isLocked;
        state.notes[targetIndex].isLocked = state.tempData.isLocked;
      }
    },
    clickedViewBtnBack: (state, action) => { saveTempData(state); },
  }
});

export const { addTempNote, modifyTempNote, modifyTempNoteDone, deleteNote, selectFolder, changeCurrentNoteDataSort, changeActiveNoteId, changePinnedState, changeLockedState, clickedViewBtnBack } = note.actions;

export default note.reducer;

export const noteDataSort = (data: Note[], sortType: string | null) => {
  const sortedData = [...data];
  switch (sortType) {
    case 'create/desc':
      sortedData.sort((a, b) => Number(a.createAt) - Number(b.createAt));
      break;
    case 'create/asc':
      sortedData.sort((a, b) => Number(b.createAt) - Number(a.createAt));
      break;
    case 'update/desc':
      sortedData.sort((a, b) => Number(a.updateAt) - Number(b.updateAt));
      break;
    case 'update/asc':
      sortedData.sort((a, b) => Number(b.updateAt) - Number(a.updateAt));
      break;
    case 'title/desc':
      sortedData.sort((a, b) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0));
      break;
    case 'title/asc':
      sortedData.sort((a, b) => a.title < b.title ? 1 : (a.title > b.title ? -1 : 0));
      break;
    default:
      sortedData.sort((a, b) => Number(a.createAt) - Number(b.createAt));
  }
  return sortedData;
}

export const extractTitle = (str:string) => {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}

const saveTempData = (state: NoteState) => {
  if (state.tempData !== null && state.tempData.modifiable) {
    if (extractTitle(state.tempData.markdown) === '') {
      state.notes = state.notes.filter(({ createAt }) => createAt !== state.tempData?.createAt);
    } else {
      const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
      state.notes[targetIndex] = state.tempData;
    }
  }
  state.tempData = null;
  state.activeNoteId = -1;
}