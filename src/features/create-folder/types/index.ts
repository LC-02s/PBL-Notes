import { useAddFolder } from '@/entities/folder'

export type AddFolderFormParams = Pick<
  Parameters<ReturnType<typeof useAddFolder>>[number],
  'onSuccess' | 'onFailed'
>
