// when we need to read a large text-file and then send it to the client

////////////////////////////////////////////////////////////////////////
const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  // solution-3:
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
});

server.listen(8080, () => {
  console.log("server up and running on: 8080");
});
