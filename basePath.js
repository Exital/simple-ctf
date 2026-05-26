/** Normalize BASE_PATH for subpath deployments (e.g. Ingress at /ctf). */
export function normalizeBasePath(raw) {
  if (raw === undefined || raw === null) return '';
  const s = String(raw).trim();
  if (!s || s === '/') return '';
  let p = s.startsWith('/') ? s : `/${s}`;
  p = p.replace(/\/+$/, '');
  return p || '';
}

export function getBasePath() {
  return normalizeBasePath(process.env.BASE_PATH);
}
