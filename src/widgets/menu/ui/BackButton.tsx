import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import type { ViewType } from '@/features/change-view-type'
import { useActiveFolder } from '@/entities/folder'
import { useActiveNote } from '@/entities/note'
import { INDEX_PATH, TRASH_PATH } from '@/shared/constants'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'

interface BackButtonProps {
  viewType: ViewType
}

export default function BackButton({ viewType }: BackButtonProps) {
  const { path } = useActiveFolder()
  const { note } = useActiveNote()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const back = useCallback(() => {
    const currentPath = pathname.startsWith(TRASH_PATH) ? TRASH_PATH : INDEX_PATH
    const targetPath = path ? path : currentPath

    navigate(targetPath, { replace: true })
  }, [path, pathname, navigate])

  return (
    <AnimatePresence>
      {viewType === 'gallery' && !!note && (
        <motion.p
          initial={{ x: '-24%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-24%' }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
        >
          <MenuButton title="폴더로 돌아가기" onClick={back}>
            <Icon.AltArrowLeftOutline />
            <HiddenText>폴더로 돌아가기</HiddenText>
          </MenuButton>
        </motion.p>
      )}
    </AnimatePresence>
  )
}
