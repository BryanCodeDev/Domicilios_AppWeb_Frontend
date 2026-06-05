import { useState, useEffect, useCallback } from 'react';

const useQuery = (queryFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return queryFn()
      .then(result => setData(result))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [queryFn]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};

export { useQuery };
