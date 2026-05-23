import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getConfig } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const FLAG = process.env.FLAG;

if (!FLAG) {
  console.error('ERROR: FLAG environment variable is not set.');
  process.exit(1);
}

const app = express();
const distPath = path.join(__dirname, '..', 'dist');

const config = getConfig();

app.get('/api/config', (_req, res) => {
  res.json(config);
});

app.get('/api/flag', (_req, res) => {
  res.json({ flag: FLAG });
});

app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Simple CTF server listening on port ${PORT}`);
  console.log(`App title: ${config.appTitle}`);
});
