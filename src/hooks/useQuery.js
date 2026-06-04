import { useState, useEffect, useCallback } from 'react';

const useQuery = (queryFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    refetch();
  }, deps);

  return { data, loading, error, refetch };
};

export { useQuery };
