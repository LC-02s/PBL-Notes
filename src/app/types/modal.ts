export type ModalType = 'folder/add' | 'folder/modify';

export interface ModalState {
  active: boolean,
  type: ModalType
}