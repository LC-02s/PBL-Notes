import { createSlice } from "@reduxjs/toolkit"
import { Note, NoteList } from "../types/note";

// const initialBasicNote = JSON.parse(localStorage.getItem('basicNotes') ?? '[]');
const initialArchiveNote = JSON.parse(localStorage.getItem('archiveNotes') ?? '[]');
const initialDeletedNote = JSON.parse(localStorage.getItem('deletedNotes') ?? '[]');

const temp = [
  {createAt: 1708310444782, included: "fasdf", isLocked: false, isPinned: false, markdown: "# asdf\n\nasdf", modifiable: true, title: "asdf", updateAt: 1708310449173},
  {createAt: 1708310603468, included: "qwefasd", isLocked: false, isPinned: true, markdown: "# asdfdf\n\nasdfsadf", modifiable: true, title: "asdfdf", updateAt: 1708310607067},
  {createAt: 1708310640750, included: "fasdf", isLocked: false, isPinned: true, markdown: "# asdfasdf\n\nasdfasdfasdfsadf", modifiable: true, title: "asdfasdf", updateAt: 1708310645586},
  {createAt: 1708310675862, included: "fasdf", isLocked: false, isPinned: false, markdown: "# 12312\n\nasdfasd", modifiable: true, title: "12312", updateAt: 1708310678827},
]

interface NoteState {
  activeNoteId: number,
  tempData: Note | null,
  basicNotes: NoteList,
  archiveNotes: NoteList,
  deletedNotes: NoteList,
}

const initialState: NoteState = {
  activeNoteId: -1,
  tempData: null,
  basicNotes: temp,
  archiveNotes: initialArchiveNote,
  deletedNotes: initialDeletedNote,
}

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addTempNote: (state, { payload }) => {
      const { folder, time }: { folder: string, time: number } = payload;
      saveTempData(state);
      const newNote:Note = {
        included: folder, title: '', createAt: time, updateAt: time, markdown: '', isPinned: false, isLocked: false, modifiable: true
      }
      state.tempData = newNote;
      state.basicNotes.push(newNote);
      state.activeNoteId = time;
    },
    modifyTempNote: (state, { payload }: { payload: string }) => {
      if (state.tempData !== null) {
        const modifyingNote = { ...state.tempData, markdown: payload, title: extractTitle(payload) };
        const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.activeNoteId);
        state.tempData = modifyingNote;
        state.basicNotes[targetIndex] = modifyingNote;
      }
    },
    modifyTempNoteDone: (state, { payload }) => {
      const { data, time }: { data: string, time: number } = payload;
      if (state.tempData !== null) {
        const modifyingNote = { ...state.tempData, markdown: data, title: extractTitle(data), updateAt: time };
        const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.activeNoteId);
        state.tempData = modifyingNote;
        state.basicNotes[targetIndex] = modifyingNote;
      }
    },
    deleteNote: (state, action) => {
      if (state.tempData !== null) {
        const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.activeNoteId);
        const targetNote = state.basicNotes[targetIndex];
        targetNote.modifiable = false;
        state.basicNotes = state.basicNotes.filter((_, idx) => idx !== targetIndex);
        state.deletedNotes.push(targetNote);
      }
    },
    selectFolder: (state, { payload }) => {
      const { name }: { name: string } = payload;
      if (name === 'archive' || name === 'trash') saveTempData(state);
    },
    changeCurrentNoteDataSort: (state, { payload }) => {
      const { sort }: { sort: string } = payload;
      state.basicNotes = noteDataSort(state.basicNotes, sort);
    },
    changeActiveNoteId: (state, { payload }: { payload: number }) => {
      saveTempData(state);
      const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === payload);
      state.tempData = state.basicNotes[targetIndex];
      state.activeNoteId = payload;
    },
    changePinnedState: (state, action) => {
      if (state.tempData !== null) {
        const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
        state.tempData.isPinned = !state.tempData.isPinned;
        state.basicNotes[targetIndex].isPinned = state.tempData.isPinned;
      }
    },
    changeLockedState: (state, action) => {
      if (state.tempData !== null) {
        const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
        state.tempData.isLocked = !state.tempData.isLocked;
        state.basicNotes[targetIndex].isLocked = state.tempData.isLocked;
      }
    },
    clickedViewBtnBack: (state, action) => { saveTempData(state); },
  }
});

export const { addTempNote, modifyTempNote, modifyTempNoteDone, deleteNote, selectFolder, changeCurrentNoteDataSort, changeActiveNoteId, changePinnedState, changeLockedState, clickedViewBtnBack } = note.actions;

export default note.reducer;

export const noteDataSort = (data: NoteList, sortType: string | null) => {
  const newData = [...data];
  switch (sortType) {
    case 'create/desc':
      newData.sort((a, b) => Number(a.createAt) - Number(b.createAt));
      break;
    case 'create/asc':
      newData.sort((a, b) => Number(b.createAt) - Number(a.createAt));
      break;
    case 'update/desc':
      newData.sort((a, b) => Number(a.updateAt) - Number(b.updateAt));
      break;
    case 'update/asc':
      newData.sort((a, b) => Number(b.updateAt) - Number(a.updateAt));
      break;
    case 'title/desc':
      newData.sort((a, b) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0));
      break;
    case 'title/asc':
      newData.sort((a, b) => a.title < b.title ? 1 : (a.title > b.title ? -1 : 0));
      break;
    default:
      newData.sort((a, b) => Number(a.createAt) - Number(b.createAt));
  }
  return newData;
}

export const extractTitle = (str:string) => {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}

const saveTempData = (state: NoteState) => {
  if (state.tempData !== null && state.tempData.modifiable) {
    if (extractTitle(state.tempData.markdown) === '') {
      state.basicNotes = state.basicNotes.filter(({ createAt }) => createAt !== state.tempData?.createAt);
    } else {
      const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
      state.basicNotes[targetIndex] = state.tempData;
    }
  }
  state.tempData = null;
  state.activeNoteId = -1;
}