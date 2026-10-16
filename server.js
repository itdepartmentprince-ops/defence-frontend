process.env.NODE_ENV = "production";

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false; // Always run production build on server
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare()
    .then(() => {
        createServer((req, res) => {
            const rawUrl = req.url || "/";

            // Normalize any variation of homepage to /test
            if (
                rawUrl === "/" ||
                rawUrl === "/test" ||
                rawUrl === "/test/" ||
                rawUrl === "/test/index.php" ||
                rawUrl === "/test/index.html" ||
                rawUrl === "/index.php" ||
                rawUrl === "/index.html"
            ) {
                req.url = "/test";
            } else if (rawUrl.startsWith("/?")) {
                req.url = "/test" + rawUrl.slice(1);
            } else if (rawUrl.startsWith("/test/?")) {
                req.url = "/test?" + rawUrl.slice(7);
            } else if (rawUrl.startsWith("/test/index.php?")) {
                req.url = "/test?" + rawUrl.slice(16);
            }

            const parsedUrl = parse(req.url, true);
            console.log(`[Next] ${req.method} ${rawUrl} -> ${req.url}`);
            handle(req, res, parsedUrl);
        }).listen(port, (err) => {
            if (err) throw err;
            console.log(`> Next.js Frontend Server ready on port ${port} (Production Mode)`);
        });
    })
    .catch((err) => {
        console.error("Failed to start Next.js frontend server:", err);
        process.exit(1);
    });
