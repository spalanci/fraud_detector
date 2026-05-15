const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.env.PORT || 5501);
const chatbotApiPort = Number(process.env.CHATBOT_API_PORT || 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

http
  .createServer((request, response) => {
    if (request.url.startsWith("/ask")) {
      const proxyRequest = http.request(
        {
          hostname: "127.0.0.1",
          port: chatbotApiPort,
          path: request.url,
          method: request.method,
          headers: {
            ...request.headers,
            host: `127.0.0.1:${chatbotApiPort}`,
            origin: `http://127.0.0.1:${chatbotApiPort}`,
            referer: `http://127.0.0.1:${chatbotApiPort}/`,
          },
        },
        (proxyResponse) => {
          response.writeHead(proxyResponse.statusCode || 500, proxyResponse.headers);
          proxyResponse.pipe(response);
        },
      );

      proxyRequest.on("error", () => {
        response.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
        response.end(
          JSON.stringify({
            success: false,
            error: "Chatbot API bulunamadi. fraud_dedector klasorunde `node index.js` calismali.",
          }),
        );
      });

      request.pipe(proxyRequest);
      return;
    }

    const urlPath = decodeURIComponent(request.url.split("?")[0]);
    const requestPath = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const filePath = path.resolve(root, requestPath);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.stat(filePath, (statError, stats) => {
      if (statError || !stats.isFile()) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      });
      fs.createReadStream(filePath).pipe(response);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`http://127.0.0.1:${port}`);
  });
