import { useMemo } from 'react'
import { useAddFolder, useFolderFormState, useFolderList } from '@/entities/folder'
import { findDefaultName } from '../lib'

type AddFolderFormParams = Pick<
  Parameters<ReturnType<typeof useAddFolder>>[number],
  'onSuccess' | 'onFailed'
>

export default function useAddFolderFormState({ onSuccess, onFailed }: AddFolderFormParams) {
  const folderList = useFolderList()
  const defaultFolderName = useMemo(() => {
    return findDefaultName(new Set(folderList.map(({ name }) => name)))
  }, [folderList])

  const addFolder = useAddFolder()

  const { setColor, handleSubmit, errors, nameProps } = useFolderFormState()

  const onSubmit = useMemo(() => {
    return handleSubmit(({ name, color }, e) => {
      e?.preventDefault()
      addFolder({ name: name.trim(), color, onSuccess, onFailed })
    })
  }, [handleSubmit, addFolder, onSuccess, onFailed])

  return { defaultFolderName, errors, nameProps, setColor, onSubmit }
}
