import { storageFactor } from '@/shared/utils'
import type { Folder } from '../types'
import { FOLDER_DB_KEY } from '../constants'

export const { getInitialData, saveData } = storageFactor<Folder>({ key: FOLDER_DB_KEY })
