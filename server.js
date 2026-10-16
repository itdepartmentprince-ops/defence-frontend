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
            const parsedUrl = parse(req.url, true);

            // Normalize trailing slashes for basePath so /test/ routes directly to /test
            if (parsedUrl.pathname === "/test/") {
                parsedUrl.pathname = "/test";
            } else if (
                parsedUrl.pathname.length > 6 &&
                parsedUrl.pathname.startsWith("/test/") &&
                parsedUrl.pathname.endsWith("/") &&
                !parsedUrl.pathname.startsWith("/test/_next")
            ) {
                parsedUrl.pathname = parsedUrl.pathname.slice(0, -1);
            }

            console.log(`[Next] ${req.method} ${req.url} -> ${parsedUrl.pathname}`);
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
