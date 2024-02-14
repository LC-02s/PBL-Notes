import { createSlice } from "@reduxjs/toolkit"
import { Note, NoteList } from "../types/note";

const initialBasicNote = JSON.parse(localStorage.getItem('basicNotes') ?? '[]');
const initialArchiveNote = JSON.parse(localStorage.getItem('archiveNotes') ?? '[]');
const initialDeletedNote = JSON.parse(localStorage.getItem('deletedNotes') ?? '[]');

interface NoteState {
  noteStatus: '' | '' | '',
  activeNoteIndex: number | -1,
  currentNotes: NoteList[],
  tempData: Note | null,
  basicNotes: NoteList,
  archiveNotes: NoteList,
  deletedNotes: NoteList,
}

const initialState: NoteState = {
  noteStatus: '',
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
      if (payload === 'all') {
        state.currentNotes = dataSort(state.basicNotes, '', '');
      } else if (payload === 'archive') {
        state.currentNotes = dataSort(state.archiveNotes, '', '');
        state.activeNoteIndex = -1;
      } else if (payload === 'trash') {
        state.currentNotes = dataSort(state.deletedNotes, '', '');
        state.activeNoteIndex = -1;
      } else {
        state.currentNotes = dataSort(state.basicNotes, payload, '');
      }
    },
    changeActiveNoteIndex: (state, { payload }) => {

    },
  }
});

export const { addTempNote, modifyTempNote, selectFolder, changeActiveNoteIndex } = note.actions;

export default note.reducer;

export function dataSort(data: NoteList, targetFolder: string, sortType: string): NoteList[] {
  
  if (targetFolder !== '') data = data.filter(({ included }) => included === targetFolder);

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

  const pinnedNotes = data.filter(({ isPinned }) => isPinned);
  const basicNotes = data.filter(({ isPinned }) => !isPinned);
  
  return [ pinnedNotes, basicNotes ];
};

export function extractTitle(str:string) {
  const match = (/# (.*?)\n/g).exec(str);
  return match && match[1] ? match[1] : '';
}