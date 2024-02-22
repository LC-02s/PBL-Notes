import { useEffect, useRef, useState } from "react";

export default function useDelay(isVisible: boolean) {
  
  const [ visibleDelay, setVisibleDelay ] = useState(false);
  const delayTimer = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      if (delayTimer.current) clearTimeout(delayTimer.current);
      delayTimer.current = window.setTimeout(()=> setVisibleDelay(true), 0);
    }
    return () => {
      setVisibleDelay(false);
    }
  }, [ isVisible ]);

  return visibleDelay;
}