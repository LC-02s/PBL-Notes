import localForage from "localforage";
import { Note } from "../types/note";
import { Folder } from "../types/folder";

export interface DB { 'folders': Folder[], 'notes': Note[] };

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'PBL-Notes',
  version: 1.0,
  storeName: 'data',
  description: 'my notes database',
});

export const getDataFromDB = async (key: keyof DB) => {
  const initialNotes = await localForage.getItem(key) ?? '[]';
  const data = JSON.parse(String(initialNotes));
  return data;
}

export const saveDataToDB = (key: keyof DB, data: DB[keyof DB]) => {
  localForage
    .setItem(key, JSON.stringify(data))
    .catch(console.warn);
}

