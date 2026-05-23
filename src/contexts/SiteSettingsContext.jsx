import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';

const CACHE_KEY = 'iconics_site_settings';
const DEFAULTS = { speakers_active: 'true', schedule_active: 'true' };

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
}

const SiteSettingsContext = createContext({ settings: DEFAULTS, loading: true });

export function SiteSettingsProvider({ children }) {
  const cached = readCache();
  const [settings, setSettings] = useState(cached ?? DEFAULTS);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    api.getSettings()
      .then(r => {
        setSettings(r.data);
        writeCache(r.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
