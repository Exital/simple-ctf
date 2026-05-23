import { useState } from 'react';

export default function FlagCard({ flag, status, error, onRetry }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!flag) return;
    try {
      await navigator.clipboard.writeText(flag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = flag;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className={`flag-card flag-card--${status}`}>
      <div className="flag-card__corner flag-card__corner--tl" aria-hidden="true" />
      <div className="flag-card__corner flag-card__corner--tr" aria-hidden="true" />
      <div className="flag-card__corner flag-card__corner--bl" aria-hidden="true" />
      <div className="flag-card__corner flag-card__corner--br" aria-hidden="true" />

      <div className="flag-card__header">
        <span className="flag-card__label">TARGET FLAG</span>
        <span className="flag-card__status">
          {status === 'loading' && 'DECRYPTING...'}
          {status === 'success' && 'VERIFIED'}
          {status === 'error' && 'SIGNAL LOST'}
        </span>
      </div>

      <div className="flag-card__body">
        {status === 'loading' && (
          <div className="flag-skeleton" aria-label="Loading flag">
            <div className="flag-skeleton__line flag-skeleton__line--long" />
            <div className="flag-skeleton__line flag-skeleton__line--short" />
          </div>
        )}

        {status === 'error' && (
          <div className="flag-error">
            <p className="flag-error__message">{error}</p>
            <button type="button" className="flag-error__retry" onClick={onRetry}>
              Retry connection
            </button>
          </div>
        )}

        {status === 'success' && flag && (
          <div className="flag-success">
            <p className="flag-display" aria-live="polite">
              {flag.split('').map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="flag-display__char"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {char}
                </span>
              ))}
            </p>
            <button
              type="button"
              className={`flag-copy${copied ? ' flag-copy--copied' : ''}`}
              onClick={handleCopy}
              aria-label={copied ? 'Flag copied' : 'Copy flag to clipboard'}
            >
              {copied ? 'Copied!' : 'Copy flag'}
            </button>
          </div>
        )}
      </div>

      <div className="flag-card__footer">
        <span className="flag-card__hash">SHA-256: classified</span>
        <span className="flag-card__pulse" aria-hidden="true" />
      </div>
    </article>
  );
}
