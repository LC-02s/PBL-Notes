import { useSaveFolderData } from '@/entities/folder'
import { useAutoSaveNoteData } from '@/entities/note'
import { useBooleanState } from '@/shared/lib'
import { Icon } from '@/shared/ui'
import { useLoadData } from '../model'

export default function DataLoader() {
  const { isLoading } = useLoadData()
  const [isSaving, { setTrue: onStart, setFalse: onEnd }] = useBooleanState()

  useSaveFolderData({ onStart, onEnd })
  useAutoSaveNoteData({ onStart, onEnd })

  if (isLoading || isSaving) {
    return <Icon.BarsRotateFadeSpinner className="text-base text-gray600 transition-colors" />
  }

  return null
}
