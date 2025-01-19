import { useState, useEffect } from "react";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T, Args>(
  fetchFunction: (args: Args) => Promise<T>,
  args: Args
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFunction(args);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, args]);

  return { data, isLoading, error };
}
