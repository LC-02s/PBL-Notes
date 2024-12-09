import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { cn } from '../utils'
import HiddenText from './HiddenText'
import * as Icon from './icon'

import 'react-toastify/dist/ReactToastify.css'

const toastIcon = {
  success: <Icon.CheckCircleBold className="m-auto text-xl text-success" />,
  info: <Icon.InfoCircleBold className="m-auto text-xl text-info" />,
  warning: <Icon.DangerCircleBold className="m-auto text-xl text-caution" />,
  error: <Icon.DangerCircleBold className="m-auto text-xl text-warn" />,
  default: null,
}

interface CloseButtonProps {
  closeToast: React.MouseEventHandler<HTMLButtonElement>
}

function CloseButton({ closeToast }: CloseButtonProps) {
  return (
    <button
      type="button"
      title="닫기"
      className="relative rounded-full p-2 text-xl text-gray400 transition-colors hover:text-gray600 active:text-gray600"
      onClick={closeToast}
    >
      <Icon.XOutline />
      <HiddenText>닫기</HiddenText>
    </button>
  )
}

function ToastViewer() {
  return (
    <ToastContainer
      toastClassName={() =>
        'mx-auto mt-2 flex items-center justify-between rounded-xl border border-gray200 bg-gray000 p-2 pl-3 transition-colors dark:bg-gray100'
      }
      bodyClassName={(context) =>
        cn(
          'flex items-center justify-start break-keep text-gray700 transition-colors',
          context?.type === 'default' && 'pl-1',
        )
      }
      closeButton={CloseButton}
      icon={(props) => toastIcon[props?.type || 'default']}
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
    />
  )
}

export default function ToastViewerContainer() {
  return ReactDOM.createPortal(<ToastViewer />, document.body)
}
