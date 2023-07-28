import { useEffect, useState } from "react";

export function useDebounce(value: any, delay: number, clearIfEmpty = true) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  let timeout: any;

  useEffect(() => {
    if (clearIfEmpty && !value) {
      clearTimeout(timeout);
      setDebouncedValue(value);
      return;
    }

    timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
