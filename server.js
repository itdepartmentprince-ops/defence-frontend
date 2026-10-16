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
        createServer(async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true);
                const pathname = parsedUrl.pathname || "";
                const cleanPath = pathname.replace(/\/+$/, "");

                // Explicitly render the Home page for /test, /test/, and /
                if (cleanPath === "/test" || cleanPath === "") {
                    return await app.render(req, res, "/", parsedUrl.query);
                }

                await handle(req, res, parsedUrl);
            } catch (err) {
                console.error("Error occurred handling", req.url, err);
                res.statusCode = 500;
                res.end("Internal Server Error");
            }
        }).listen(port, (err) => {
            if (err) throw err;
            console.log(`> Next.js Frontend Server ready on port ${port} (Production Mode)`);
        });
    })
    .catch((err) => {
        console.error("Failed to start Next.js frontend server:", err);
        process.exit(1);
    });
