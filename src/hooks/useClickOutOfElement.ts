import React, { useEffect, useState } from "react";

export default function useClickOutOfElement(element: React.RefObject<HTMLDivElement | null>) {

  const [ isOutOfClicked, setIsOutOfClicked ] = useState(false);
  
  useEffect(() => {
    const handleClickToFocus = (e: any) => {
      setIsOutOfClicked((element.current && !element.current.contains(e.target)) ?? false);
    } 
    document.addEventListener('click', handleClickToFocus);
    return () => {
      document.removeEventListener('click', handleClickToFocus);
    }
  }, [ element ]);

  return isOutOfClicked;
}