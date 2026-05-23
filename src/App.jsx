import { useCallback, useEffect, useState } from 'react';
import FlagCard from './components/FlagCard.jsx';
import Header from './components/Header.jsx';
import SiteFooter from './components/SiteFooter.jsx';

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

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      document.body.style.backgroundPosition = `${x}px ${y}px, 0 0, 0 0, 40px 40px, 40px 40px`;
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="app">
      <div className="app__grid-bg" aria-hidden="true" />
      <Header />
      <main className="app__main">
        <FlagCard flag={flag} status={status} error={error} onRetry={fetchFlag} />
      </main>
      <SiteFooter />
    </div>
  );
}
