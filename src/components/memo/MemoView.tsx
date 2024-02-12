import React from 'react'
import styled from 'styled-components'
import MemoEditor from './MemoEditor';
import { useAppSelector } from '../../app/hooks';
import { MemoList } from '../../app/actions/memo';
import { FolderData, FolderDataKey } from '../../app/actions/folder';

export default function MemoView() {

  const memo = useAppSelector(({ memo }) => memo);
  const folder = useAppSelector(({ folder }) => folder);

  return (
    <MemoListContainer>
      <ul>
        {
        memo.dataLength > 0 ? 
          <MemoListItem>
            {
            dataSort(memo.data, folder.data, folder.activeFolder)
              .map(([ createAt, { updateAt, markdown } ]) => (
                <MemoListItem key={createAt}>
                  <p>{ markdown } { updateAt }</p>
                </MemoListItem>
              ))
            }
          </MemoListItem> :
          <MemoListItemEmpty>메모 없음</MemoListItemEmpty>
        }
      </ul>
      <MemoEditor />
    </MemoListContainer>
  )
}

const dataSort = (data:MemoList, folderData:FolderData, activeFolder:FolderDataKey) => {
  let targetData = Object.entries(data);
  const { sort } = activeFolder !== '' ? folderData[activeFolder] : { sort: { type: 'create', sort: 'desc' } };
  const sortAction = `${sort.type}/${sort.sort}`;
  if (activeFolder !== '') targetData = targetData.filter(([ _, { included }]) => included === activeFolder);

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
    // case 'title/desc':
    //   targetData.sort(([ , a ], [ , b ]) => Number(b.updateAt) - Number(a.updateAt));
    //   break;
    // case 'title/asc':
    //   targetData.sort(([ , a ], [ , b ]) => Number(b.updateAt) - Number(a.updateAt));
    //   break;
    default:
      console.log(sortAction);
  }

  return targetData;
};

// styled components
const MemoListContainer = styled.div`
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