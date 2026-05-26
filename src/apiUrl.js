/** Resolve an API path relative to the current page URL (runtime BASE_PATH). */
export function apiUrl(path) {
  const normalized = path.replace(/^\//, '');
  return new URL(normalized, window.location.href).pathname;
}
