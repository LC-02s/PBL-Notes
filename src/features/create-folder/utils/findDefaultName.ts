import { DEFAULT_FOLDER_NAME } from '../constants'

export default function findDefaultName(folderName: Set<string>) {
  if (!folderName.has(DEFAULT_FOLDER_NAME)) {
    return DEFAULT_FOLDER_NAME
  }

  for (let i = 1; i <= folderName.size; i += 1) {
    if (!folderName.has(`${DEFAULT_FOLDER_NAME} ${i}`)) {
      return `${DEFAULT_FOLDER_NAME} ${i}`
    }
  }

  return ''
}
