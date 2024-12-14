import { BackButton } from '@/features/back-to-list'
import { ViewTypeButtons } from '@/features/change-view-type'
import { DeleteNoteButton } from '@/features/delete-note'

export default function MenuLeft() {
  return (
    <div className="relative flex h-full items-center justify-between space-x-6 p-2 xl:w-60">
      <ViewTypeButtons backButton={BackButton} />
      <DeleteNoteButton />
    </div>
  )
}
