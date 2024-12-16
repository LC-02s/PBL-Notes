import React from 'react'
import { Link, type LinkProps } from 'react-router'
import { INDEX_PATH } from '@/shared/constants'
import type { FolderPath, TrashPath } from '@/shared/types'
import { cn } from '@/shared/utils'

interface FolderItemProps extends Omit<LinkProps, 'to'> {
  to?: FolderPath | TrashPath
  length: number
  active?: boolean
  disabled?: boolean
}

export default function FolderItem({
  to,
  length,
  className,
  active: isActive = false,
  disabled: isDisabled = false,
  children,
}: React.PropsWithChildren<FolderItemProps>) {
  return (
    <Link
      to={to ?? INDEX_PATH}
      className={cn(
        'flex w-full items-center justify-between space-x-3 rounded px-2 py-1.5 transition-colors hover:bg-white/15 active:bg-white/15 dark:hover:bg-black/15 dark:active:bg-black/15',
        isActive &&
          'bg-white/30 hover:bg-white/30 active:bg-white/30 dark:bg-black/30 dark:hover:bg-black/30 dark:active:bg-black/30',
      )}
      onClick={(e) => {
        if (isDisabled) e.preventDefault()
      }}
    >
      <h2
        className={cn(
          'flex items-center justify-start space-x-2 whitespace-nowrap text-sm font-medium text-gray700 transition-colors',
          className,
        )}
      >
        {children}
      </h2>
      <span className="text-sm text-gray500 transition-colors">{length}</span>
    </Link>
  )
}
