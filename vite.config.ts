import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      viteSingleFile(),
      {
        name: 'save-team-photos-endpoint',
        configureServer(server) {
          server.middlewares.use('/api/save-team-photos', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const saved: string[] = [];
                  const publicDir = path.resolve(__dirname, 'public/images/team');
                  const distDir = path.resolve(__dirname, 'dist/images/team');
                  if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                  }
                  for (const [id, base64Str] of Object.entries(data)) {
                    if (typeof base64Str === 'string' && base64Str.startsWith('data:image')) {
                      const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, '');
                      const buf = Buffer.from(base64Data, 'base64');
                      const targetFile = path.join(publicDir, `${id}.jpg`);
                      fs.writeFileSync(targetFile, buf);
                      if (fs.existsSync(distDir)) {
                        fs.writeFileSync(path.join(distDir, `${id}.jpg`), buf);
                      }
                      saved.push(id);
                    }
                  }
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, saved }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: String(err) }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
