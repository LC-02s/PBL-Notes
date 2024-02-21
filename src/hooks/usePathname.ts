import { useLocation } from 'react-router-dom';

export default function usePathname() {

  const { pathname, state } = useLocation();

  const targetPath = state ?? pathname.split('/')[1] ?? 'all';
  const isInvalid = targetPath === 'trash';
  const targetName = targetPath === 'folder' ? decodeURI(pathname.split('/')[2]) : '';

  return [ targetPath, targetName, isInvalid ];
}
