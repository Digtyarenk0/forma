import { useEffect, useState } from 'react'

export enum Breakpoint {
  MOBILE = 640,
  TABLET = 940,
  LAPTOP = 1240
}

export const useMediaQuery = (breakpoint: number): boolean => {
  const [isCurrentBreakpoint, setCurrentBreakpoint] = useState((window?.visualViewport?.width || 0) <= breakpoint)

  useEffect(() => {
    const handleResize = () => setCurrentBreakpoint((window?.visualViewport?.width || 0) <= breakpoint)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isCurrentBreakpoint
}
