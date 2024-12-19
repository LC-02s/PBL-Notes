import { HiddenText, Icon, MenuButton } from '@/shared/ui'
import type { ViewType } from '../types'
import { useViewType } from '../hooks'

interface ViewTypeButtonsProps {
  backButton: (props: { viewType: ViewType }) => React.ReactNode
}

export default function ViewTypeButtons({ backButton: BackButton }: ViewTypeButtonsProps) {
  const { viewType, setViewType } = useViewType()
  const isListType = viewType === 'list'
  const isGalleryType = viewType === 'gallery'

  return (
    <div className="flex h-full w-auto items-center justify-start space-x-1">
      <MenuButton
        active={isListType}
        title="목록형 보기"
        disabled={isListType}
        onClick={() => setViewType('list')}
      >
        <Icon.SideBarOutline />
        <HiddenText>목록형 보기</HiddenText>
      </MenuButton>
      <MenuButton
        active={isGalleryType}
        title="갤러리형 보기"
        disabled={isGalleryType}
        onClick={() => setViewType('gallery')}
      >
        <Icon.WidgetOutline />
        <HiddenText>갤러리형 보기</HiddenText>
      </MenuButton>
      <BackButton viewType={viewType} />
    </div>
  )
}
