export default function CopyToast({ visible }) {
  return (
    <div className={`copy-toast${visible ? ' copy-toast--visible' : ''}`} role="status" aria-live="polite">
      <span className="copy-toast__text">Flag copied to buffer</span>
    </div>
  );
}
