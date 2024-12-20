import { useEffect } from 'react'

export default function useStopScroll(stop: boolean) {
  useEffect(() => {
    document.body.classList[stop ? 'add' : 'remove']('stop-scroll')
    return () => {
      document.body.classList.remove('stop-scroll')
    }
  }, [stop])
}
