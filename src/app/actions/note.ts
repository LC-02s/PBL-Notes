import { createSlice } from "@reduxjs/toolkit"
import { Note, NoteList } from "../types/note";

const initialBasicNote = JSON.parse(localStorage.getItem('basicNotes') ?? '[]');
const initialArchiveNote = JSON.parse(localStorage.getItem('archiveNotes') ?? '[]');
const initialDeletedNote = JSON.parse(localStorage.getItem('deletedNotes') ?? '[]');

interface NoteState {
  activeNoteIndex: number | null,
  currentNotes: NoteList[] | null,
  tempData: Note | null,
  basicNotes: NoteList,
  archiveNotes: NoteList,
  deletedNotes: NoteList,
}

const initialState: NoteState = {
  activeNoteIndex: null,
  currentNotes: null,
  tempData: null,
  basicNotes: initialBasicNote,
  archiveNotes: initialArchiveNote,
  deletedNotes: initialDeletedNote,
}

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, { payload }) => {
      const { folder, time } = payload;
      const newNote:Note = {
        included: folder, title: '', createAt: time.getTime(), updateAt: time, markdown: '', isPinned: false, isLocked: false
      }
      state.basicNotes.push(newNote);
      localStorage.setItem('basicNotes', JSON.stringify(state.basicNotes));
    },
  }
});

export const { addNote } = note.actions;

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
      data.sort((a, b) => a.markdown.charCodeAt(2) - b.markdown.charCodeAt(2));
      break;
    case 'title/asc':
      data.sort((a, b) => b.markdown.charCodeAt(2) - a.markdown.charCodeAt(2));
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