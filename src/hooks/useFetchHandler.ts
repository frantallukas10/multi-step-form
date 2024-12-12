import { useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useFetchHandler = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetcher();
        setData(result);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetcher]);

  return { data, error, loading };
};
