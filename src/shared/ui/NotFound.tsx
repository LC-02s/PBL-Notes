import { ShieldWarningOutline } from './icon'

export default function NotFound() {
  return (
    <div className="flex size-full flex-col flex-nowrap items-center justify-center p-5 pb-20 text-warn">
      <ShieldWarningOutline className="text-4xl" />
      <p className="mt-2 text-center text-base font-medium">잘못된 접근입니다</p>
    </div>
  )
}
