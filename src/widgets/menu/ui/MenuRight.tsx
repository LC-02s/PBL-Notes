import React from 'react'
import { ChangeSortTypeDropdownButton } from '@/features/change-sort-type'
import { ThemeDropdownButton } from '@/features/change-theme'
import { CreateNoteButton } from '@/features/create-note'
import { ExportButton } from '@/features/export-note'
import { LockNoteButton } from '@/features/lock-note'
import { PinNoteButton } from '@/features/pin-note'
import { SearchBar } from '@/features/search-note'

function MenuLeftInRightContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-start space-x-3">
      <CreateNoteButton />
      <div className="flex items-center justify-start space-x-1">{children}</div>
    </div>
  )
}

function MenuLeftInRight() {
  return (
    <MenuLeftInRightContainer>
      <LockNoteButton />
      <PinNoteButton />
    </MenuLeftInRightContainer>
  )
}

function MenuMiddleInRight() {
  return (
    <div className="flex flex-1 items-center justify-start space-x-2">
      <SearchBar />
      <ChangeSortTypeDropdownButton />
      <ExportButton />
    </div>
  )
}

export default function MenuRight() {
  return (
    <div className="flex h-full w-[calc(100%-15rem-1px)] flex-1 items-center justify-between space-x-6 p-2">
      <MenuLeftInRight />
      <MenuMiddleInRight />
      <ThemeDropdownButton />
    </div>
  )
}
