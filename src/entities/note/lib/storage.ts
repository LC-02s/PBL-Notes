import { storageFactor } from '@/shared/lib'
import type { LegacyNote } from '../model'
import { NOTE_DB_KEY } from '../config'

export const { getInitialData, saveData } = storageFactor<LegacyNote>({ key: NOTE_DB_KEY })
