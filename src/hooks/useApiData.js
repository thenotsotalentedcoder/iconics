import { useState, useEffect } from 'react';
import { api } from '../utils/api';

/**
 * Generic hook to fetch public API data with fallback to static data.
 * @param {Function} fetcher - api.getSpeakers, api.getWorkshops, etc.
 * @param {Array|Object} fallback - static data to use if API fails
 */
export function useApiData(fetcher, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then(res => { if (!cancelled) setData(res.data); })
      .catch(() => { if (!cancelled) setData(fallback); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}
