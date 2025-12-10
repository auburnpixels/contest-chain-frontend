import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const debouncedRef = useRef<T>(value);

  useEffect(() => {
    // For strings: handle programmatic changes immediately (no debounce)
    // - Empty to non-empty: URL param initialization
    // - Non-empty to empty: Reset filters
    if (typeof value === 'string' && typeof debouncedRef.current === 'string') {
      const isEmpty = (debouncedRef.current as string) === '';
      const willBeEmpty = (value as string) === '';
      
      if ((isEmpty && !willBeEmpty) || (!isEmpty && willBeEmpty)) {
        debouncedRef.current = value;
        setDebouncedValue(value);
        return;
      }
    }

    const timer = setTimeout(() => {
      debouncedRef.current = value;
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

