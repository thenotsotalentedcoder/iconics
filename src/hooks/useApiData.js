import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const cache = new WeakMap();

/**
 * Generic hook to fetch public API data with fallback to static data.
 * @param {Function} fetcher - api.getSpeakers, api.getWorkshops, etc.
 * @param {Array|Object} fallback - static data to use if API fails
 */
export function useApiData(fetcher, fallback = []) {
  const cached = cache.get(fetcher);
  const [data, setData] = useState(cached?.data ?? fallback);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    let cancelled = false;
    const request = cached?.request || fetcher();
    if (!cached) cache.set(fetcher, { request });
    request
      .then(res => {
        cache.set(fetcher, { data: res.data });
        if (!cancelled) setData(res.data);
      })
      .catch(() => { if (!cancelled) setData(fallback); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}
