import { useNavigate } from 'react-router'
import Button from './Button'
import NotFound from './NotFound'
import * as Icon from './icon'

export default function RootNotFound() {
  const navigate = useNavigate()

  return (
    <NotFound className="bg-gray000 text-xl transition-colors">
      <div className="mt-8 flex items-center justify-center space-x-2">
        <Button title="뒤로가기" className="rounded-lg px-4 py-2" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
        <Button
          title="새로고침"
          className="flex items-center justify-center rounded-lg px-3 py-2"
          onClick={() => window.location.reload()}
        >
          <Icon.RefreshOutline className="mr-2 text-xl" />
          <span className="pr-1">새로고침</span>
        </Button>
      </div>
    </NotFound>
  )
}
