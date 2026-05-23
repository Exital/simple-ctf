export default function CopyToast({ visible, message }) {
  return (
    <div className={`copy-toast${visible ? ' copy-toast--visible' : ''}`} role="status" aria-live="polite">
      <span className="copy-toast__text">{message}</span>
    </div>
  );
}
