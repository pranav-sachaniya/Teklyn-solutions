const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
    default: 'application/octet-stream',
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
    webp: 'image/webp'
};

const STATIC_PATH = path.join(process.cwd(), './');

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
    // Basic routing to avoid query strings
    const cleanUrl = url.split('?')[0];
    const paths = [STATIC_PATH, cleanUrl];
    if (cleanUrl.endsWith('/')) paths.push('index.html');
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(STATIC_PATH);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : path.join(STATIC_PATH, 'index.html');
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);
    return { found, ext, stream };
};

http.createServer(async (req, res) => {
    try {
        const file = await prepareFile(req.url);
        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
        res.writeHead(statusCode, { 'Content-Type': mimeType });
        file.stream.pipe(res);
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end('Server Error');
    }
}).listen(PORT);

console.log(`\n==============================================`);
console.log(`✅ Server is running successfully!`);
console.log(`👉 Open http://localhost:${PORT} in your browser.`);
console.log(`==============================================\n`);
