import localForage from "localforage";
import { Note } from "../types/note";
import { Folder } from "../types/folder";

export type DBKey = 'folders' | 'notes';

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'PBL-Notes',
  version: 1.0,
  storeName: 'data',
  description: 'my notes database',
});

export const getDataFromDB = async (key: DBKey) => {
  const initialNotes = await localForage.getItem(key) ?? '[]';
  const data = JSON.parse(String(initialNotes));
  return data;
}

export const saveDataToDB = async (key: DBKey, data: Note[] | Folder[]) => {
  localForage.setItem(key, JSON.stringify(data)).catch(console.warn);
}

