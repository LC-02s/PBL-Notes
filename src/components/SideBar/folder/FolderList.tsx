import React from 'react'
import { THEME_COLOR } from '../../../App.theme'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { NavLink } from 'react-router-dom';
import { resetActiveNote } from '../../../app/actions/note';
import usePathname from '../../../hooks/usePathname';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { changeFolderIndex } from '../../../app/actions/folder';
import { modalOn } from '../../../app/actions/ui';

export default function FolderList() {

  const { noteStatus, notes } = useAppSelector(({ note }) => note);
  const { folderStatus, folderList } = useAppSelector(({ folder }) => folder);
  const dispatch = useAppDispatch();

  const { targetPath, isNotFound } = usePathname();

  const handleDndEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (destination) dispatch(changeFolderIndex({ targetIndex: source.index, destination: destination.index }));
  }
  const handleEditBtnClick = () => { dispatch(modalOn('folder/modify')); }

  return (
    <FolderListContainer>
      <FolderListTitle>
        <h1>
          My Notes 
          { (noteStatus === 'pending' || folderStatus === 'pending') && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.14}></rect><rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.29} transform="rotate(30 12 12)"></rect><rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.43} transform="rotate(60 12 12)"></rect><rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.57} transform="rotate(90 12 12)"></rect><rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.71} transform="rotate(120 12 12)"></rect><rect width={2} height={5} x={11} y={1} fill="currentColor" opacity={0.86} transform="rotate(150 12 12)"></rect><rect width={2} height={5} x={11} y={1} fill="currentColor" transform="rotate(180 12 12)"></rect><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"></animateTransform></g></svg> }
        </h1>
        {
        (targetPath === 'folder' && !isNotFound) &&
          <button type='button' onClick={handleEditBtnClick}>Edit</button>
        }
      </FolderListTitle>
      <ul>
        <FolderListIconItem $type='' $color='none'>
          <NavLink to='/' state='all' className={({ isActive }) => isActive ? 'active' : ''}>
            <span>모든 노트</span><span>{ notes.filter(({ modifiable }) => modifiable).length }</span>
          </NavLink>
        </FolderListIconItem>
        <DragDropContext onDragEnd={handleDndEnd}>
          <Droppable droppableId='folder'>
            {(provided) => (<li><ul {...provided.droppableProps} ref={provided.innerRef}>
              {folderList.map(({ id, name, color }, idx) => (
                <Draggable key={id} draggableId={String(id)} index={idx}>
                  {(provided, snapshot) => ( 
                  <FolderListItem key={id} $color={color === 'none' ? 'none' : THEME_COLOR[color] ?? 'none'} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} tabIndex={snapshot.isDragging ? 0 : -1}>
                    <NavLink to={`/folder/${name}`} state='folder' className={({ isActive }) => isActive ? 'active' : ''}>
                      <span>{ name }</span><span>{ notes.filter(({ included, modifiable }) => included === name && modifiable).length }</span>
                    </NavLink>
                  </FolderListItem> )}
                </Draggable>
              ))} { provided.placeholder }
            </ul></li>)}
          </Droppable>
        </DragDropContext>
        <FolderListIconItem $type='trash' $color='none'>
          <NavLink to='/trash' state='trash' className={({ isActive }) => isActive ? 'active' : ''} onClick={() => dispatch(resetActiveNote(null))}>
            <span>최근 삭제한 항목</span><span>{ notes.filter(({ modifiable }) => !modifiable).length }</span>
          </NavLink>
        </FolderListIconItem>
      </ul>
    </FolderListContainer>
  )
}

// styled components
const FolderListContainer = styled.div`
  display: block;
  width: 100%;
  height: auto;
  padding: 12px;

  & + & {margin: 12px 0px 0px;}
`;

const FolderListItem = styled.li<{ $color: string }>`
  display: block;
  width: 100%;
  height: auto;
    
  & > a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: auto;
    padding: 6px 8px;
    font-size: 14px;
    border-radius: 4px;
    transition: background 0.2s;
    &:hover {background-color: rgba(${({ theme }) => theme.current === 'light' ? '255,255,255' : '0,0,0'}, 0.12);}
  }
  & > a.active,
  & > a.active:hover {
    background-color: rgba(${({ theme }) => theme.current === 'light' ? '255,255,255' : '0,0,0'}, 0.32);
  }
  & > a > span {display: inline-block; white-space: nowrap;}
  & > a > span:first-of-type {
    position: relative;
    width: 100%;
    padding-left: 18px;
    font-size: inherit;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale700};
    text-overflow: ellipsis;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 4px;
      display: inline-block;
      width: 4px;
      height: 4px;
      margin: auto 0px;
      border-radius: 50%;
      background-color: ${({ theme, $color }) => $color === 'none' ? theme.grayScale500 : $color};
    }
  }
  & > a > span:last-of-type {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale500};
  }
`;

const FolderListIconItem = styled(FolderListItem)<{ $type: string }>`
  & > a > span:first-of-type {
   padding-left: 20px;
  }
  & > a > span:first-of-type::before {
    --icon-size: 14px;
    left: 0px;
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
    color: ${({ theme }) => theme.grayScale600};
    border-radius: 0px;
    background-color: transparent;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' d='M22 11H2'/%3E%3Cpath d='M2 6.95c0-.883 0-1.324.07-1.692A4 4 0 0 1 5.257 2.07C5.626 2 6.068 2 6.95 2c.386 0 .58 0 .766.017a4 4 0 0 1 2.18.904c.144.119.28.255.554.529L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.352C14.098 6 14.675 6 15.828 6h.374c2.632 0 3.949 0 4.804.77c.079.07.154.145.224.224c.77.855.77 2.172.77 4.804V14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z'/%3E%3C/g%3E%3C/svg%3E");
    ${({ $type }) => $type === 'archive' ? css`
    --icon-size: 16px;
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-width='1.5' d='M14.381 9.027a5.765 5.765 0 0 1 1.905-.321c.654 0 1.283.109 1.87.309m-11.04 2.594a4.351 4.351 0 0 0-.83-.08C3.919 11.53 2 13.426 2 15.765C2 18.104 3.919 20 6.286 20h10C19.442 20 22 17.472 22 14.353c0-2.472-1.607-4.573-3.845-5.338M7.116 11.609a5.577 5.577 0 0 1-.354-1.962C6.762 6.528 9.32 4 12.476 4c2.94 0 5.361 2.194 5.68 5.015m-11.04 2.594a4.29 4.29 0 0 1 1.55.634'/%3E%3C/svg%3E");
      ` : $type === 'trash' && css`
      --icon-size: 16px;
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-width='1.5' d='M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.17 4a3.001 3.001 0 0 1 5.66 0'/%3E%3C/svg%3E");
    `}
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
`;

const FolderListTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: auto;
  margin: 0px 0px 8px;
  & > h1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    width: auto;
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.grayScale700};
    white-space: nowrap;
    transition: color 0.3s;

    svg {
      font-size: 16px;
      color: ${({ theme }) => theme.grayScale600};
    }
  }
  & > button {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2px;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale500};
    white-space: nowrap;
    transition: color 0.3s;
  }
  & > button:hover,
  & > button:focus {color: #3B84D8;}
`;