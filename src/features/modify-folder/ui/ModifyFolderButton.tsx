import { AnimatePresence, motion } from 'motion/react'
import { useActiveFolder } from '@/entities/folder'
import { useOverlay } from '@/shared/lib'
import {
  type ModifyFolderButtonProps,
  withModifyFolderFormDialog,
} from './withModifyFolderFormDialog'

export default function ModifyFolderButton({ deleteButton }: ModifyFolderButtonProps) {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()
  const { folder } = useActiveFolder()

  return (
    <AnimatePresence>
      {!!folder && (
        <motion.button
          ref={startedAt}
          type="button"
          title="폴더 정보 수정"
          className="block whitespace-nowrap text-sm font-medium text-gray500 transition-colors hover:text-info focus:text-info"
          onClick={() => {
            open(withModifyFolderFormDialog({ folder, deleteButton }))
          }}
          disabled={!folder}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
        >
          폴더 수정
        </motion.button>
      )}
    </AnimatePresence>
  )
}
