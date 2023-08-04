import { useSearchParams } from 'next/navigation';
import { useMemo } from "react";

export function useQuery(field: string) {
  const searchParams = useSearchParams();
  const id = useMemo(() => {
    if (searchParams.get(field)) {
      return searchParams.get(field) as string;
    } else {
      return undefined;
    }
  }, [field]);

  return id;
}
