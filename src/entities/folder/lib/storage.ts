import { storageFactor } from '@/shared/lib'
import type { Folder } from '../model'
import { FOLDER_DB_KEY } from '../config'

export const { getInitialData, saveData } = storageFactor<Folder>({ key: FOLDER_DB_KEY })
