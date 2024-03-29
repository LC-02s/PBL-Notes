import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function usePathname() {

  const { pathname, state } = useLocation();
  const { folderList, folderSession } = useAppSelector(({ folder }) => folder);
  
  const targetPath = state ?? (pathname.split('/')[1] || 'all');
  const isInvalid = targetPath === 'trash';
  const targetName = targetPath === 'folder' ? decodeURI(pathname.split('/')[2]) : '';
  const isNotFound = useMemo(() => folderSession && targetPath === 'folder' && !folderList.some(({ name }) => name === targetName), [ folderSession, folderList, targetPath, targetName ]);

  return { targetPath, targetName, isInvalid, isNotFound };
}
