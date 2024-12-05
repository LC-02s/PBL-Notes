import React from 'react'
import { ColorDropdown } from '@/entities/folder'
import { GuideText, TextInput } from '@/shared/ui'
import type { AddFolderFormParams } from '../types'
import { useAddFolderFormState } from '../hooks'

export default function AddFolderForm({
  onSuccess,
  onFailed,
  children,
}: React.PropsWithChildren<AddFolderFormParams>) {
  const { nameProps, errors, defaultFolderName, setColor, onSubmit } = useAddFolderFormState({
    onSuccess,
    onFailed,
  })

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="block py-2">
        <label
          htmlFor="name"
          className="mb-1 block px-0.5 text-sm font-medium text-gray500 transition-colors"
        >
          이름
        </label>
        <div className="flex space-x-2">
          <TextInput
            type="text"
            placeholder="폴더명을 입력해주세요"
            defaultValue={defaultFolderName}
            {...nameProps}
            isError={!!errors.name?.message}
          />
          <ColorDropdown submit={setColor} />
        </div>
        <GuideText type="warn" message={errors.name?.message} />
      </fieldset>
      {children}
    </form>
  )
}
