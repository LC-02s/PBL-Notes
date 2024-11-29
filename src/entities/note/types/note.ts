type BaseNote = {
  title: string
  markdown: string
  createAt: number
  updateAt: number
  isPinned: boolean
  isLocked: boolean
  modifiable: boolean
}

export interface LegacyNote extends BaseNote {
  included: string // folder name
}

export interface Note extends BaseNote {
  included: number // folder id
}
