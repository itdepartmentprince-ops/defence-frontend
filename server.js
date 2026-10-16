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
            // Normalize any variation of homepage (/ or /test or /test/) to /test
            if (req.url === "/" || req.url === "/test" || req.url === "/test/") {
                req.url = "/test";
            } else if (req.url.startsWith("/?")) {
                req.url = "/test" + req.url.slice(1);
            } else if (req.url.startsWith("/test/?")) {
                req.url = "/test?" + req.url.slice(7);
            }

            const parsedUrl = parse(req.url, true);
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
