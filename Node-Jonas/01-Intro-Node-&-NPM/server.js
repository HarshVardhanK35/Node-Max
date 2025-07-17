const fs = require("fs");
const http = require("http");
const url = require("url");

// 3rd-party modules
const slugify = require("slugify");

// user-def-module
const replaceTemplate = require("./modules/replaceTemplate");

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
// ROUTING and SIMPLE API with HTML TEMPLATES

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// creating SLUGS
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{X-product-cards-X}", cardsHtml);

    res.end(output);
  }

  // PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }

  // Not Found Page!
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8080, () => {
  console.log("Server up and running on PORT: 8080");
});
