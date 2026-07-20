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

// ===== Live reload (SSE) =====
const LIVERELOAD_SCRIPT = `
<script>
(function () {
  const es = new EventSource('/__livereload');
  es.onmessage = function (e) {
    if (e.data === 'reload') location.reload();
  };
})();
</script>
`;

let sseClients = [];

function notifyReload() {
    sseClients.forEach((res) => res.write('data: reload\n\n'));
}

function watchForChanges() {
    let debounceTimer = null;
    const watchDirs = ['.', 'css', 'js', 'views', 'img'];
    watchDirs.forEach((dir) => {
        const dirPath = path.join(STATIC_PATH, dir);
        if (!fs.existsSync(dirPath)) return;
        fs.watch(dirPath, { recursive: dir !== '.' }, (eventType, filename) => {
            if (!filename) return;
            if (dir === '.' && !/\.(html|css|js)$/i.test(filename)) return;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                console.log(`🔄 Change detected: ${path.join(dir, filename)} — reloading browser`);
                notifyReload();
            }, 150);
        });
    });
}

http.createServer(async (req, res) => {
    if (req.url === '/__livereload') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        });
        res.write('\n');
        sseClients.push(res);
        req.on('close', () => {
            sseClients = sseClients.filter((c) => c !== res);
        });
        return;
    }

    try {
        const file = await prepareFile(req.url);
        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

        if (file.ext === 'html') {
            let chunks = [];
            for await (const chunk of file.stream) chunks.push(chunk);
            let body = Buffer.concat(chunks).toString('utf8');
            if (body.includes('</body>')) {
                body = body.replace('</body>', `${LIVERELOAD_SCRIPT}</body>`);
            } else {
                body += LIVERELOAD_SCRIPT;
            }
            res.writeHead(statusCode, { 'Content-Type': mimeType });
            res.end(body);
            return;
        }

        res.writeHead(statusCode, { 'Content-Type': mimeType });
        file.stream.pipe(res);
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end('Server Error');
    }
}).listen(PORT);

watchForChanges();

console.log(`\n==============================================`);
console.log(`✅ Server is running successfully!`);
console.log(`👉 Open http://localhost:${PORT} in your browser.`);
console.log(`🔁 Live reload enabled — save a file to auto-refresh.`);
console.log(`==============================================\n`);
