// ! Intro to Node and NPM !
// -------------------------
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
 *          - which provides
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

 * 
 * 
 * 
 * $ [NOTE]
 * - routing can become COMPLICATED in real world applications
 * so we use // => EXPRESS!
 * 
 * 
 * 
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 2. Introduction to NPM and the package.json File
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
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */