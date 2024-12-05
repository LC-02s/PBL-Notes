import React from 'react'
import { type Folder, useFolderFormState, useModifyFolder, ColorDropdown } from '@/entities/folder'
import { GuideText, TextInput } from '@/shared/ui'

interface ModifyFolderFormProps {
  folder: Folder
  onModify?: () => void
}

export default function ModifyFolderForm({
  folder,
  onModify,
  children,
}: React.PropsWithChildren<ModifyFolderFormProps>) {
  const modifyFolder = useModifyFolder()

  const { setColor, handleSubmit, nameProps, errors } = useFolderFormState({
    exceptionName: folder.name,
  })

  const onSubmit = React.useMemo(() => {
    return handleSubmit(({ name, color }, e) => {
      e?.preventDefault()
      modifyFolder({ id: folder.id, name: name.trim(), color })
      onModify?.()
    })
  }, [handleSubmit, modifyFolder, onModify, folder])

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
            defaultValue={folder.name}
            {...nameProps}
            isError={!!errors.name?.message}
          />
          <ColorDropdown defaultValue={folder.color} submit={setColor} />
        </div>
        <GuideText type="warn" message={errors.name?.message} />
      </fieldset>
      {children}
    </form>
  )
}
