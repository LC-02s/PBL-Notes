import type { FOLDER_PATH_KEY, NOTE_PATH_KEY, TRASH_PATH } from '../constants'

export type FolderPathKey = typeof FOLDER_PATH_KEY

export type FolderPath = `${FolderPathKey}/${number}`

export type NotePathKey = typeof NOTE_PATH_KEY

export type NotePath = `${NotePathKey}/${number}`

export type TrashPath = typeof TRASH_PATH

export type NotePathInFolder = `${FolderPath}${NotePath}`

export type NotePathInTrash = `${TrashPath}${NotePath}`
