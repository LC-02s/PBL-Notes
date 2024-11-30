import React from 'react'
import type { ViewType } from '@/shared/types'
import { useViewType } from '@/shared/hooks'
import { HiddenText, Icon, MenuButton } from '@/shared/ui'

interface ViewTypeButtonsProps {
  extraButton?: (props: { viewType: ViewType }) => React.ReactNode
}

export default function ViewTypeButtons({ extraButton }: ViewTypeButtonsProps) {
  const { viewType, setViewType } = useViewType()
  const isListType = viewType === 'list'
  const isGalleryType = viewType === 'gallery'

  return (
    <p className="flex h-full w-auto items-center justify-start gap-1">
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
      {extraButton?.({ viewType })}
    </p>
  )
}
