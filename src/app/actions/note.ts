import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Note } from "../types/note";
import { getDataFromDB, saveDataToDB } from "../database";

export const getNotesFromDB = createAsyncThunk(
  'note/getNotesFromDB',
  async () => {
    try {
      const data: Note[] = await getDataFromDB('notes');
      return { data, status: true, errCode: null }
    } 
    catch(err) { return { data: null, status: false, errCode: err } }
  }
);

interface NoteState {
  noteSession: boolean,
  noteStatus: 'pending' | 'fulfilled' | 'rejected',
  activeNoteId: number,
  activeNoteIndex: number,
  tempData: Note | null,
  notes: Note[],
}

const initialState: NoteState = {
  noteSession: false,
  noteStatus: 'pending',
  activeNoteId: -1,
  activeNoteIndex: -1,
  tempData: null,
  notes: [],
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
        saveDataToDB('notes', state.notes);
      }
    },
    deleteNote: (state, action) => {
      if (state.tempData !== null) {
        if (extractTitle(state.tempData.markdown) === '') {
          state.notes = state.notes.filter(({ createAt }) => createAt !== state.activeNoteId);
        } else if (state.tempData.modifiable) {
          state.notes[state.activeNoteIndex].modifiable = false;
        } else {
          const confirmTxt = '노트 삭제 시 다시는 복구할 수 없습니다. \n삭제하시겠습니까?';
          if (window.confirm(confirmTxt)) state.notes = state.notes.filter(({ createAt }) => createAt !== state.activeNoteId);
        }
        saveDataToDB('notes', state.notes);
        initActiveNote(state);
      }
    },
    overwriteNotesIncluded: (state, { payload }: { payload: { targetName: string, newName: string } }) => {
      const { targetName, newName } = payload;
      state.notes = state.notes.map((note) => note.included === targetName ? { ...note, included: newName } : note);
      saveDataToDB('notes', state.notes);
      initActiveNote(state);
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
        saveDataToDB('notes', state.notes);
      }
    },
    changeLockedState: (state, action) => {
      if (state.tempData !== null) {
        state.tempData.isLocked = !state.tempData.isLocked;
        state.notes[state.activeNoteIndex].isLocked = state.tempData.isLocked;
        saveDataToDB('notes', state.notes);
      }
    },
    changeIncluded: (state, { payload }: { payload: { noteId: number, newName: string } }) => {
      const { noteId, newName } = payload;
      if (newName !== '' && noteId > 0) {
        const targetIndex = state.notes.findIndex(({ createAt }) => createAt === noteId);
        if (targetIndex >= 0) {
          state.notes[targetIndex].included = newName;
          state.notes[targetIndex].modifiable = true;
          if (state.tempData !== null) {
            state.tempData.included = newName;
            state.tempData.modifiable = true;
          }
          saveDataToDB('notes', state.notes);
        }
      }
    },
    resetActiveNote: (state, action) => { saveTempData(state); },
    deleteNoteToFolder: (state, { payload }: { payload: string }) => {
      state.notes = state.notes.map((note) => note.included === payload ? { ...note, included: '', modifiable: false } : note);
      saveDataToDB('notes', state.notes);
      initActiveNote(state);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotesFromDB.pending, (state) => {
        state.noteStatus = 'pending';
      })
      .addCase(getNotesFromDB.fulfilled, (state, { payload }) => {
        state.notes = payload.data ?? [];
        state.noteSession = true;
        state.noteStatus = 'fulfilled';
      })
      .addCase(getNotesFromDB.rejected, (state) => {
        state.notes = [];
        state.noteSession = true;
        state.noteStatus = 'rejected';
      })
  },
});

export const { addTempNote, modifyTempNote, modifyTempNoteDone, deleteNote, overwriteNotesIncluded, resetActiveNote, changeActiveNoteId, changePinnedState, changeLockedState, changeIncluded, deleteNoteToFolder } = note.actions;

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
    saveDataToDB('notes', state.notes);
  }
  initActiveNote(state);
}