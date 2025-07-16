const fs = require("fs");
const http = require("http");

////////////////////////////////////////////////////////////////////////////////////////////
// FILES

// BLOCKING synchronous way of WRITING and READING
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about Avocado: ${textIn}.\nCreated on: ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// NON-BLOCKING asynchronous way of WRITING and READING
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        // console.log("Writing file has been completed!");
      });
    });
  });
});
// console.log("Reading a file...");

////////////////////////////////////////////////////////////////////////////////////////////
// SIMPLE - SERVER
// const server = http.createServer((req, res) => {
//   res.end("Hello from the server!");
// });
// server.listen(8080, "127.0.0.1", () => {
//   console.log("Server is up and running on PORT: 8080");
// });

////////////////////////////////////////////////////////////////////////////////////////////
// ROUTING
const server = http.createServer((req, res) => {
  const URL_Path = req.url;

  if (URL_Path === "/" || URL_Path === "/overview") {
    res.end("This is an OVERVIEW!");
  } else if (URL_Path === "/product") {
    res.end("This is PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8080, () => {
  console.log("Server up and running on PORT: 8080");
});
