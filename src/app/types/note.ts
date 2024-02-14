
export type Note = {
  included: string,
  title: string, 
  markdown: string, 
  createAt: string | number,
  updateAt: string | number, 
  isPinned: boolean, 
  isLocked: boolean 
};

export type NoteList = Note[];