import { useEffect, useState } from 'react';
import { sha256Hex } from '../utils/crypto.js';
import { formatPrecisionTimestamp } from '../utils/timestamp.js';
import CopyToast from './CopyToast.jsx';

export default function FlagCard({ config, flag, status, error, onRetry }) {
  const [copied, setCopied] = useState(false);
  const [hash, setHash] = useState('');
  const [timestamp, setTimestamp] = useState(formatPrecisionTimestamp());

  useEffect(() => {
    if (!flag) {
      setHash('');
      return;
    }
    sha256Hex(flag).then(setHash).catch(() => setHash('—'));
  }, [flag]);

  useEffect(() => {
    const id = setInterval(() => setTimestamp(formatPrecisionTimestamp()), 84);
    return () => clearInterval(id);
  }, []);

  const handleCopy = async () => {
    if (!flag) return;
    try {
      await navigator.clipboard.writeText(flag);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = flag;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <article className={`vault ${status === 'success' ? 'vault--success' : ''}`}>
        <div className="vault__scanline" aria-hidden="true" />

        <div className="vault__bar">
          <div className="vault__bar-left">
            <span className="vault__pulse" aria-hidden="true" />
            <span className="vault__bar-label">{config.transmissionLabel}</span>
          </div>
          <div className="vault__bar-right">
            <span className="material-symbols-outlined vault__signal" aria-hidden="true">
              signal_cellular_alt
            </span>
            <span className="vault__stable">{config.signalStable}</span>
          </div>
        </div>

        <div className="vault__content">
          {status === 'loading' && (
            <div className="vault__section vault__section--center">
              <h2 className="vault__heading">{config.headingLoading}</h2>
              <div className="vault__flag-box">
                <div className="flag-skeleton">
                  <div className="flag-skeleton__line flag-skeleton__line--long" />
                  <div className="flag-skeleton__line flag-skeleton__line--short" />
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="vault__section vault__section--center">
              <h2 className="vault__heading vault__heading--error">{config.headingError}</h2>
              <p className="vault__error-msg">{error}</p>
              <button type="button" className="vault__copy" onClick={onRetry}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  refresh
                </span>
                <span>{config.retryButton}</span>
              </button>
            </div>
          )}

          {status === 'success' && flag && (
            <>
              <div className="vault__section vault__section--center">
                <h2 className="vault__heading">{config.headingSuccess}</h2>
                <div className="vault__flag-box">
                  <span className="vault__corner vault__corner--tl" aria-hidden="true" />
                  <span className="vault__corner vault__corner--tr" aria-hidden="true" />
                  <span className="vault__corner vault__corner--bl" aria-hidden="true" />
                  <span className="vault__corner vault__corner--br" aria-hidden="true" />
                  <p className="vault__flag" aria-live="polite">
                    {flag}
                  </p>
                </div>
                <button
                  type="button"
                  className="vault__copy"
                  onClick={handleCopy}
                  aria-label="Copy flag to clipboard"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    content_copy
                  </span>
                  <span>{config.copyButton}</span>
                </button>
              </div>

              <div className="vault__meta">
                <div className="vault__meta-cell">
                  <span className="vault__meta-label">{config.metaHashLabel}</span>
                  <p className="vault__meta-value vault__meta-value--hash">{hash || '…'}</p>
                </div>
                <div className="vault__meta-cell">
                  <span className="vault__meta-label">{config.metaTimestampLabel}</span>
                  <p className="vault__meta-value">
                    T+ <span>{timestamp}</span>
                  </p>
                </div>
              </div>

              <div className="vault__status-row">
                <div className="vault__status-item">
                  <span className="vault__status-square" />
                  <span>{config.statusSecure}</span>
                </div>
                <div className="vault__status-item">
                  <span className="vault__status-square" />
                  <span>{config.statusVerified}</span>
                </div>
                <div className="vault__status-item vault__status-item--dim">
                  <span className="vault__status-square vault__status-square--dim" />
                  <span>{config.statusNode}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="vault__chatter">
          <div className="vault__viz" aria-hidden="true">
            <span style={{ height: '4px' }} />
            <span style={{ height: '8px' }} />
            <span style={{ height: '12px' }} />
            <span style={{ height: '8px' }} />
            <span style={{ height: '4px' }} />
          </div>
          <span className="vault__chatter-text">{config.chatterFooter}</span>
        </div>
      </article>

      <CopyToast visible={copied} message={config.copyToast} />
    </>
  );
}
