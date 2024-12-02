import { storageFactor } from '@/shared/utils'
import type { LegacyNote } from '../types'
import { NOTE_DB_KEY } from '../constants'

export const { getInitialData, saveData } = storageFactor<LegacyNote>({ key: NOTE_DB_KEY })
