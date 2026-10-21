// Load environment variables (.env, .env.local, .env.production, etc.)
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// In development or if explicitly set, allow dev mode; default to production for server
const dev = process.env.NODE_ENV === "development";
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "production";
}

const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

// Resolve basePath: empty for local dev (root /), /test for production server by default
const rawBasePath =
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
        ? process.env.NEXT_PUBLIC_BASE_PATH
        : (dev ? "" : "/test");
const basePath = rawBasePath ? rawBasePath.replace(/\/+$/, "") : "";

app.prepare()
    .then(() => {
        createServer((req, res) => {
            const rawUrl = req.url || "/";

            if (basePath) {
                // Server subfolder mode (e.g. /test)
                if (
                    rawUrl === "/" ||
                    rawUrl === basePath ||
                    rawUrl === `${basePath}/` ||
                    rawUrl === `${basePath}/index.php` ||
                    rawUrl === `${basePath}/index.html` ||
                    rawUrl === "/index.php" ||
                    rawUrl === "/index.html"
                ) {
                    req.url = basePath;
                } else if (rawUrl.startsWith("/?")) {
                    req.url = basePath + rawUrl.slice(1);
                } else if (rawUrl.startsWith(`${basePath}/?`)) {
                    req.url = basePath + "?" + rawUrl.slice(basePath.length + 2);
                } else if (rawUrl.startsWith(`${basePath}/index.php?`)) {
                    req.url = basePath + "?" + rawUrl.slice(basePath.length + 11);
                }
            } else {
                // Local / root domain mode (basePath is empty)
                if (
                    rawUrl === "/index.php" ||
                    rawUrl === "/index.html" ||
                    rawUrl === "/test" ||
                    rawUrl === "/test/" ||
                    rawUrl === "/test/index.php" ||
                    rawUrl === "/test/index.html"
                ) {
                    req.url = "/";
                } else if (rawUrl.startsWith("/index.php?")) {
                    req.url = "/?" + rawUrl.slice(11);
                } else if (rawUrl.startsWith("/index.html?")) {
                    req.url = "/?" + rawUrl.slice(12);
                } else if (rawUrl.startsWith("/test/?")) {
                    req.url = "/?" + rawUrl.slice(7);
                } else if (rawUrl.startsWith("/test?")) {
                    req.url = "/?" + rawUrl.slice(6);
                } else if (rawUrl.startsWith("/test/")) {
                    req.url = "/" + rawUrl.slice(6);
                }
            }

            const parsedUrl = parse(req.url, true);
            console.log(`[Next] ${req.method} ${rawUrl} -> ${req.url}`);
            handle(req, res, parsedUrl);
        }).listen(port, (err) => {
            if (err) throw err;
            console.log(
                `> Next.js Frontend Server ready on port ${port} (${dev ? "Development" : "Production"} Mode, BasePath: "${basePath || "/"}")`
            );
        });
    })
    .catch((err) => {
        console.error("Failed to start Next.js frontend server:", err);
        process.exit(1);
    });

