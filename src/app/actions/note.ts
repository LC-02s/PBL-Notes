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
  activeNoteIndex: number,
  tempData: Note | null,
  notes: Note[],
}

const initialState: NoteState = {
  activeNoteId: -1,
  activeNoteIndex: -1,
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
        state.activeNoteIndex = state.notes.length - 1;
      }
    },
    modifyTempNote: (state, { payload }: { payload: string }) => {
      if (state.tempData !== null) {
        const modifyingNote = { ...state.tempData, markdown: payload, title: extractTitle(payload) };
        state.tempData = modifyingNote;
        state.notes[state.activeNoteIndex] = modifyingNote;
      }
    },
    modifyTempNoteDone: (state, { payload }: { payload: { data: string, time: number } }) => {
      const { data, time } = payload;
      if (state.tempData !== null) {
        const modifyingNote = { ...state.tempData, markdown: data, title: extractTitle(data), updateAt: time };
        state.tempData = modifyingNote;
        state.notes[state.activeNoteIndex] = modifyingNote;
      }
    },
    deleteNote: (state, action) => {
      if (state.tempData !== null) {
        if (extractTitle(state.tempData.markdown) === '') {
          state.notes = state.notes.filter(({ createAt }) => createAt !== state.activeNoteId);
        } else if (state.tempData.modifiable) {
          state.notes[state.activeNoteIndex].modifiable = false;
        } else {
          state.notes = state.notes.filter(({ createAt }) => createAt !== state.activeNoteId);
        }
        initActiveNote(state);
      }
    },
    changeActiveNoteId: (state, { payload }: { payload: number }) => {
      saveTempData(state);
      const targetIndex = state.notes.findIndex(({ createAt }) => createAt === payload);
      state.tempData = state.notes[targetIndex];
      state.activeNoteId = payload;
      state.activeNoteIndex = targetIndex;
    },
    changePinnedState: (state, action) => {
      if (state.tempData !== null) {
        state.tempData.isPinned = !state.tempData.isPinned;
        state.notes[state.activeNoteIndex].isPinned = state.tempData.isPinned;
      }
    },
    changeLockedState: (state, action) => {
      if (state.tempData !== null) {
        state.tempData.isLocked = !state.tempData.isLocked;
        state.notes[state.activeNoteIndex].isLocked = state.tempData.isLocked;
      }
    },
    resetActiveNote: (state, action) => { saveTempData(state); },
  }
});

export const { addTempNote, modifyTempNote, modifyTempNoteDone, deleteNote, resetActiveNote, changeActiveNoteId, changePinnedState, changeLockedState } = note.actions;

export default note.reducer;

export const noteDataSortCompareFn: { [compareFn: string]: (a: Note, b: Note) => number } = {
  'create/desc': (a, b) => a.createAt - b.createAt,
  'create/asc': (a, b) => b.createAt - a.createAt,
  'update/desc': (a, b) => a.updateAt - b.updateAt,
  'update/asc': (a, b) => b.updateAt - a.updateAt,
  'title/desc': (a, b) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0),
  'title/asc': (a, b) => a.title < b.title ? 1 : (a.title > b.title ? -1 : 0),
};

export const noteDataSort = (data: Note[], sortType: string) => data.sort(noteDataSortCompareFn[sortType] ?? ((a, b) => a.createAt - b.createAt));

export const extractTitle = (str: string) => {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}

const initActiveNote = (state: NoteState) => {
  state.tempData = null;
  state.activeNoteId = -1;
  state.activeNoteIndex = -1;
}

const saveTempData = (state: NoteState) => {
  if (state.tempData !== null && state.tempData.modifiable) {
    if (extractTitle(state.tempData.markdown)) {
      const targetIndex = state.notes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
      state.notes[targetIndex] = state.tempData;
    } else {
      state.notes = state.notes.filter(({ createAt }) => createAt !== state.tempData?.createAt);
    }
  }
  initActiveNote(state);
}