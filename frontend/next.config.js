import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the common site config
const commonSiteConfig = JSON.parse(await fs.readFile(path.resolve(__dirname, '../../../sites/common_site_config.json'), 'utf8'));
const { webserver_port } = commonSiteConfig;

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/(app|api|assets|files|private)/:path*',
                destination: `http://localhost:${webserver_port}/:path*`,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/(app|api|assets|files|private)/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
        ];
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname, 'app');
        return config;
    },
    reactStrictMode: true,
};

export default nextConfig;
