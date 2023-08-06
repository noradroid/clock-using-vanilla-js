const http = require("http");
const fs = require("fs");

const PORT = 5000;

http
  .createServer((request, response) => {
    if (request.url === "/") {
      /** DOES NOT WORK :(
        // read index.html contents
        htmlReadStream = fs.createReadStream("index.html");
        // write header for response
        response.writeHead(200, { "Content-Type": "text/html" });
        // .pipe on a readStream will send read contents to a write stream and
        // in this case response extends the stream object and is a write stream
        htmlReadStream.pipe(response);
        response.end();
       */
      fs.readFile("index.html", (err, data) => {
        // write header
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
      });
    } else {
      // redirect to index
      response.writeHead(301, { Location: "/" });
      response.end("Invalid request"); // this will not get printed / displayed anywhere
    }
  })
  .listen(PORT);
