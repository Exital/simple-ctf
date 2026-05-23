export default function Header({ config }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <span className="material-symbols-outlined site-header__icon" aria-hidden="true">
            security
          </span>
          <span className="site-header__title">{config.appTitle}</span>
        </div>
        <div className="site-header__actions">
          <nav className="site-header__nav" aria-label="Main">
            <span className="site-header__nav-link site-header__nav-link--active">
              {config.navTerminal}
            </span>
            <span className="site-header__nav-link">{config.navMissions}</span>
            <span className="site-header__nav-link">{config.navRanking}</span>
          </nav>
          <button type="button" className="site-header__settings" aria-label="Settings">
            <span className="material-symbols-outlined" aria-hidden="true">
              settings_input_component
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
