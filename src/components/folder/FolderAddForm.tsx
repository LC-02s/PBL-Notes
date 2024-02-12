import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styled, { css } from 'styled-components';
import { toggleModal } from '../../app/actions/ui';
import { FolderData, addFolder } from '../../app/actions/folder';

export default function FolderAddForm() {

  const data = useAppSelector(({ folder }) => folder.data);
  const isActive = useAppSelector(({ ui }) => ui.modal);
  const dispatch = useAppDispatch();
  
  const { register, formState: { errors }, reset, handleSubmit } = useForm({ mode: 'onSubmit' });

  useEffect(() => { if (isActive) reset(); }, [isActive, reset]);

  const handleFormSubmit = ({ title }: { title?: keyof FolderData }, e: any) => {
    e.preventDefault();
    if (title) {
      dispatch(addFolder({ id: title, color: 'none' }));
      dispatch(toggleModal(undefined));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormFieldset $error={errors.title ? true: false}>
        <legend>새로운 폴더</legend>
        <label htmlFor="title">이름</label>
        <input 
          type='text'
          placeholder='폴더명을 입력해주세요'
          {...register('title', {
            required: '폴더명을 입력해주세요',
            maxLength: {value: 12, message: '폴더명은 최대 12자까지 입력할 수 있습니다'},
            validate: { overlap: (value) =>  Object
              .keys(data).some((title) => title === value) ? '이미 사용중인 폴더명입니다' : undefined}
          })}
        />
        { errors.title &&
          <FormErrorMessage>{ String(errors.title?.message) }</FormErrorMessage> }
      </FormFieldset>
      <FormBtnWrap>
        <button type='button' onClick={() => dispatch(toggleModal(undefined))}>취소</button>
        <button type='submit'>확인</button>
      </FormBtnWrap>
    </form>
  )
}

// styled components
const FormFieldset = styled.fieldset<{ $error: boolean }>`
  display: block;
  width: 100%;
  height: auto;

  & + & {margin: 14px 0px 0px;}
  & > legend {
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 12px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.grayScale700};
  }
  & > label {
    display: block;
    width: 100%;
    height: auto;
    padding: 0px 2px;
    margin: 0px 0px 4px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.grayScale600};
  }
  & > input {
    display: block;
    width: 100%;
    height: 36px;
    padding: 4px 12px;
    border: 1px solid ${({ theme }) => theme.grayScale200};
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale700};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.grayScale000};
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
    ${({ $error }) => $error && css`
      border-color: #E14B4D !important;
    `}
  }
  & > input::placeholder {color: ${({ theme }) => theme.grayScale400};}
  & > input:focus {
    border-color: #3B84D8;
    box-shadow: 0px 0px 0px 2px rgba(59,132,216,0.3);
    ${({ $error }) => $error && css`
      box-shadow: 0px 0px 0px 2px rgba(225,75,77,0.3);
    `}
  }
`;

const FormErrorMessage = styled.p`
  position: relative;
  display: block;
  width: 100%;
  margin: 4px 0px;
  padding-left: 22px;
  font-size: 15px;
  font-weight: 400;
  color: #E14B4D;
  line-height: 22px;
  word-break: keep-all;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0px;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e14b4d' d='M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2'/%3E%3Cpath fill='%23e14b4d' fill-rule='evenodd' d='M8.723 2.051c1.444-.494 2.34-.801 3.277-.801c.938 0 1.833.307 3.277.801l.727.25c1.481.506 2.625.898 3.443 1.23c.412.167.767.33 1.052.495c.275.16.55.359.737.626c.185.263.281.587.341.9c.063.324.1.713.125 1.16c.048.886.048 2.102.048 3.678v1.601c0 6.101-4.608 9.026-7.348 10.224l-.027.011c-.34.149-.66.288-1.027.382c-.387.1-.799.142-1.348.142c-.55 0-.96-.042-1.348-.142c-.367-.094-.687-.233-1.027-.382l-.027-.011C6.858 21.017 2.25 18.092 2.25 11.99v-1.6c0-1.576 0-2.792.048-3.679c.025-.446.062-.835.125-1.16c.06-.312.156-.636.34-.9c.188-.266.463-.465.738-.625c.285-.165.64-.328 1.052-.495c.818-.332 1.962-.724 3.443-1.23zM12 2.75c-.658 0-1.305.212-2.92.764l-.572.196c-1.513.518-2.616.896-3.39 1.21a7.137 7.137 0 0 0-.864.404a1.648 1.648 0 0 0-.208.139a.386.386 0 0 0-.055.05a.409.409 0 0 0-.032.074c-.02.056-.042.136-.063.248a7.438 7.438 0 0 0-.1.958c-.046.841-.046 2.015-.046 3.624v1.574c0 5.176 3.87 7.723 6.449 8.849c.371.162.586.254.825.315c.228.059.506.095.976.095s.748-.036.976-.095c.24-.06.454-.153.825-.315c2.58-1.126 6.449-3.674 6.449-8.849v-1.574c0-1.609 0-2.783-.046-3.624a7.423 7.423 0 0 0-.1-.958a1.738 1.738 0 0 0-.063-.248a.408.408 0 0 0-.032-.074a.385.385 0 0 0-.055-.05a1.64 1.64 0 0 0-.208-.14a7.135 7.135 0 0 0-.864-.402c-.774-.315-1.877-.693-3.39-1.21l-.573-.197C13.305 2.962 12.658 2.75 12 2.75' clip-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const FormBtnWrap = styled.p`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: auto;
  padding: 18px 0px 0px;
  margin: 24px 0px 0px;
  border-top: 1px solid ${({ theme }) => theme.grayScale200};

  button {
    display: block;
    width: auto;
    height: auto;
    padding: 4px;
    min-width: 86px;
    font-size: 15px;
    color: ${({ theme }) => theme.grayScale700};
    text-align: center;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.grayScale100};
    transition: background 0.3s, color 0.3s;
  }
  button:hover,
  button:focus {
    background-color: ${({ theme }) => theme.grayScale200};
  }
  button[type="submit"] {
    background-color: #3B84D8;
    color: #FFF;
  }
  button[type="submit"]:hover,
  button[type="submit"]:focus {
    background-color: #2870C3;
  }
`;