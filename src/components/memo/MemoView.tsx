import React from 'react'
import styled from 'styled-components'
import MemoEditor from './MemoEditor'
import { useAppSelector } from '../../app/hooks'
import { MemoData, MemoList, extractTitle } from '../../app/actions/memo'
import { FolderData, FolderDataKey } from '../../app/actions/folder'
import moment from 'moment'

export default function MemoView() {

  const memo = useAppSelector(({ memo }) => memo);
  const folder = useAppSelector(({ folder }) => folder);
  const viewType = useAppSelector(({ ui }) => ui.view) === 'list';

  const [ pinnedMemo, basicMemo ] = dataSort(memo.data, folder.data, folder.activeFolder);

  return (
    <MemoListContainer $viewType={viewType}>
      <ul>
        {
        memo.dataLength > 0 ? 
          <React.Fragment>
              {
              // 고정 메모 출력
              pinnedMemo.length > 0 && 
              <MemoListItem>
                <h2>Pinned Notes</h2>
                <ul>{ pinnedMemo.map(([ createAt, detail ]) => (<MemoItem key={createAt} data={[createAt, detail]} />)) }</ul>
              </MemoListItem>
              }
              {
              // 메모 출력
              basicMemo.length > 0 && 
              <MemoListItem>
                <h2>All Notes</h2>
                <ul>{ basicMemo.map(([ createAt, detail ]) => (<MemoItem key={createAt} data={[createAt, detail]} />)) }</ul>
              </MemoListItem>
              }
          </React.Fragment> :
          <MemoListItemEmpty>메모 없음</MemoListItemEmpty>
        }
      </ul>
      <MemoEditor />
    </MemoListContainer>
  )
}

type MemoItemsProps = { data: [ string, MemoData ] };
const MemoItem: React.FC<MemoItemsProps> = ({ data: [ createAt, detail ] }) => (
  <li>
    <h3>
      <span>{ extractTitle(detail.markdown) || 'unknown note' }</span>
      { detail.isPinned && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.184 7.805l-2.965-2.967c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107"></path></svg> }
    </h3>
    <p>
      <span>{ detail.included }</span>
      <span>{ moment(createAt).fromNow() }</span>
    </p>
  </li>
);

const dataSort = (data:MemoList, folderData:FolderData, activeFolder:FolderDataKey) => {
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
        targetData.sort(([ , a ], [ , b ]) => Number(a.updateAt) - Number(b.updateAt));
        break;
      case 'update/asc':
        targetData.sort(([ , a ], [ , b ]) => Number(b.updateAt) - Number(a.updateAt));
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
  overflow-y: auto;

  ul {
    display: block;
    width: 241px;
    height: 100%;
    padding: 12px;
    border-right: 1px solid ${({ theme }) => theme.grayScale200};
    transition: border 0.3s;
  }
`;

const MemoListItem = styled.li``;

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