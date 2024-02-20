import { useLocation } from 'react-router-dom';

export default function usePathname() {

  const { pathname, state } = useLocation();

  const targetPath = state ?? pathname.split('/')[1];
  const isInvalid = targetPath === 'archive' || targetPath === 'trash';
  const targetName = isInvalid ? '' : decodeURI(pathname.split('/')[2] ?? 'all');

  return [ targetPath, targetName, isInvalid ];
}
