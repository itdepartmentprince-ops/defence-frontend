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

            // Normalize homepage so both /test and /test/ always hit the homepage
            if (req.url === "/test/" || req.url === "/test") {
                req.url = "/test";
                parsedUrl.pathname = "/test";
                parsedUrl.path = "/test";
                parsedUrl.href = "/test";
            } else if (req.url.startsWith("/test/?")) {
                const search = req.url.slice(6);
                req.url = `/test${search}`;
                parsedUrl.pathname = "/test";
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
