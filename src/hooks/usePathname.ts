import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export default function usePathname() {

  const { pathname, state } = useLocation();
  const { folderList } = useAppSelector(({ folder }) => folder);

  const targetPath = state ?? pathname.split('/')[1] ?? 'all';
  const isInvalid = targetPath === 'trash';
  const targetName = targetPath === 'folder' ? decodeURI(pathname.split('/')[2]) : '';
  const isNotFound = !folderList.some(({ name }) => name === targetName);

  return [ targetPath, targetName, isInvalid, isNotFound ];
}
