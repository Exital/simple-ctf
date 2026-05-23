export default function SiteFooter({ config }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__status">{config.footerStatus}</span>
        <div className="site-footer__links">
          <span>{config.footerLinkEncrypted}</span>
          <span>{config.footerLinkTerminal}</span>
          <span className="site-footer__links--active">{config.footerLinkStatus}</span>
        </div>
      </div>
    </footer>
  );
}
