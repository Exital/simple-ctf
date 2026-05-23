import { defaults } from './defaults.js';

const envMap = {
  CTF_APP_TITLE: 'appTitle',
  CTF_PAGE_TITLE: 'pageTitle',
  CTF_NAV_TERMINAL: 'navTerminal',
  CTF_NAV_MISSIONS: 'navMissions',
  CTF_NAV_RANKING: 'navRanking',
  CTF_TRANSMISSION_LABEL: 'transmissionLabel',
  CTF_SIGNAL_STABLE: 'signalStable',
  CTF_HEADING_LOADING: 'headingLoading',
  CTF_HEADING_SUCCESS: 'headingSuccess',
  CTF_HEADING_ERROR: 'headingError',
  CTF_COPY_BUTTON: 'copyButton',
  CTF_COPY_TOAST: 'copyToast',
  CTF_RETRY_BUTTON: 'retryButton',
  CTF_META_HASH_LABEL: 'metaHashLabel',
  CTF_META_TIMESTAMP_LABEL: 'metaTimestampLabel',
  CTF_STATUS_SECURE: 'statusSecure',
  CTF_STATUS_VERIFIED: 'statusVerified',
  CTF_STATUS_NODE: 'statusNode',
  CTF_CHATTER_FOOTER: 'chatterFooter',
  CTF_FOOTER_STATUS: 'footerStatus',
  CTF_FOOTER_LINK_ENCRYPTED: 'footerLinkEncrypted',
  CTF_FOOTER_LINK_TERMINAL: 'footerLinkTerminal',
  CTF_FOOTER_LINK_STATUS: 'footerLinkStatus',
};

export function getConfig() {
  const config = { ...defaults };
  for (const [envKey, configKey] of Object.entries(envMap)) {
    const value = process.env[envKey];
    if (value !== undefined && value !== '') {
      config[configKey] = value;
    }
  }
  return config;
}
