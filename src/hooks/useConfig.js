import { useEffect, useState } from 'react';
import { defaultConfig } from '../configDefaults.js';

export function useConfig() {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/config');
        if (!res.ok) {
          throw new Error(`Config request failed (${res.status})`);
        }
        const data = await res.json();
        if (!cancelled) {
          setConfig({ ...defaultConfig, ...data });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load config');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (config.pageTitle) {
      document.title = config.pageTitle;
    }
  }, [config.pageTitle]);

  return { config, loading, error };
}
