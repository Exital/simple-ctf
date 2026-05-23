import { useCallback, useEffect, useState } from 'react';
import FlagCard from './components/FlagCard.jsx';

export default function App() {
  const [flag, setFlag] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const fetchFlag = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('/api/flag');
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      const data = await res.json();
      if (!data.flag) {
        throw new Error('No flag in response');
      }
      setFlag(data.flag);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Failed to retrieve flag');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchFlag();
  }, [fetchFlag]);

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-scanlines" aria-hidden="true" />
      <div className="bg-glow bg-glow--left" aria-hidden="true" />
      <div className="bg-glow bg-glow--right" aria-hidden="true" />

      <header className="header">
        <p className="header__badge">SECURE CHANNEL // ACTIVE</p>
        <h1 className="header__title">Simple CTF</h1>
        <p className="header__subtitle">Classified transmission intercepted</p>
      </header>

      <main className="main">
        <FlagCard
          flag={flag}
          status={status}
          error={error}
          onRetry={fetchFlag}
        />
      </main>

      <footer className="footer">
        <span className="footer__dot" />
        Node relay online
      </footer>
    </div>
  );
}
