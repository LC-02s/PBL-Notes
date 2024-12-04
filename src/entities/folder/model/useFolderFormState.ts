import React from 'react'
import { useForm } from 'react-hook-form'
import type { ColorChip } from '@/shared/types'
import type { Folder, FolderFormValues } from '../types'
import useCheckDuplicate from './useCheckDuplicate'
import { MAX_NAME_LENGTH } from '../constants'

interface UseFolderFormStateParams {
  exceptionName?: Folder['name']
}

export default function useFolderFormState({ exceptionName }: UseFolderFormStateParams = {}) {
  const checkDuplicate = useCheckDuplicate()

  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FolderFormValues>({ mode: 'onSubmit' })

  const nameProps = React.useMemo(() => {
    return register('name', {
      required: '폴더명을 입력해주세요',
      maxLength: {
        value: MAX_NAME_LENGTH,
        message: `폴더명은 최대 ${MAX_NAME_LENGTH}자까지 입력할 수 있어요`,
      },
      validate: {
        space: (value) => (!value.trim() ? '사용할 수 없는 폴더명이에요' : undefined),
        duplicate: (value) =>
          checkDuplicate(value, exceptionName) ? '이미 사용중인 폴더명이에요' : undefined,
      },
    })
  }, [register, checkDuplicate, exceptionName])

  const setColor = React.useCallback((color: ColorChip) => setValue('color', color), [setValue])

  return { setColor, handleSubmit, errors, nameProps }
}
