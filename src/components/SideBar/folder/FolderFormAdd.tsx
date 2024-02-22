import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleModal } from '../../../app/actions/ui';
import { addFolder } from '../../../app/actions/folder';
import { THEME_COLOR } from '../../../App.theme';
import { ColorChip } from '../../../app/types/folder';
import { BasicFolderInputWrapper, FormBtnWrap, FormColorSelectEl, FormErrorMessage, FormFieldset } from './FolderForm.style';

export default function FolderFormAdd() {

  const { folderList } = useAppSelector(({ folder }) => folder);
  const isActive = useAppSelector(({ ui }) => ui.modal);
  const dispatch = useAppDispatch();
  
  const { register, formState: { errors }, reset, handleSubmit } = useForm({ mode: 'onSubmit' });

  const [ currentColorChip, setCurrentColorChip ] = useState<ColorChip | string>('none');
  
  useEffect(() => { if (isActive) reset(); setCurrentColorChip('none'); }, [isActive, reset]);
  
  const handleColorSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setCurrentColorChip(e.target.value); }
  const handleFormSubmit = ({ title }: { title?: string }, e: any) => {
    e.preventDefault();
    if (title) {
      const time = Number(new Date().getTime());
      dispatch(addFolder({ name: title.trim(), time, color: currentColorChip }));
      dispatch(toggleModal(null));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormFieldset $error={errors.title ? true : false}>
        <legend>새로운 폴더</legend>
        <label htmlFor="title">이름</label>
        <BasicFolderInputWrapper>
          <input 
            type='text'
            placeholder='폴더명을 입력해주세요'
            {...register('title', {
              required: '폴더명을 입력해주세요',
              maxLength: { value: 12, message: '폴더명은 최대 12자까지 입력할 수 있습니다' },
              validate: { overlap: (value) =>  folderList
                .some(({ name }) => name === value) ? '이미 사용중인 폴더명입니다' : undefined }
            })}
          />
          <FormColorSelectEl $color={currentColorChip === 'none' ? 'none' : THEME_COLOR[currentColorChip]}>
            <select name="color" onChange={handleColorSelectChange}>
              <option value="none">none</option>
              <option value="red">red</option>
              <option value="orange">orange</option>
              <option value="yellow">yellow</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
              <option value="purple">purple</option>
              <option value="pink">pink</option>
            </select>
          </FormColorSelectEl>
        </BasicFolderInputWrapper>
        { errors.title && <FormErrorMessage>{ String(errors.title?.message) }</FormErrorMessage> }
      </FormFieldset>
      <FormBtnWrap>
        <button type='button' onClick={() => dispatch(toggleModal(null))}>취소</button>
        <button type='submit'>확인</button>
      </FormBtnWrap>
    </form>
  )
}
