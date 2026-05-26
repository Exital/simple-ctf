import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getBasePath } from '../basePath.js';
import { getConfig } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const FLAG = process.env.FLAG;
const basePath = getBasePath();

if (!FLAG) {
  console.error('ERROR: FLAG environment variable is not set.');
  process.exit(1);
}

const app = express();
const distPath = path.join(__dirname, '..', 'dist');

const config = getConfig();

const router = express.Router();

router.get('/api/config', (_req, res) => {
  res.json(config);
});

router.get('/api/flag', (_req, res) => {
  res.json({ flag: FLAG });
});

router.use(express.static(distPath, { redirect: false }));

router.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

if (basePath) {
  app.use((req, res, next) => {
    if (req.path === basePath) {
      return res.redirect(301, `${basePath}/`);
    }
    if (!req.path.startsWith(`${basePath}/`)) {
      return next();
    }
    const suffix = req.url.slice(basePath.length) || '/';
    req.url = suffix.startsWith('/') ? suffix : `/${suffix}`;
    router(req, res, next);
  });
} else {
  app.use(router);
}

app.listen(PORT, () => {
  console.log(`Simple CTF server listening on port ${PORT}`);
  if (basePath) {
    console.log(`Base path: ${basePath}`);
  }
  console.log(`App title: ${config.appTitle}`);
});
