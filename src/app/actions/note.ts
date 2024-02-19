import { createSlice } from "@reduxjs/toolkit"
import { Note, NoteList } from "../types/note";

// const initialBasicNote = JSON.parse(localStorage.getItem('basicNotes') ?? '[]');
const initialArchiveNote = JSON.parse(localStorage.getItem('archiveNotes') ?? '[]');
const initialDeletedNote = JSON.parse(localStorage.getItem('deletedNotes') ?? '[]');

const temp = [
  {createAt: 1708310444782, included: "fasdf", isLocked: false, isPinned: false, markdown: "# asdf\n\nasdf", title: "asdf", updateAt: 1708310449173},
  {createAt: 1708310603468, included: "qwefasd", isLocked: false, isPinned: true, markdown: "# asdfdf\n\nasdfsadf", title: "asdfdf", updateAt: 1708310607067},
  {createAt: 1708310640750, included: "fasdf", isLocked: false, isPinned: true, markdown: "# asdfasdf\n\nasdfasdfasdfsadf", title: "asdfasdf", updateAt: 1708310645586},
  {createAt: 1708310675862, included: "fasdf", isLocked: false, isPinned: false, markdown: "# 12312\n\nasdfasd", title: "12312", updateAt: 1708310678827},
]

interface NoteState {
  activeNoteIndex: number | -1,
  tempData: Note | null,
  basicNotes: NoteList,
  archiveNotes: NoteList,
  deletedNotes: NoteList,
}

const initialState: NoteState = {
  activeNoteIndex: -1,
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
        included: folder, title: '', createAt: time, updateAt: time, markdown: '', isPinned: false, isLocked: false
      }
      state.tempData = newNote;
      state.basicNotes.push(newNote);
      state.activeNoteIndex = state.basicNotes.length - 1;
      // localStorage.setItem('basicNotes', JSON.stringify(state.basicNotes));
    },
    modifyTempNote: (state, { payload }) => {
      const { data, time }: { data: string, time: number } = payload;
      if (state.tempData !== null) {
        state.tempData.markdown = data;
        state.tempData.title = extractTitle(data);
        state.tempData.updateAt = time;
      }
      state.basicNotes[state.activeNoteIndex].markdown = data;
      state.basicNotes[state.activeNoteIndex].title = extractTitle(data);
      state.basicNotes[state.activeNoteIndex].updateAt = time;
    },
    selectFolder: (state, { payload }) => {
      const { name }: { name: string } = payload;
      if (name === 'archive' || name === 'trash') {
        saveTempData(state);
        state.activeNoteIndex = -1;
      }
    },
    changeCurrentNoteDataSort: (state, { payload }) => {
      const { sort }: { sort: string } = payload;
      state.basicNotes = noteDataSort(state.basicNotes, sort);
    },
    changeActiveNoteIndex: (state, { payload }) => {

    },
  }
});

export const { addTempNote, modifyTempNote, selectFolder, changeCurrentNoteDataSort, changeActiveNoteIndex } = note.actions;

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
      newData.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      break;
    case 'title/asc':
      newData.sort((a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
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
  if (state.tempData !== null) {
    const targetIndex = state.basicNotes.findIndex(({ createAt }) => createAt === state.tempData?.createAt);
    if (targetIndex >= 0) state.basicNotes[targetIndex] = state.tempData;
    else state.basicNotes.push(state.tempData);
  }  
  state.tempData = null;
}