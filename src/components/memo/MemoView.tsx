import React from 'react'
import styled, { css } from 'styled-components'
import MemoEditor from './MemoEditor'
import { useAppSelector } from '../../app/hooks'
import { MemoList } from '../../app/actions/memo'
import { FolderData, FolderDataKey } from '../../app/actions/folder'
import MemoItem from './MemoItem'


export default function MemoView() {

  const memo = useAppSelector(({ memo }) => memo);
  const folder = useAppSelector(({ folder }) => folder);
  const viewType = useAppSelector(({ ui }) => ui.view) === 'list';

  const [ pinnedMemo, basicMemo ] = dataSort(memo.data, folder.data, folder.activeFolder);

  return (
    <MemoListContainer $viewType={viewType}>
      {
      (viewType || (!viewType && memo.activeMemo === '')) &&
        <ul>
          {
          memo.dataLength > 0 ? 
            <React.Fragment>
              {
              // 고정 메모 출력
              pinnedMemo.length > 0 && 
              <MemoListItem $viewType={viewType}>
                <h2>Pinned Notes ({ pinnedMemo.length })</h2>
                <ul>{ pinnedMemo.map(([ createAt, detail ]) => (<MemoItem key={createAt} data={[createAt, detail]} />)) }</ul>
              </MemoListItem>
              }
              {
              // 메모 출력
              basicMemo.length > 0 && 
              <MemoListItem $viewType={viewType}>
                <h2>All Notes ({ basicMemo.length })</h2>
                <ul>{ basicMemo.map(([ createAt, detail ]) => (<MemoItem key={createAt} data={[createAt, detail]} />)) }</ul>
              </MemoListItem>
              }
            </React.Fragment> :
            <MemoListItemEmpty>메모 없음</MemoListItemEmpty>
          }
        </ul>
      }
      { memo.activeMemo !== '' && <MemoEditor /> }
    </MemoListContainer>
  )
}

export const dataSort = (data:MemoList, folderData:FolderData, activeFolder:FolderDataKey) => {
  let targetData = Object.entries(data);
  const { sort } = activeFolder !== '' ? folderData[activeFolder] : { sort: { type: 'create', sort: 'desc' } };
  const sortAction = `${sort.type}/${sort.sort}`;
  
  if (activeFolder !== '') {
    targetData = targetData.filter(([ _, { included }]) => included === activeFolder);
    switch (sortAction) {
      case 'create/desc':
        targetData.sort(([ createdA, ], [ createdB, ]) => Number(createdA) - Number(createdB));
        break;
      case 'create/asc':
        targetData.sort(([ createdA, ], [ createdB, ]) => Number(createdB) - Number(createdA));
        break;
      case 'update/desc':
        targetData.sort(([ , a ], [ , b ]) => Number(new Date(a.updateAt).getTime()) - Number(new Date(b.updateAt).getTime()));
        break;
      case 'update/asc':
        targetData.sort(([ , a ], [ , b ]) => Number(new Date(b.updateAt).getTime()) - Number(new Date(a.updateAt).getTime()));
        break;
      case 'title/desc':
        targetData.sort(([ , a ], [ , b ]) => a.markdown.charCodeAt(2) - b.markdown.charCodeAt(2));
        break;
        case 'title/asc':
        targetData.sort(([ , a ], [ , b ]) => b.markdown.charCodeAt(2) - a.markdown.charCodeAt(2));
        break;
      default:
        console.log(sortAction);
    }
  } else {
    targetData.sort(([ createdA, ], [ createdB, ]) => Number(createdA) - Number(createdB));
  }

  const pinnedArr = targetData.filter(([ _, { isPinned }]) => isPinned);
  const targetArr = targetData.filter(([ _, { isPinned }]) => !isPinned);
  
  return [ pinnedArr, targetArr ];
};

// styled components
const MemoListContainer = styled.div<{ $viewType: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 100%;
  height: 100%;

  & > ul {
    display: block;
    width: 100%;
    height: 100%;
    padding: 12px;
    ${({ $viewType }) => $viewType && css`
      width: 241px;
      border-right: 1px solid ${({ theme }) => theme.grayScale200};
    `}
    overflow-y: auto;
    transition: border 0.3s;
  }
`;

const MemoListItem = styled.li<{ $viewType: boolean }>`
  display: block;
  width: 100%;
  height: auto;

  & + & {margin: 14px 0px 0px;}
  & > h2 {
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 4px;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.grayScale500};
  }
  & > ul {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const MemoListItemEmpty = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 0px 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.grayScale400};
  white-space: nowrap;
  transition: color 0.3s;
`;