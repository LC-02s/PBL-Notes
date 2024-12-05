import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useActiveFolder } from '@/entities/folder'
import { useOverlay } from '@/shared/hooks'
import { type ModifyFolderButtonProps, withDialogForm } from './withDialogForm'

export default function ModifyFolderButton({ deleteButton }: ModifyFolderButtonProps) {
  const { startedAt, open } = useOverlay<HTMLButtonElement>()
  const { folder } = useActiveFolder()

  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {!!folder && (
        <motion.button
          ref={startedAt}
          type="button"
          title="폴더 정보 수정"
          className="block whitespace-nowrap text-sm font-medium text-gray500 transition-colors hover:text-info focus:text-info"
          onClick={() => {
            open(withDialogForm({ folder, deleteButton, navigate }))
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
