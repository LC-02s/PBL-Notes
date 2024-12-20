import { useDropdown } from '@/shared/lib'
import { DropdownItem, DropdownWrapper, HiddenText, Icon, MenuButton } from '@/shared/ui'
import { useChangeSortTypeState } from '../model'

export default function ChangeSortTypeDropdownButton() {
  const { containerRef, isOpen, withClose, toggle } = useDropdown<HTMLDivElement>()
  const { sortType, submitSortType, sortedAt, submitSortedAt } = useChangeSortTypeState()

  return (
    <div ref={containerRef} className="relative block">
      <MenuButton title="노트 정렬 방식 변경" onClick={toggle}>
        <Icon.SortVerticalOutline />
        <HiddenText>노트 정렬 방식 변경</HiddenText>
      </MenuButton>
      <DropdownWrapper open={isOpen} className="-left-10">
        <DropdownItem
          title="생성일 기준으로 변경"
          value="create"
          selectedValue={sortType}
          setValue={withClose(submitSortType)}
        >
          생성일
        </DropdownItem>
        <DropdownItem
          title="수정일 기준으로 변경"
          value="update"
          selectedValue={sortType}
          setValue={withClose(submitSortType)}
        >
          수정일
        </DropdownItem>
        <DropdownItem
          title="제목 기준으로 변경"
          value="title"
          selectedValue={sortType}
          setValue={withClose(submitSortType)}
        >
          제목
        </DropdownItem>
        <li className="mx-1 my-2 h-px bg-gray200 transition-colors" />
        <DropdownItem
          title={`${sortType === 'title' ? '오름차순' : '최신 순'}으로 변경`}
          value="asc"
          selectedValue={sortedAt}
          setValue={withClose(submitSortedAt)}
        >
          {sortType === 'title' ? '오름차순' : '최신 순'}
        </DropdownItem>
        <DropdownItem
          title={`${sortType === 'title' ? '내림차순' : '오래된 순'}으로 변경`}
          value="desc"
          selectedValue={sortedAt}
          setValue={withClose(submitSortedAt)}
        >
          {sortType === 'title' ? '내림차순' : '오래된 순'}
        </DropdownItem>
      </DropdownWrapper>
    </div>
  )
}
