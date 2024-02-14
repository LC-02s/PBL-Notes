
export type Note = {
  included: string,
  title: string, 
  markdown: string, 
  createAt: number,
  updateAt: number, 
  isPinned: boolean, 
  isLocked: boolean 
};

export type NoteList = Note[];