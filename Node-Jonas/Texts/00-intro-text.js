// ! Intro to Node and NPM !
// -=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * ! 1. What Is Node.js and Why Use It?
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * * Node.JS
 *      - node is JavaScript runtime built on google's open-source V8 JavaScript engine
 * 
 * [an_overview]
 * >>> Node.js
 * [when we take out JS from the browser's triplets (HTML, CSS and JS) and use that extracted JS without any browser-restrictions]
 *      - Node is JavaScript runtime - like container / environment - where JS program can be executed - outside browser
 * 
 * ? who executes this JS code outside browser ?
 * ---
 * >>> V8 Engine
 *      - where JS code parsed and run in NodeJS 
 * 
 * [JavaScript_ON_SERVER]
 *      - means we can use JavaScript on server-side of web-development => which also helps in building fast and highly scalable network/back-end apps
 * 
 * [WHY_AND_WHEN_TO_USE_NODE]
 * ---
 * >>> NODE PROS
 *      - NODE is single-threaded, but based on event-driven, non-blocking I/O model
 *      - NODE perfect for building fast and scalable data-intensive application
 *      - JAVASCRIPT on over entire stack >>> fast and efficient
 *      - NPM: huge library of open-source packages are available for everyone 
 * (companies like NETFLIX, UBER, PAYPAL, eBAY are using NODE)
 * 
 * >>> use NODE for.. 
 *      - API with DB behind it! (prefers NoSQL: MongoDB)
 *      - data streaming (LIKE YT / NETFLIX)
 *      - real-time chat applications
 *      - server-side web applications
 * 
 * (DON'T USE)
 *      - applications with heavy server-side processing (CPU-INTENSIVE APPLICATIONS)
 * use PHP, Python for those!
 * 
 * 
 * ! 2. Running Javascript Outside the Browser
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * [discusses-node-REPL]
 * * REPL
 *      - Read Eval Print Loop
 * 
 * - to enter this environment => open terminal => type "node" => press enter
 * (here in this we can write and execute node code) 
 *      - hit "tab" once / twice inside this "REPL-Env" => which lists down every GLOBAL-VARIABLES that we may use in Node
 * 
 * $ NOTE:
 * - we can do all operations and execute our JS code here in this REPL-ENV
 * - but we cannot save them into a file on our computer!
 * 
 * 
 * ! 3. Using Modules 1: Core Modules
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * >>> execute a JS file
 *      - inside a terminal => run command "node <file-name>" [here use file-name with it's extension ".js"]
 * 
 * (as we can do more than JS that we used in browser! like..)
 * * MODULES
 *      - to add functionality to existing NODE we have to use node's core modules
 * 
 * >>> reading and writing files 
 *      - reading / writing files using node can be done using modules 
 * - we have to use "fs" file-system module
 * 
 * [IMPORT_MODULES]
 *      - use "require" to import a core module into a file (modules that NODE provides)
 * 
 * $ NOTE:
 * - we created "server" named file and to execute it we have to use: "node server.js"
 * 
 * 
 * ! 3. Reading and Writing Files
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * * FS - Module:
 *      - after importing "fs" using "require" we get an object stored into a variable 
 * - we can use different methods from that module using "DOT-NOTATION (.)"
 * 
 * >>> reading a file
 * [code]
 * ------
const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about Avocado: ${textIn}.\nCreated on: ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

console.log("File has been written!");
 * 
 * [import]
 * >>> require
 *      - use "require" to import node's core module: "fs"
 * 
 * [read-a-file]
 * >>> readFileSync("path", "encoding")
 *      - we use "readFileSync" to read data from files in "sync" synchronous way
 * - 1st param: this takes in path of the file to read data inside that file from that path
 * - 2nd param: encoding >>> way to read that file!
 * 
 * [write-to-file]
 * >>> writeFileSync("path", "text-to-include")
 *      - we use "writeFileSync" 
 * - 1st param: which is used to create a file in the path that we specify in 1st param
 * - 2nd param: text to include inside that created file! 
 * 
 * $ NOTE:
 * - these both methods are synchronous 
 * 
 * 
 * ! 4. Blocking and Non-Blocking: Asynchronous Nature of Node.js
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (till now we used synchronous way of reading files and writing to files)
 * 
 * [PROBLEM]
 * * SYNCHRONOUS / BLOCKING_CODE
 *      - each line inside a code-file processed line-by-line
 * 
 * - which blocks the code execution
 *      - a certain line of code will only be executed after a previous line of execution!
 * 
 * [SOLUTION]
 * * ASYNCHRONOUS / NON_BLOCKING_CODE
 *      - asynchronous code takes "block of code" and "callback to register"
 * 
 *      - where heavy block of code will be worked in background >>> 
 * - once it is done || a callback that we registered before is called to handle that result!
 *  
 * $ NOTE:
 * - so rest of the code will be executed in mean-while without being blocked by heavy-code!
 * 
 * >>> asynchronous_code
 * - so every async code takes the process to work with in 1st arg and a callback to register in 2nd arg
 * 
 * ? WHY do we use callbacks ?
 *      - NODE PROCESS (where an app runs) >>> consists of only one single-thread  
 * 
 * [single_thread]
 * - node uses single-thread.. so every application uses only single-thread 
 *      - so all users accessing that application uses only that single-thread! 
 * [PROBLEM]
 * - whenever there are millions of users using same application and when a user assigns a heavy task to node..
 *      - which may block the other users code (until the completion of that heavy task)
 * 
 * * NON-BLOCKING I/O CODE
 * [SOLUTION-NON-BLOCKING]
 * - this blocking manner of code has to be avoided using >>> "asynchronous-code"
 *  
 * - with this heavy task will be set inside back-ground which will be processed but in-parallel all other tasks will be processed!
 *      - after processed it will then be added into main-single-thread 
 * [I/O]
 *      - stands for Input/Output (which is accessing file system and handling network requests)
 * 
 * $ NOTE:
 * - callbacks does not make a code ASYNC
 * - callbacks with some functions in NODE-API will only make code ASYNC
 * (ex: readFile and writeFile) without sync attached!
 * 
 * * CALLBACK-HELL
 * [PROBLEM]
 * - where INPUT of one fn depends on OUTPUT of one fn 
 *      - this cycle continues if there were 'N' number of callbacks are used!
 * 
 * [SOLUTION]
 * - where we can avoid this HELL using es6 PROMISES or ASYNC/AWAIT 
 * 
 * 
 * ! 5. Reading and Writing Files Asynchronously
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * [code]
 * ------
// >>> NON-BLOCKING asynchronous way of WRITING and READING
------
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);                                            // #2: this will read after #1 
});
console.log("Reading file...");         // #1: this is executed 1st 
 * 
 * - here we used "readFile" which is an asynchronous operation 
 *      - "readFile" takes in "path-to-file" and "callback-fn"
 * 
 * * [CALLBACK.FN_REGISTRATION]
 * - this register callback and process the file-reading.. and in meanwhile executes the next lines of code
 *      - after processing / reading of file completes.. callback from "CALLBACK-QUEUE" will get executed!
 * 
 * [code]
 * ------
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log("Writing a file...");

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Writing to file has been completed!");
      });
    });
  });
});
console.log("Reading a file...");
 * 
 * >>> [CALLBACK-HELL]
 * - the pattern in which one callback depends upon the result of another callback is CALLBACK_HELL
 * 
 * - nodejs dependent on these callbacks to implement asynchronous code 
 *      [calling callbacks from CALLBACK-QUEUE once the process of that function is completed]!
 * 
 * * ARROW fns and 'this' keyword
 * [ES6-arrow-fns]
(err, data) => {... some-operation! ...}
 * 
 * - here it does not get it's own "this" 
 * - and ARROW func get "this" access from parent-functions [this is called: "LEXICAL-THIS"]
 *      - it LEXICALLY INHERITS "this" from surrounding scope.. where it was defined! 
 * 
 * >>> normal-anonymous-fns
function(arr, data){}
 * 
 * - gets access to "this" 
 * 
 * $ NOTE:
 * - inside ARROW fns.. "this" will point to global-node-scope
 * 
 * 
 * ! 6. Creating a Simple Web Server
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * [code]                               +---------------//- on every incoming request.. this registered callback will be called!
 * -----                                |
const http = require("http");           |
                                        |
const server = http.createServer((req, res) => {                //- http method: createServer >>> used to create-server 
  res.end("Hello from the server!");
});
                             +----------------------------//- don't need to specify this "HOST-NAME" [node takes default HOST-NAME as "LOCAL-HOST"]
                /------------|-----------------------------------+        
server.listen(8080, "127.0.0.1", () => {                         |
  console.log("Server is up and running on PORT: 8080");        PORT (type: NUMBER)
});
 * 
 * [IMPORT_http]
 *      - similar to "fs" we have to import "http" using "require" function
 * 
 * [http OBJECT] 
 *      - on this "http" object we can access diff types of methods and "createServer" is one of it!
 * 
 * [createServer]
 *      - using "createServer" we can create servers.. which will listen to incoming request.. 
 *          - after processing incoming request.. callback from "createServer" will be executed
 * 
 * [req, res]
 *      - callback inside "createServer" gets access to "req" and "res" objects
 *          - "req" objects access to different types of data like: [method, url, headers..] of incoming request
 *          - "res" is used to send a response 
 * 
 * [listen]
 *      - createServer returns an object and stored inside "server" (as convention)
 *          - on this we have method called: "listen"
 * - used to build a URL
 *      - inside "listen" we can define a "PORT", "HOST-NAME", "a-Callback" [these are OPTIONAL]!
 * 
 * >>> search inside browser for >>> ${host-name}:${port}
 * PORT:
 *      - but PORT: number is required >>> can be any number!
 * HOST-NAME:
 *      - [optional] basically by default NODE takes "localhost" as a host
 * Callback:
 *      - [optional] just for logging some comments
 * 
 * $ [EXECUTION]
 *      - run node <filename>.js inside terminal.. 
 *          - and enter the URL: "127.0.0.1:8080/"
 * 
 * $ [NOTE]:
 * - once node starts this server upon running this file.. node never exits from execution
 * - it runs in loop: [AN EVENT LOOP]
 *      - never exiting loop >>> node shall have to listen for every request so it runs in loop 
 * 
 * => more on EVENT-LOOP in upcoming lectures
 * 
 * 
 * ! 7. Routing
 * -=-=-=-=-=-=-
 * * Routing
 *      - implementing different actions for diff URLs [requested by user]
 * 
 * * URL-MODULE
 *      - for complex URLs we need a core-module [so that we could handle requests on diff URLs]
 *          - which PARSES a complex URL into a nice formatted URL [by splitting complex URLs]
 * 
 * [simple URLs]
 * - ex: "/" and "/home" etc.,
 *      - for these types of URLs: we just need req object that is [req.url]
 * 
 * [complex URLs]
 * - ex: /product?id=23&item=45
 *      - for this type of URLs: we need URL-core-module!
 * 
 * [code]
 * ------
////////////////////////////////////////////////////////////////////////////////////////////
// >>> CREATING SERVER
---
const server = http.createServer((req, res) => {
  const URL_Path = req.url;                             // - simple URL so req.url was used here! 

  if (URL_Path === "/" || URL_Path === "/overview") {
    res.end("This is an OVERVIEW!");
  } 
  else if (URL_Path === "/product") {       // - sending RESPONSES for different paths...
    res.end("This is PRODUCT");
  }
                    +----- // - if no path matched from above paths.. then send "Page not found!" with some meta info inside "header"
  else {            |
    res.writeHead(404, {
      "Content-Type": "text/html",      // - writing headers
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8080, () => {
  console.log("Server up and running on PORT: 8080");
});
 * 
 * [headers]
 *          - HTTP header: a piece of information about the response that we are sending for an incoming request!
 * - here as we are sending back responses.. we can add "STATUS-CODES" to responses!
 *      
 * res.writeHead("status-code", {"to-send-headers"})
 *      - 2nd arg: an optional object as 2nd argument >>> to send HEADERS  
 *          - in here we can specify which type of data we are sending back!
 * 
 * (most common is "Content-Type") 
 *      - if type is "text/html"... then browser expects an HTML as response!
 * 
 * [check]
 *      - inside inspecting the current server page => inside "network" tab
 * 
 * $ [NOTE]
 * - routing can become COMPLICATED in real world applications
 * so we use // => EXPRESS!
 * 
 * 
 * ! 8. Building a (Very) Simple API
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * * API
 *      - Application Programming Interface
 *          - it is a SERVICE.. where user's request data
 * 
 * - [in this lecture.. we read data from a file and then parse JSON into JavaScript.. send that result to client]
 * [data.json]
 * -----------
[
  {
    "id": 0,
    "productName": "Fresh Avocados",
    "image": "🥑",
    "from": "Spain",
    "nutrients": "Vitamin B, Vitamin K",
    "quantity": "4 🥑",
    "price": "6.50",
    "organic": true,
    "description": "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices."
  },
  {
    "id": 1,
    "productName": "Goat and Sheep Cheese",
    "image": "🧀",
    "from": "Portugal",
    "nutrients": "Vitamin A, Calcium",
    "quantity": "250g",
    "price": "5.00",
    "organic": false,
    "description": "Creamy and distinct in flavor, goat cheese is a dairy product enjoyed around the world. Goat cheese comes in a wide variety of flavors and textures, from soft and spreadable fresh cheese to salty, crumbly aged cheese. Although it’s made using the same coagulation and separation process as cheese made from cow’s milk, goat cheese differs in nutrient content."
  },
  { "id": 2, ...},
  { "id": 3, ... },
  { "id": 4, ... }
]
 * 
 * - above is JSON-data and that need to be converted into JSON-object
 * 
 * [code]
 * ------
////////////////////////////////////////////////////////////////////////////////////////////
// >>> ROUTING and SIMPLE API
---
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");           // - inserted at the TOP of the page 
const dataObj = JSON.parse(data);                                           // # parsed-data: "dataObj"

const server = http.createServer((req, res) => {
  const URL_Path = req.url;

  if (URL_Path === "/" || URL_Path === "/overview") {
    res.end("This is an OVERVIEW!");
  }
  //
  else if (URL_Path === "/product") {
    res.end("This is PRODUCT");
  }
  // - checking "/api" route
  else if (URL_Path === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }           \
  //           +-------------------------------------------------------- // #1 why did we send "data" but not "parsed-data" as a response?
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
 * 
 * - to convert JSON data into an object is called "parsing"
 * 
 * >>> JSON.parse("json-data")
 *    - if we parse data.json it will be converted into JavaScript Object / Array! [but not a string]!
 * 
 * #1 why did we send "data" but not "parsed-data: dataObj" as a response?
 *    - as we specified in headers that {"Content-Type": "application/json" }
 *      - which means we have to send JSON-data but not object / array [so as data is already a JSON string.. we send that data to "/api" route]
 * 
 * - ✅ res.end(data) → works because data is already JSON as a string.
 * - ❌ res.end(dataObj) → fails because Node cannot send objects directly.
 * - ✅ res.end(JSON.stringify(dataObj)) → works if you want to manipulate dataObj before sending.
 * 
 * $ NOTE
 * const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");      // - inserted at the TOP of the page [server.js] - also {__dirname}
 * const dataObj = JSON.parse(data);                                          // # parsed-data: "dataObj"
 * - here reading data from a JSON file is inserted at the TOP!
 *    - and also used "SYNCHRONOUS" version of code
 * 
 * {__dirname} inside `${__dirname}/dev-data/data.json`
 *    - used here instead "./" which points to "CURRENT-DIRECTORY"! 
 * 
 * cause...
 *    - data will be read only once! when we load applications
 * 
 * - if this code to read-a-file is inserted inside createServer's callback
 *    - then it will read for every incoming request! 
 * 
 * - if we had one-million requests 
 *    - then huge-data must be READ and has to be READ every-time when there will be an incoming request!
 * 
 * ! 9. HTML Templating: Building the Templates
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (here we are building a dynamic website based on the API data)
 *    (if there are any changes / updates inside API that must reflect inside these HTML pages)
 * 
 * [HTML-TEMPLATES]
 * ----------------
// >>> product-template [HTML-Page]
---
<body>
  <div class="container">
    <h1>🌽 Node Farm 🥦</h1>

    <figure class="product">
      <div class="product__organic" {X-NOT_ORGANIC-X} ><h5>Organic</h5></div>   
      <a href="#" class="product__back">
        <span class="emoji-left">👈</span>Back
      </a>
      <div class="product__hero">
        <span class="product__emoji product__emoji--1">{X-product-image-X}</span>        // - {X-Product-Image-X}
        <span class="product__emoji product__emoji--2">{X-product-image-X}</span>           // - here we will replace this template with real-product-data
        <span class="product__emoji product__emoji--3">{X-product-image-X}</span>
        <span class="product__emoji product__emoji--4">{X-product-image-X}</span>
        <span class="product__emoji product__emoji--5">{X-product-image-X}</span>
        <span class="product__emoji product__emoji--6">{X-product-image-X}</span>
        <span class="product__emoji product__emoji--7">{X-product-image-X}</span>
        <span class="product__emoji product__emoji--8">{X-product-image-X}</span>
        <span class="product__emoji product__emoji--9">{X-product-image-X}</span>
      </div>
      <h2 class="product__name">{X-product-name-X}</h2>
      <div class="product__details">
        <p><span class="emoji-left">🌍</span>From{X-location-X}</p>
        <p><span class="emoji-left">❤️</span>{X-product-nutrients-X}</p>
        <p><span class="emoji-left">📦</span>{X-product-quantity-X}</p>
        <p><span class="emoji-left">🏷</span>{X-product-price-X}€</p>
      </div>

      <a href="#" class="product__link">
        <span class="emoji-left">🛒</span>
        <span>Add to shopping card ({X-product-price-X}€)</span>
      </a>

      <p class="product__description">
        {X-product-description-X}
      </p>
    </figure>
    
  </div>
</body>
-------------------------------------------- CONNECTED --------------------------------------------
// >>> overview-template [HTML-Page]
---
<body>
  <div class="container">
    <h1>🌽 Node Farm 🥦</h1>

    <div class="cards-container">
      {X-product-cards-X}           // - replace this template with "card-template" [view from below HTML]
    </div>
  </div>
</body>
-------------------------------------------- CONNECTED --------------------------------------------
// >>> card-template [HTML-Page]
---                             \
<figure class="card">            +------------------------------------------ // - this template will be dynamic and gonna repeat for every "product"
    <div class="card__emoji">{X-product-image-X} {X-product-image-X}</div>
    <div class="card__title-box">
        <h2 class="card__title">{X-product-name-X}</h2>
    </div>
    <div class="card__details">
        <div class="card__detail-box {X-NOT_ORGANIC-X}">
            <h6 class="card__detail card__detail--organic">Organic!</h6>
        </div>
        <div class="card__detail-box">
            <h6 class="card__detail">{X-product-quantity-X} per 📦</h6>
        </div>
        <div class="card__detail-box">
            <h6 class="card__detail card__detail--price">{X-product-price-X}€</h6>
        </div>
    </div>
    <a class="card__link" href="/product?id={X-product-ID-X}">
        <span>Detail <i class="emoji-right">👉</i></span>
    </a>
</figure>
 * 
 * >>> [place-holders]
 *    - {X-place-holders-X} these place-holders will be replaced with actual data that is fetched from an API
 * 
 * >>> to analyze the styles used
 *    - follow [LINK]: https://github.com/HarshVardhanK35/Node.JS/tree/main/Node-Jonas/00-Intro-Node-%26-NPM/templates
 * 
 * 
 * ! 10. HTML Templating: Filling the Templates
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (replacing place-holders with content from API)
 * [code]
 * ------
// >>> server.js
---
function replaceTemplate(temp, product) {
  let output = temp.replace(/{X-product-name-X}/g, product.productName);      |
  output = output.replace(/{X-product-image-X}/g, product.image);             | // - replacing 'place-holders' using 'data' that read from "data.json"  
  output = output.replace(/{X-product-price-X}/g, product.price);             |
  output = output.replace(/{X-location-X}/g, product.from);
  output = output.replace(/{X-product-nutrients-X}/g, product.nutrients);
  output = output.replace(/{X-product-quantity-X}/g, product.quantity);
  output = output.replace(/{X-product-description-X}/g, product.description);
  output = output.replace(/{X-product-ID-X}/g, product.id);

  if (!product.organic)
    output = output.replace(/{X-NOT_ORGANIC-X}/g, "not-organic");   // - CSS-class
  return output;
}

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

const server = http.createServer((req, res) => {
  const URL_Path = req.url;

  // - OVERVIEW PAGE
  if (URL_Path === "/" || URL_Path === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
                                             +---------------------- // - this returns an array of html elements 
    const cardsHtml = dataObj               /
      .map((el) => replaceTemplate(tempCard, el))   
      .join("");                                    // - "join" used to return a complete array to form an HTML
    const output = tempOverview.replace("{X-product-cards-X}", cardsHtml);    // - simply replacing "{X-product-cards-X}" with HTML
    
    res.end(output);
  }
  // - PRODUCT PAGE
  else if (URL_Path === "/product") {
    res.end("This is PRODUCT");
  }
  // - API
  else if (URL_Path === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }
  // - Not Found Page!
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
 * 
 * [LINK]
 * ------
 * <a class="card__link" href="/product?id={X-product-ID-X}">
 *    <span>Detail <i class="emoji-right">👉</i></span>
 * </a>
 *    - whenever a respective card was clicked!
 *      - it takes users to "localhost:8080/product?id=0" 
 * 
 * - these types of links must be parsed! [but it cannot be parsed using req.url] 
 *    - so we use core-module: // => url
 * 
 * 
 * ! 11. Parsing Variables from URLs
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * >>> Query String
 * [http://localhost:8080/product?id=0]
 *    - query starts from "?id=0"
 * 
 * - now, according to the product-id that we got from "query".. we need to send a response 
 * [PRODUCT-PAGE]
 * --------------
// - PRODUCT PAGE
---
else if (pathname === "/product") {
  res.writeHead(200, { "Content-Type": "text/html" });
  const product = dataObj[query.id];
  const output = replaceTemplate(tempProduct, product);   // - function which takes a "template" and data => which replace 'placeholders' inside template with data / product fields

  res.end(output);
} 
 * 
 * - dataObj is entire parsed data.json [transformed json into an object/ an array]!
 *    - accessing a product from that "Object" with "id" from query [used URL core-module] 
 * 
 * 
 * 
 * ! 12. Using Modules 2: Our Own Modules
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (creating own module.. export something from those modules.. import those functions into another module)
 * 
 * - whenever we want to use following fn inside multiple files
 *    - create a module export this fn from there and import into files where this fn is required!
 * [fn]
 * ----
function replaceTemplate(temp, product) {
  let output = temp.replace(/{X-product-name-X}/g, product.productName);
  output = output.replace(/{X-product-image-X}/g, product.image);
  output = output.replace(/{X-product-price-X}/g, product.price);
  output = output.replace(/{X-location-X}/g, product.from);
  output = output.replace(/{X-product-nutrients-X}/g, product.nutrients);
  output = output.replace(/{X-product-quantity-X}/g, product.quantity);
  output = output.replace(/{X-product-description-X}/g, product.description);
  output = output.replace(/{X-product-ID-X}/g, product.id);

  if (!product.organic)
    output = output.replace(/{X-NOT_ORGANIC-X}/g, "not-organic");
  return output;
}
 * 
 * $ IMP
 * - in node.js every file is treated as a module!
 * 
 * [steps]
 *    - create a folder: "modules" and also a file in that folder called: "replaceTemplate.js"
 *      - and place the above fn in that! [export it from there]
 * 
 * [modules/replaceTemplate.js]
 * ----------------------------
module.exports = (temp, product) => {
  let output = temp.replace(/{X-product-name-X}/g, product.productName);
  output = output.replace(/{X-product-image-X}/g, product.image);
  output = output.replace(/{X-product-price-X}/g, product.price);
  output = output.replace(/{X-location-X}/g, product.from);
  output = output.replace(/{X-product-nutrients-X}/g, product.nutrients);
  output = output.replace(/{X-product-quantity-X}/g, product.quantity);
  output = output.replace(/{X-product-description-X}/g, product.description);
  output = output.replace(/{X-product-ID-X}/g, product.id);

  if (!product.organic)
    output = output.replace(/{X-NOT_ORGANIC-X}/g, "not-organic");
  return output;
}
----------------------------- CONNECTED -----------------------------
// >>> server.js
---
const fs = require("fs");
const http = require("http");
const url = require("url");

// - user-def-module
const replaceTemplate = require("./modules/replaceTemplate");
 * 
 * 
 * 
 * ! 13. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * * NPM
 *    - Node Package Manager!
 *      - command line interface application which automatically comes included with node.js
 * - [which is used to install and manage 3rd party "Open-Source-Packages"] 
 * 
 * - which is a repository and it consists of multiple packages [which can be downloaded into our work-files]
 * 
 * >>> including NPM in our projects
 * - whenever we start a project.. we usually start by running "npm init" inside project folder's terminal
 * 
 * [npm init]
 *    - running this inside terminal.. creates a "package.json" file 
 * 
 * [package.json]
 *    - which is configuration file [where all info about project is stored inside it]!
 * 
 * >>> questions that npm init ask:
 *    - package name
 *    - version (default)
 *    - description
 *    - entry point
 *    - test command
 *    - keywords
 *    - author: user-name
 *    - license
 * 
 * - after this "npm init" will create package.json
 *    - which consists of every 3rd party package we chose to install for our project!
 * 
 * $ NOTE:
 * - [when we initialize npm using "npm init -y"] >>> it does not ask any of these above questions
 *    - [it takes default info of project]
 * 
 * [package.json]
 * --------------
{
  "name": "introduction",
  "version": "1.0.0",
  "description": "Learning Node",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC"
}
 * 
 * 
 * 
 * ! 14. Types of Packages and Installs
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * there are two types of packages and two types of installs !
 * 
 * /////////////////////////////////////////////////////////////////////
 * ? types of packages:
 *    - simple dependencies and development dependencies
 * 
 * [installation]
 *    - we use // => npm i / install <PACKAGE-NAME>
 * 
 * $ NOTE
 * - whenever we install a new 3rd party package into our project.. 
 *    - package.json will add a new field called "dependencies"
 * 
 * * [simple / regular]
 *    - packages that contain code which we will include in our own project-code
 * ex: 
 * >>> npm i slugify
 *    - tool, which is used to make more readable URLs out of names 
 * 
 * [update: package.json]
 * --------
{
  "name": "introduction",
  "version": "1.0.0",
  "description": "Learning Node",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "slugify": "^1.6.6"   // - regular dependencies here!
  }
}
 * 
 * * [dev dependencies]
 *    - these are not needed for production >>> so code does not depend on them 
 * - these are used while development only!
 * 
 * >>> [npm i nodemon --save-dev]
 *    - we have to specify which type of dependency we are about to install
 * - for development / dev dependencies.. specify: --save-dev [but it is not needed for regular-dependencies]
 * 
 * * NODEMON
 *    - this automatically restarts server on every change that occurred inside working directory / file!
 * [so no need of ctrl + c every time to close the server and restart it]!
 * 
 * [package.json]
 * --------------
{
  "name": "introduction",
  "version": "1.0.0",
  "description": "Learning Node",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "slugify": "^1.6.6"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"    // - included here!
  }
}
 * 
 * /////////////////////////////////////////////////////////////////////
 * ? types of installs:
 *    - local and global installations
 * 
 * * [LOCAL]
 * (no need to specify any flags here)!
 *    - (till now we installed packages locally.. they only work in current project)
 * 
 * $ NOTE:
 * - after every local-installation 'NPM' creates "node_modules" folder inside working-project
 *    - code inside working-file depends upon these "node_modules"
 * [which contains different fn that installed dependencies: nodemon & slugify depend upon]
 * 
 * * [GLOBAL]
 *    - these dependencies are installed globally.. so that we don't have to install it inside every project
 * 
 * >>> [npm i <PACKAGE-NAME> --global]
 * [--global]
 *    - a flag which instructs npm to install a package globally!
 * 
 * ex: nodemon
 * - as we require nodemon to listen for changes inside every file for every project!
 *    - we need that package to be installed "globally"
 * 
 * >>> [npm i nodemon --global] 
 * - installs nodemon package globally 
 *    - inside terminal => on current project directory => run "nodemon server.js"
 * 
 * (by this nodemon watches for every change that made inside files)
 * 
 * [scripts:start - field]
 *  -------------
{
  "name": "introduction",
  "version": "1.0.0",
  "description": "Learning Node",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },                      \
  "author": "",            + -------------- + // - update this from "node server.js" to "nodemon server.js"
  "license": "ISC",
  "dependencies": {
    "slugify": "^1.6.6"
  }
}
 * 
 * (before updating "scripts: start" we have to manually start server using: "node server.js")
 * [update scripts: start]
 * - after updating it to: "nodemon server.js"
 *    - we can simply run "npm start"
 * 
 * 
 * ! 15. Using Modules 3: 3rd Party Modules
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (how to require / import 3rd party modules inside a working-file)
 * - we use same syntax that we used till now to import core-modules
 * [ex]
 * ----
// >>> 3rd-party modules
---
const slugify = require("slugify");
 * 
 * - requiring-slugify returns a fn >>> which creates SLUGS
 * 
 * ? what is a SLUG ?
 *    - slug is the last part of URL which contains a unique string that identifies resource that website is displaying!
 * 
 * - when we opened product page of "fresh-avocados" then URL will be "localhost:8080/product/fresh-avocados"
 *    - then slug will be last part of the URL: "fresh-avocados"
 * 
 * [using SLUGIFY]
 * ---------------
 * slugify("Fresh Avocados", { lower: true })
 * 
 * [create slugs from 'Product Names']
 * -----------------------------------
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

res: [
  'fresh-avocados',
  'goat-and-sheep-cheese',
  'apollo-broccoli',
  'baby-carrots',
  'sweet-corncobs'
]
 * 
 * 
 * 
 * ! 16. Package Versioning and Updating
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * >>> [versions]
 * - every package has a version: "^1.18.11"
 *    =>  major-version . minor-version . patch-version
 * 
 * [1.18.11]
 * patch-version (11):
 *    - it is about "BUGS" => every time dev-team FIX-a-BUG >>> then.. release a patch-version
 * 
 * minor-version (18):
 *    - which includes new features to a package => and also supports last / previous versions 
 * 
 * major-version (1):
 *    - for every major-version (a huge new release) >>> this can have breaking changes (may break the older-version-code)
 * 
 * >>> [update packages]
 * - check outdated packages using.. // => npm outdated
 * to check outdated packages
 * 
 * ? symbol (^ and ~)
 * - [^] before version number wants latest releases!
 * - [~] before ver. number wants a patch releases!
 * 
 * $ NOTE:
 * - to update packages we use.. // => npm update <PACKAGE-NAME>
 * 
 * >>> [uninstall packages]
 * - to delete / uninstall packages // => npm uninstall <PACKAGE-NAME>
 * 
 * >>> [node_modules]
 * - when we share code with others.. we do not include "node_modules" inside project folder [so we delete node_modules before sharing it!]
 *    - we can again install to modules.. using // => npm install
 * 
 * - so "npm install" command will read every package inside "package.json" and install them! 
 * 
 * ! 17. Setting up Prettier in VS Code
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (setup extensions inside VS Code)
 * - auto-rename tag
 * - dotenv
 * - eslint
 * - intellisense for CSS class name..
 * - paste and indent
 * - path intellisense
 * - prettier
 * - pug beautify
 * - tabNine
 * - TODO highlight
 * 
 * >>> [prettier-configuration]
 * - include a file ".prettierrc" to configure code-formatting 
 * 
 * next section:
 *    => Intro to Back-End Web Development!
 * 
 */
