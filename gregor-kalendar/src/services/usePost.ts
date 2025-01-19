import { useState, useCallback } from "react";

interface UsePostResult<T, U> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  sendRequest: (body: U) => Promise<void>;
}

export function usePost<T, U>(
  postFunction: (body: U) => Promise<T>
): UsePostResult<T, U> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(
    async (body: U) => {
      try {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        const result = await postFunction(body);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [postFunction]
  );

  return { data, isLoading, error, sendRequest };
}