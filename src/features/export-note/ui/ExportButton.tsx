import { AnimatePresence, motion } from 'motion/react'
import { useActiveNote } from '@/entities/note'
import { useDropdown } from '@/shared/hooks'
import { DropdownWrapper, HiddenText, Icon, MenuButton } from '@/shared/ui'
import CopyAsMarkdownButton from './CopyAsMarkdownButton'
import SaveAsMarkdownButton from './SaveAsMarkdownButton'

export default function ExportButton() {
  const { containerRef, isOpen, close, toggle } = useDropdown<HTMLDivElement>()
  const { note } = useActiveNote()

  return (
    <AnimatePresence>
      {!(!note || !note.markdown) && (
        <motion.div
          ref={containerRef}
          className="relative"
          initial={{ x: '-24%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-24%' }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
        >
          <MenuButton title="노트 다운로드 방식 선택" onClick={toggle}>
            <Icon.FileDownloadOutline />
            <HiddenText>노트 다운로드 방식 선택</HiddenText>
          </MenuButton>
          <DropdownWrapper open={isOpen} className="-left-24 w-48 space-y-1 p-1.5 xl:-left-9">
            <SaveAsMarkdownButton note={note} onClose={close} />
            <CopyAsMarkdownButton note={note} onClose={close} />
          </DropdownWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
