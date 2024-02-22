import React from 'react'
import { FormBtnWrap } from './FolderForm.style'
import { useAppDispatch } from '../../../app/hooks'
import { toggleModal } from '../../../app/actions/ui';

export default function FolderFormModify() {

  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormBtnWrap>
        <button type='button' onClick={() => dispatch(toggleModal(null))}>취소</button>
        <button type='submit'>저장</button>
      </FormBtnWrap>
    </form>
  )
}
