import { useEffect, useState } from 'react'

export interface UseDebounceResult<T> {
  value: T
  pending: boolean
}

export const useDebounce = <T>(value: T, delay = 300): UseDebounceResult<T> => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return { value: debouncedValue, pending: value !== debouncedValue }
}
