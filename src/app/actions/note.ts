import { createSlice } from "@reduxjs/toolkit"
import { Note, NoteList } from "../types/note";

const initialBasicNote = JSON.parse(localStorage.getItem('basicNotes') ?? '[]');
const initialArchiveNote = JSON.parse(localStorage.getItem('archiveNotes') ?? '[]');
const initialDeletedNote = JSON.parse(localStorage.getItem('deletedNotes') ?? '[]');

interface NoteState {
  noteStatus: 'temp' | 'modify' | 'done',
  activeNoteIndex: number | -1,
  currentNotes: NoteList[],
  tempData: Note | null,
  basicNotes: NoteList,
  archiveNotes: NoteList,
  deletedNotes: NoteList,
}

const initialState: NoteState = {
  noteStatus: 'done',
  activeNoteIndex: -1,
  currentNotes: [ [], [] ],
  tempData: null,
  basicNotes: initialBasicNote,
  archiveNotes: initialArchiveNote,
  deletedNotes: initialDeletedNote,
}

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addTempNote: (state, { payload }) => {
      const { folder, time } = payload;
      const newNote:Note = {
        included: folder, title: '', createAt: time, updateAt: time, markdown: '', isPinned: false, isLocked: false
      }
      state.tempData = newNote;
      state.currentNotes[1].push(newNote);
      state.activeNoteIndex = time;
      state.noteStatus = 'temp';
      // localStorage.setItem('basicNotes', JSON.stringify(state.basicNotes));
    },
    modifyTempNote: (state, { payload }) => {
      if (state.tempData) {
        state.tempData.markdown = payload.data;
        state.tempData.title = extractTitle(payload.data);
        state.tempData.updateAt = payload.time;
      }
    },
    selectFolder: (state, { payload }) => {
      if (state.noteStatus === 'temp') { state.tempData = null; state.noteStatus = 'done' }
      
      if (payload.name === 'all') {
        state.currentNotes = filteredNoteData(state.basicNotes, null, payload.sort);
      } else if (payload.name === 'archive') {
        state.currentNotes = filteredNoteData(state.archiveNotes, null, null);
        state.activeNoteIndex = -1;
      } else if (payload.name === 'trash') {
        state.currentNotes = filteredNoteData(state.deletedNotes, null, null);
        state.activeNoteIndex = -1;
      } else {
        state.currentNotes = filteredNoteData(state.basicNotes, payload.name, payload.sort);
      }
    },
    changeCurrentNoteDataSort: (state, { payload }) => {
      const targetName = payload.name === 'all' ? null : payload.name;
      state.currentNotes = filteredNoteData(state.basicNotes, targetName, payload.sort);
    },
    changeActiveNoteIndex: (state, { payload }) => {

    },
  }
});

export const { addTempNote, modifyTempNote, selectFolder, changeCurrentNoteDataSort, changeActiveNoteIndex } = note.actions;

export default note.reducer;

export function noteDataSort(data: NoteList, sortType: string | null) {
  switch (sortType) {
    case 'create/desc':
      data.sort((a, b) => Number(a.createAt) - Number(b.createAt));
      break;
    case 'create/asc':
      data.sort((a, b) => Number(b.createAt) - Number(a.createAt));
      break;
    case 'update/desc':
      data.sort((a, b) => Number(new Date(a.updateAt).getTime()) - Number(new Date(b.updateAt).getTime()));
      break;
    case 'update/asc':
      data.sort((a, b) => Number(new Date(b.updateAt).getTime()) - Number(new Date(a.updateAt).getTime()));
      break;
    case 'title/desc':
      data.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      break;
    case 'title/asc':
      data.sort((a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
      break;
    default:
      data.sort((a, b) => Number(a.createAt) - Number(b.createAt));
  }
}

export function filteredNoteData(data: NoteList, targetFolder: string | null, sortType: string | null): NoteList[] {
  
  if (targetFolder) data = data.filter(({ included }) => included === targetFolder);

  noteDataSort(data, sortType);

  if (sortType) {
    const pinnedNotes = data.filter(({ isPinned }) => isPinned);
    const basicNotes = data.filter(({ isPinned }) => !isPinned);
    return [ pinnedNotes, basicNotes ];
  } 
  else return [ [], data ];
};

export function extractTitle(str:string) {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}