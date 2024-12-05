import React from 'react'
import { useAddFolder, useFolderFormState, useFolderList } from '@/entities/folder'
import type { AddFolderFormParams } from '../types'
import { findDefaultName } from '../utils'

export default function useAddFolderFormState({ onSuccess, onFailed }: AddFolderFormParams) {
  const folderList = useFolderList()
  const defaultFolderName = React.useMemo(() => {
    return findDefaultName(new Set(folderList.map(({ name }) => name)))
  }, [folderList])

  const addFolder = useAddFolder()

  const { setColor, handleSubmit, errors, nameProps } = useFolderFormState()

  const onSubmit = React.useMemo(() => {
    return handleSubmit(({ name, color }, e) => {
      e?.preventDefault()
      addFolder({ name: name.trim(), color, onSuccess, onFailed })
    })
  }, [handleSubmit, addFolder, onSuccess, onFailed])

  return { defaultFolderName, errors, nameProps, setColor, onSubmit }
}
