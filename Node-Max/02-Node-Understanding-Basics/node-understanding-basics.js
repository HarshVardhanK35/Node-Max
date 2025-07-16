// ! Node.JS- Understanding The Basics !
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-
/**
 * ! 1. Module Introduction
 * -=-=-=-=-=-=-=-=-=-=-=-=-
 *      - how does the WEB work?
 *      - creating Node.JS server
 *      - using Node's core modules
 *      - working with requests & responses (basics)
 *      - asynchronous code & event-loop
 * 
 * 
 * ! 2. How The Web Works
 * -=-=-=-=-=-=-=-=-=-=-=-
 * +--------<------- USER / CLIENT ------------<------------+
 * |                      |  ----- user enters a URL        |
 * |                      |                                 |
 * |            URL: http://a-page.com                      |   response is sent to USER
 * |                  |                                     |   /
 * +----- REQUEST ----+                                 RESPONSE [data: (HTML/JS/JSON) + meta-info: (headers)]
 *      /   |                                               |
 *     |    |                                               |
 *     |    +---->---- SERVER [IP: 10.212.21.12] ----->-----+
 *     |                 |      
 *     |                Node.JS [server runs with code] ---------- Database [communicates] + input validations etc.,
 *     |
 * request is sent to SERVER
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * >>> WORKING OF WEB
 * [request]
 *      - we as users => after entering a URL => sends a request to some server [with some IP address: 10.212.21.12]
 *      [node-code]
 *          - node.js code which runs that SERVER [IP: 10.212.21.12] => handles incoming request from USER [with database connection and input validations etc.,] 
 * [response]
 *      - node.js handles request with DB connection and some input validations etc.,
 *      - sends a response as DATA to client [can be HTML / CSS / JS / JSON file]
 * - (response contains content and some meta info: "response" and "request" headers)
 * 
 * [PROTOCOLS] --- [HTTP or HTTPS]
 *      - this req and res transmission is done through some PROTOCOL!
 * 
 * [HTTP / HTTPS]
 * ? Hyper Text Transfer Protocol 
 *      >>> a protocol transferring data which is understood by BROWSER & SERVER!
 * - here we define how a valid req looks like and how data should be transferred from BROWSER and SERVER!
 * 
 * ? Hyper Text Transfer Protocol Secure
 *      >>> HTTP + Data Encryption (during transmission) with SSL encryption
 * - same as HTTP with SSL encryption turned on!
 * - so, data that is transmitted is encrypted 
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * $ NOTE:
 * - when user enters a URL: a-page.com => BTS: [DOMAIN - LOOKUP] browser reaches out to some domain
 *      - DOMAIN-LOOKUP: cause this domain isn't really the address of server!
 * 
 * [DOMAIN]
 *      - which is basically an encoded human readable version of that address
 *      - server has an IP Address!
 * (entering URL.. lead to some server)
 * 
 * [headers]
 *      - type of data that is being sent to client after handling request
 * 
 * [SSL encryption]
 *      - through practice.. we will work on enabling HTTP [while production we will turn on SSL for HTTPS]
 * 
 * 
 * ! 3. Creating a Node Server
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - create a file "server.js"
 * 
 * * CORE MODULES
 *      - http  : [launch servers and sends requests]
 *      - https : [launch an SSL server] 
 * (HTTP ans HTTPS: helps in creating server to also work with http req and res)
 *      - fs    : [file-system] 
 * (to write a file and read form a file)
 *      - path  : constructs path 
 * (paths to files on file system that work on any Operating System)
 *      - os    : working with Operating System
 * 
 * ? [REQUIRE: IMPORT-MODULES]
 * - these modules are not available globally by default
 *      - so we need to import those modules!
 * - require takes in path to other JS files (OR) we can import core modules
 * 
 * >>> [require(): importing paths]
 *      - this takes in "ABSOLUTE" paths: require("/") and "RELATIVE" paths: require("./")
 * >>> [require(): importing core modules]
 *      - this takes in name of that module: require("<core-module-name>")
 * (require always looks for global modules)
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * 
 * * EVENT-DRIVEN-ARCHITECTURE
 *      - this architecture is: if X happens.. then do Y
 * (case of node's createServer: if req "X" comes.. execute a function "Y")
 * 
 * ? http.createServer()
 *      - this takes in a "request-listener" function which will be executed for every incoming "request" to the server 
 * - this creates and returns a SERVER
 * 
 * ? server.listen
 *      - this returned server is an object which has "listen" method 
 *          - node now keep on listening for incoming requests.. with "server.listen()"
 * 
 * [listen-arguments]
 * - listen takes in arguments (optional-args)
 *      - port? argument (type NUMBER): which we want to listen to that PORT
 *          - node will listen to the request.. in a LOOP
 * 
 * [requesting server]
 *      - open chrome => browse: localhost:8080 
 *      (nothing happens cause we haven't configured to return an HTML page)
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * 
 * [code]
 * ------
const http = require("http")        // - importing "module" to create a server

const server = http.createServer((req, res) => {        // - when there is an incoming request - callback fn inside "createServer" has to be executed!
    console.log(req)
})
server.listen(8080)     // - listens to this PORT - in a loop
 * 
 * - this is a complete SERVER.. but will not return a "RESPONSE"
 * 
 * 
 * 
 * ! 4. The Node Lifecycle & Event Loop
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * - when we executed "node <file-name>.js" inside terminal 
 *  
 *          node server.js ----->----- starts script    
 *                                           |
 *                              node has parsed code, register 
 *                                 variables and functions
 *                                           |
 *                                           |      - node after executing code - has not exit - it keeps on running!
 *                                           |
 *                                      EVENT LOOP      - keeps on running as long as there are event listeners registered and we have not un-registered those event-listeners
 *                                           |               EVENT: (req, res) => {}    >>>     ongoing event that we haven't unregistered from!
 *                                           |      
 *                                           |      - our code is managed by this EVENT LOOP and this is called // => EVENT-DRIVEN APPROACH !
 *                                     process.exit()
 *                                                  \----- exits from on-going loop [SHUTS DOWN SERVER]
 * 
 * ? why event-driven- approach ?
 * - as JS the core language is a single threaded language
 *      - which executes one-thread per cycle on our computer
 * 
 * - but we need NODE to handle multiple (thousands / millions) of incoming requests
 *      - we shall not handle requests one-by-one >>> so we use this EVENT-LOOP 
 * 
 * - cause of this LOOP: node creates SERVER and never stops
 *      - to stop this server we use: "process.exit()"
 * 
 * [process.exit]
 *      - which exits from on-going process when it listens for a incoming request!
 *          - but we shall not stop this server
 * 
 * ! 5. Understanding Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (req, res) => {} 
 * - understanding request inside this callback fn used inside "createServer" method 
 *      - on logging this request.. returns the following.. 
rawHeaders: [
    'Host', 
    'localhost:8080',       // - port 
    'Connection',
    'keep-alive',
    'sec-ch-ua',
    '"Not)A;Brand";v="8", "Chromium";v="138", "Brave";v="138"',     // - browser used
    'sec-ch-ua-mobile',
    '?0',
    'sec-ch-ua-platform',
    '"Windows"',
    'Upgrade-Insecure-Requests',
    '1',
    'User-Agent',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'Accept',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng, ;q=0.8',
    'Sec-GPC',
    '1',
    'Accept-Language',
    'en-US,en;q=0.6',
    'Sec-Fetch-Site',
    'none',
    'Sec-Fetch-Mode',
    'navigate',
    'Sec-Fetch-User',
    '?1',
    'Sec-Fetch-Dest',
    'document',
    'Accept-Encoding',
    'gzip, deflate, br, zstd'
],
 * 
 * - and so on we get from console.logging that req object!
 * (but only few we are interested in)!
 * 
 * [req.url, req.method, req.headers]
 * [code]
 * ------
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
});
server.listen(8080);

res:
  /             // - URL [localhost:8080 === localhost:8080/]
  GET  // - METHOD 
  {
  host: 'localhost:8080',       // - HEADERS
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Brave";v="138"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng, *
  /*;q=0.8',
  'sec-gpc': '1',
  'accept-language': 'en-US,en;q=0.6',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-encoding': 'gzip, deflate, br, zstd'
}
 * 
 * ? different types of methods
 * - [GET, POST, PUT / PATCH, DELETE]
 * 
 * 
 * 
 * ! 6. Sending Responses
 * -=-=-=-=-=-=-=-=-=-=-=-
 * [code]
 * ------
const http = require("http");

const server = http.createServer((req, res) => {

  res.setHeader("Content-Type", "text/html");       // - headers
  
  res.write("<html>");      // - writing HTML
  res.write("<head><title>My first node page</title></head>");
  res.write("<body><h1>Hello world!</h1></body>");              // - CHUNKS / MULTIPLE lines of data
  res.write("</html>");
  
  res.end();        // - end the response!
});
server.listen(8080);
 * 
 * ? setHeader: [set a new header]
 * - takes a key and a value >>> KEY: "Content-Type" and VALUE: "text/html"
 *      - this will attach a header to our response and we can pass meta-info (says that type of the content will be in HTML)
 * (we don't set these headers manually >>> later a package will does for us)!
 * 
 * ? write: [writing HTML]
 * - we do this to send a response and this method "WRITE" allows us to write data to response
 *      - but has to be written in "CHUNKS" / "multiple-lines of response"
 *  
 * ? end: [ending the response]
 * - after setting headers and writing data to response
 *      - we end the response process [and from then on we must not write data anymore]!
 * 
 * $ SUMMARY
 * - this whole process sends a response to CLIENT / USER
 * - these headers which are set can be viewed by inspecting the page inside browser [inside network tab >>> in header and response]
 * 
 * 
 * ! 7. Routing Requests
 * -=-=-=-=-=-=-=-=-=-=-=
 * [connecting request and response >>> so that a web-server render info based on diff routes that we visit]!
 * 
 * ? [/] 
 * - [on this route user can enter data - that we store that data inside a file]
 *      - we check for that and send a different response
 * [code]
 * ------
const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write(`<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>`);  // #1
    res.write("</html>");
    return res.end();               // #2
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first node page</title></head>");
  res.write("<body><h1>Hello world!</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(8080);
 * 
 * #1
 * - on form element.. 
 * <form action="/message" method="POST">
 *      - action: this will be an URL [whatever the request generated here will be sent to that URL]
 *      - method: defines an HTTP-method GET / POST / PATCH / PUT / DELETE: [in this case, it is POST.. sends a post request to /message with the form-data]
 * #2
 * return res.end()
 *      - exiting from the if block.. if return has not used we will continue with the next part of the code
 * 
 * [restart the server]
 * - for every change in the code.. we must restart the server with [CTRL + C]
 * 
 * [send request]
 * - send request to URL: localhost:8080/ which renders an input element [that we specified in res.write]
 * - after filling form and submitting => takes us to "/message"
 * 
 * 
 * ! 8. Redirecting Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-
 * - [in this lecture.. we will store the message in a new file inside local-file-directory.. that we entered inside the form on route "/"]
 * (to work with files we need another core module "fs")
 * 
 * [code]
 * ------
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // - parsing URL and method:
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write(
      `<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {    // - checking of URL
    fs.writeFileSync("message.txt", "DUMMY");       // - creating a file        #1
    res.statusCode = 302;                           // - set a status-code      #2.0
    res.setHeader("Location", "/");             // - redirecting USER to "/"    #2.1
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first node page</title></head>");
  res.write("<body><h1>Hello world!</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(8080);
 * 
 * #1
 * - used "fs" as core module here to write files [creating files in present working directory]
 * - fs.writeFileSync(): write files synchronously.. takes in path of the file [path === name of the file] and text to insert in that file
 * 
 * #2.0
 * - status-code 302 === for redirection
 * 
 * #2.1
 * - as usual set-headers ["Location" was used here.. to set user to "/" location inside browser] 
 * 
 * 
 * ! 9. Parsing Request Bodies
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - the incoming data from a form inside "/" route to "/message" route will be in the form streams of data
 * 
 * [streams is an on-going process]
 * * STREAMS AND BUFFERS
 *      - request is simply read by node in CHUNKS / node divides and read stream-of-data into parts 
 *          - in the end it fully parses the complete data 
 * 
 * [node parse complete data in parts]
 * [as node does not know... how much data has been received] >>> [parsing complete file could take much time]
 * 
 * STREAMS ----- req-body-part-#1 ----- req-body-part-#2 ----- req-body-part-#3 ----- req-body-part-#N ----- FULLY PARSES DATA
 *      |                                                       |                                   |
 *      +---- IDEA ----                                         +-----------------+-----------------+
 *      start work with                                                           | 
 *        data early!                                                           BUFFER  -----   OUR CODE
 * 
 * - [here, we can't start work with data early] >>> [and with code we can't work with chunks of this data]
 *      [as we cannot wait to work on data to parse completely.. we work with multiple parts of data..] >>> [so we use "BUFFER"]
 * 
 * * BUFFER
 *      - this allows users to HOLD MULTIPLE CHUNKS of data and work with that data!
 * - so we work with that "BUFFER" of data
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * [code]
 * ------
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;                        // parsing URL and method here

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write(
      `<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {             // - [registering_data_event]
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {                                           // - [end_listener]
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];     \-----------// - [buffer]
      console.log(parsedBody);
      fs.writeFileSync("message.txt", message);         // - moved into here
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first node page</title></head>");
  res.write("<body><h1>Hello world!</h1></body>");
  res.write("</html>");
  res.end();
});
server.listen(8080);

res:
    <Buffer 6d 65 73 73 61 67 65 3d 48 65 6c 6c 6f>     ---- BUFFER DATA [small chunks of data]!
    message=Hello                                                                   ---- BUFFER of data >>> That was converted!
        |
        +---- form input's "name" attribute
 * 
 * ? [registering data event]
 * - on "req" object we can listen to "data" event that is the incoming request
 *      - when this event happens.. we register a callback that will be executed in future
 * 
 * - this "data" event will fire callback fn in 2nd arg.. whenever a new chunk is ready to be read!
 *      - we push those chunks of data into an array    [which will then create chunks of data]
 * (we are defining a func that will be executed for every incoming data piece)
 * 
 * ? [end listener]
 * - this fires a callback in 2nd arg.. once it completes parsing complete data
 *      - we read every chunk of data and stored inside an array
 * 
 * ? [buffer]
 * - global constructor where we can concat multiple chunks into single data object 
 *      - as the incoming request is of "type-text" so we used "toString" on it! [to convert it]
 * 
 * ? [fs.writeFileSync]
 * - as code inside event is a callback func.. it will be executed later in time
 *      - so we moved into callback func.. if not moved ? "writeFileSync" will be executed before the "on-event-listener-callback-execution"
 * 
 * $ RES
 * at last this will create a file inside working-directory and insert that incoming-form-data: "Hello" [form in "/" route] 
 * 
 * $ NOTE
 * - this is raw code 
 *              but we use // => "EXPRESS"
 * 
 * 
 * ! 10. Understanding Event Driven Code Execution
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - inside events.. the 2nd arg that are callback function inside event-listeners.. 
 * 
 * - those callbacks will be registered and executed in future but not right now.. 
 *      - this is called "ASYNCHRONOUS"
 * 
 * - as events may happen in future and the callbacks in them will only be registered now and called later in time
 * (so, JS does not block the other lines of code)
 * 
 * 
 * ! 11. Blocking and Non-Blocking Code
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * [fs module]
 *      - inside FS there are two types of methods to write a file
 * 
 * >>> writeFile and writeFileSync
 * [writeFileSync]
 *      - sync stands for synchronous working of code 
 * - as this is synchronous operation this will stop / BLOCKS the execution of code until file is created!
 * (impact will be understood only with huge chunks of data)
 * 
 * [writeFile]
 *      - this works asynchronously [this does NOT BLOCK the execution of code later it]!
 * - as it is asynchronous.. it accepts a callback and executes code inside that callback after sometime in future 
 *      - so, callback inside "writeFile" will be executed after file has been created!
 * 
 * [code]
 * ------
const server = http.createServer((req, res) => {
  // - parsing URL and method:
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write(
      `<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(parsedBody);
      fs.writeFile("message.txt", message, () => {          // - this callback here will be executed after file has been created successfully with "writeFile"!
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});
server.listen(8080);
 * 
 * $ SUMMARY:
 * - this does not block the code as it was earlier with "writeFileSync"!
 * 
 * 
 * ! 12. Node.js - Looking Behind the Scenes
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * [SINGLE THREADED, EVENT LOOP & NON-BLOCKING CODE]
 * 
 * *THREAD
 *    - a process inside an operating system
 * 
 * * EVENT-LOOP
 *    - started by node.js which keeps on running [this handles all the callbacks]
 * 
 * [How event loop prioritize tasks]
 * - 1st: checks for due-timers (executes setTimeout, setInterval callbacks)
 * - 2nd: checks for other pending callbacks (executes I/O-related callbacks)
 * 
 * => visit JONAS lecture on this callbacks, event loop [JONAS- JS course: udemy]
 * 
 * 
 * ! 13. Understanding Event Driven Code Execution
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 14. Understanding Event Driven Code Execution
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 15. Understanding Event Driven Code Execution
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 16. Understanding Event Driven Code Execution
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */