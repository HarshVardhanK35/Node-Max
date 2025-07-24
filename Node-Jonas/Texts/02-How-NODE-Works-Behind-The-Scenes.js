// ! How NODE Works Behind The Scenes
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * ! 1. Node, V8, Libuv and C++
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * * NODE.JS ARCHITECTURE
 *      - BEHIND THE SCENES
 * 
 * >>> [NODE]
 * - node has to depend upon libraries to work properly
 *      - hence node run-time has several dependencies
 * [IMPORTANTLY..]
 *      - V8 js engines and Libuv
 * 
 * >>> [V8]
 * (uses both C++ and JS)
 * - converts js code into machine-code so that a computer can actually understand!
 * 
 * >>> [Libuv]
 * (written in C++)
 * - open-source-library => focuses on "ASYNCHRONOUS I/O"  [this gives node an access to computer's OS, FS, networking etc.,]
 * 
 * - this also implements two important features of Node
 *      - EVENT-LOOP and THREAD-POOL
 * 
 * [EVENT-LOOP]
 *      - handles easy tasks like executing call-backs and network I/O
 * 
 * [THREAD-POOL]
 *      - handles heavy work file access / file compression 
 * 
 * $ NOTE
 * - node also rely on HTTP-parser (to parse HTTP), c-ares (DNS-request), openSSL (cryptography), zLib for (compression)  
 * 
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (Important and fundamental parts are: THREAD-POOL and EVENT-LOOP)
 * 
 * * Node Process and Threads
 * - when we use NODE on a computer... there is a NODE process running in parallel 
 * 
 * [PROCESS] 
 *      - just a program in execution on a computer
 * 
 * - in that process node.js runs inside a "SINGLE THREAD"
 * [THREAD]
 *      - sequence of instructions
 *          - a box where our code is executed inside computer's processor
 * $ IMPORTANT
 *      - node just runs in one / single thread! [which then blocks node applications]
 * (if we run node applications. it will run in single-thread [no matter if 10 / 10_000_000 users accessing same application at same time])
 * - [we need to take care of not blocking that code]
 * 
 * >>> HOW NODE.JS RUNS IN SINGLE THREAD!
 * +----------------------------------------------------------------------------------------+
 * |                                    NODE.JS PROCESS                                     |
 * |                    (Instance of a program in execution on a computer)                  |  
 * |+-----------------------------------------------+                                       |
 * ||   SINGLE THREAD  (Sequence of Instructions)   |          --- THREAD POOL ----         |
 * ||                                               |                                       |
 * ||       1. when program is initialized..        |           THREAD        THREAD        |
 * ||                       |                       |             #1            #2          |
 * ||           2. executes top-level-code          |           THREAD        THREAD        |
 * ||           (which is not inside any CB)        |             #3            #4          |
 * ||                       |                       |                                       |
 * ||    3. all the modules that a code require     |          --- THREAD POOL ----         |
 * ||                       |                       |                   |                   |
 * ||       4. registers all callback fns       +-----------------------+                   |
 * ||                       |                  /    |                                       |
 * ||         5. finally EVENT-LOOP starts    /     |          ! OFFLOADING tasks !         |
 * ||             (heart of entire node) --- +      |                                       |
 * ||                                               |                                       |
 * ++-----------------------------------------------+---------------------------------------+
 * 
 * - as event loop is the heart of Node.. there every task might get executed!
 *      - but some tasks are too heavy and they can not be executed inside Node's Event Loop! [they may block single thread]
 * (then we get thread pool)
 * 
 * >>> [THREAD-POOL]
 * - provided by LIBUV lib to node
 * 
 * - it comes with 4 additional threads and separated from main single thread, so whenever a task gets heavy inside main thread
 *      - it OFFLOADs to THREAD-POOL [all this happens behind the scenes]
 * 
 * [operations...]
 * - operations that OFFLOADED to THREAD-POOL are.. 
 *      - heavy-tasks:
 *          - file system 
 *          - cryptography --- (for hashing passwords)
 *          - compression
 *          - DNS look-ups --- (matches web-domains to their real IP addresses)
 * 
 * 
 * ! 3. The Node.js Event Loop
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - every callback functions will run inside this event-loop [that is non-top-level-code]
 *      - node is built with callback functions
 * 
 * - node follows EVENT-DRIVEN architecture
 *      #1 events are emitted
 *      #2 event loops pick them up
 *      #3 callbacks are called
 * #1
 * - inside our code if there are: [new HTTP requests, Finished-File reading] that is these are asynchronous tasks
 *      - emits events >>> as soon as they are done with their works 
 * 
 * #2
 * - and event-loop picks these emitted events  
 * 
 * #3   
 * - as after events are received and event-loop calls the callback fn that are associated with those each emitted events
 * 
 * ? in which order these callback funcs are get executed ?
 * ---
 * - every time a node application starts >>> event loops are started 
 * 
 * (node applications have multiple phases and for each phase...)
 *      - CALLBACK QUEUES: each phase has one callback-queue >>> where callbacks from events that event-loop receives
 * 
 * [PHASES]
 * #1 
 * - where this phase takes care of callbacks from expired timers
 *      - that is callback from expired TIMERS!
 * ex: from setTimeout() function
 * 
 * #2
 * - I/O polling and execution of I/O callbacks [input/output]  
 *      - POLLING: looking for new I/O events that are ready to be processed and puts them into callback queue
 * ex: networking and file accesses
 * [so usually 99% of code inside application will be executed >>> as complete node-code will consists of NETWORKING and FILE accessing]
 * 
 * #3
 * - setImmediate callbacks [special type of callbacks] 
 *      - when we want to process callbacks immediately after I/O pulling and execution phase
 * 
 * #4 
 * - close callbacks [not imp]
 *      - all close events are processed 
 * ex: web-server and web-socket shut down processes 
 * 
 * #5 [OPTIONAL]
 * - process.nextTick() queue
 * 
 * #6 [OPTIONAL]
 * - MicroTask queue
 *      - resolving promises 
 * 
 * - with this a cycle has been finished [decision to continue to next cycle OR program to exit]
 * 
 * - node checks for any pending timers and I/O tasks that are still running in the background?
 *      >>> if NO, 
 *          - program will be exited!
 *      >>> if YES 
 *          - node continues the next cycle of execution
 * 
 * $ SUMMARY:
 * - event loop makes ASYNCHRONOUS programming possible inside node applications
 * 
 * [GUIDELINES]
 *      [as it is on single thread.. make sure it does not block the execution]
 *          - as N number of users access an application built with node 
 * >>> guide to not to block the event loop
 * - do not use "SYNC" versions of functions in fs, crypto, and zlib modules in our callback functions
 * - do not perform complex calculations (ex: nested loops)
 * - do not use complex regular expressions (ex: nested quantifiers)
 * - careful with JSON in large objects
 * 
 * 
 * ! 4. The Event Loop in Practice
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * [CODE]
 * ------
const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;                     // - we can change this number to inc/dec the number of THREAD-POOLs [def: 4]

setTimeout(() => console.log("Timer 1 finished"), 0);                       // #2   |
setImmediate(() => console.log("Immediate 1 finished"));                    // #3   | --- these 2 & 3 are not running inside any event-loop [that is why they have been moved inside a callback]

fs.readFile("test-file.txt", () => {                                                            // setTimeout and setImmediate were moved in here!
  console.log("I/O finished");                                              // #4
  console.log("----------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);                     // #7
  setTimeout(() => console.log("Timer 3 finished"), 3000);                  // #8
  setImmediate(() => console.log("Immediate 2 finished"));                  // #6

  process.nextTick(() => console.log("Process.nextTick"));                  // #5

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");                  // #9
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");                  // #10
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");                  // #11
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");                  // #12
  });
});

console.log("Hello from the top-level code");                               //#1 [top-level-code]
 * 
 * - process of execution.. 
 * [RES]
 * -----
Hello from the top-level code       [top-level-code]
Timer 1 finished                                    |
Immediate 1 finished                                | - these are not inside any event-loop 
I/O finished
----------------
Process.nextTick            |
Immediate 2 finished        | - these will be executed right after POLLING-PHASE and before TIMERS and EVENT-LOOP waits before TIMERS execution and executes [setImmediate-cb]
Timer 2 finished
Timer 3 finished
3393 Password encrypted
3569 Password encrypted
3571 Password encrypted
3607 Password encrypted
 * 
 * 
 * 
 * ! 5. Events and Event-Driven Architecture
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (most of node's core modules like: HTTP, file-system, timers are built around event-driven architecture)
 * 
 * - in NODE there are objects called [EVENT-EMITTERS]
 * [EVENT-EMITTERS]
 *      - 1. which emit named events as soon as something happens inside an application
 * ex: after req hitting serves, file reading finished, timer-expiring etc.,
 *      - 2. these events then picked up by event-listeners that we set-up 
 *      - 3. these event-listeners fire-off callback functions that are attached to each listener
 * 
 * - event-listeners react to events-emitted from "EVENT-EMITTERS" by calling "CALLBACK-fn"
 * [ex]
 * ----
const server = http.createServer
server.on("request", (req, res) => {
    clg("Request Received")
    res.end("Request Received")
})
 * 
 * - here server.on() is used to create a LISTENER [for "REQUEST" event]
 * - server acts as event-emitter.. which will emits an event [called "REQUEST" each time that a request hits the server] >>> "REQUEST" event
 * - callback functions inside "on" method will automatically be called
 * 
 * [BTS]
 *      - "server" is actually an instance of Node.JS Event Emitter Class 
 *      - so server inherits all event emitting and listening logic from event-emitter class
 * 
 * - as server keeps on observing the "REQUEST" from user! [so it is "OBSERVER PATTERN"]
 * - we can add multiple listeners to a same event
 * 
 * 
 * ! 6. Events in Practice
 * -=-=-=-=-=-=-=-=-=-=-=-=
 * [code]
 * ------
const EventEmitter = require("events");

const myEmitter = new EventEmitter(); // - creating instance from class "EventEmitter" [these emit named events and we can subscribe to those events]

// - listeners
myEmitter.on("newSale", () => {
  console.log("There was a new sale!"); // - "on" here is an observer >>> observes emitter and waits until it emits "newSale" event!
});

// - REGISTERING multiple event-listeners for same event "newSale"
myEmitter.on("newSale", (stockItems) => {
  console.log(`There are now ${stockItems} items left in stock.`);
});

myEmitter.emit("newSale", 9); // - event name [event to emit named event called: "newSale"]
 * 
 * ? if we want to use these in real-world then following best practices would be..
 *      - create a new class that inherit behavior from node's event-emitter! 
 * [CODE]
 * ------
 * - code with ES6 classes:
 * ---
const EventEmitter = require("events");

// - class: "EventEmitter" and new class "Sales" will inherit everything from "EventEmitter"
class Sales extends EventEmitter {
  // - fn that would run when we create an object from a class!
  constructor() {
    // - we have to call "super" whenever we extend from another super-class! [from this we gets access to every method from super-class]
    super(); 
  }
}
const myEmitter = new Sales(); // - we created an object from "Sales"

// >>> listeners
myEmitter.on("newSale", () => {
  console.log("There was a new sale!"); // - "on" here is an observer >>> observes emitter and waits until it emits "newSale" event!
});

// - REGISTERING multiple event-listeners for same event "newSale"
myEmitter.on("newSale", (stockItems) => {
  console.log(`There are now ${stockItems} items left in stock.`);
});

myEmitter.emit("newSale", 9); // - event name [event to emit named event called: "newSale"]
 * 
 * $ SUMMARY:
 * - this way node core modules like: "http", "fs" 
 *      - implements events internally!
 * 
 * ? A-REAL-WORLD example...
 * [CODE]
 * ------
const server = http.createServer();

// - listen to "request"
server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received");
});

// - listen for multiple times for same "request"
server.on("request", (req, res) => {
  console.log("Request received!");                 // - cannot send another response here! [is not possible "res.end"]
}); 
  
server.on("close", () => {
  console.log("Server closed!");
});

// - start the server
server.listen(8080, () => {
  console.log("Server up and running on: 8080");
});
 * 
 * - server never exits and it continues to listen!
 *      - cause server still waits for incoming I/O 
 * 
 * $ SUMMARY:
 * - we have to emit events whenever we use [const EventEmitter = require("events")] on our own!
 *      - these are custom events 
 * 
 * - whenever we use built-in node module: "http"
 *      - the functions / methods upon this "http" emit their own events [so we have to just listen to them]
 * 
 * 
 * ! 7. Introduction to Streams
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * * [STREAMS]
 *      - used to process [read and write] data piece by piece [chunks]
 *          - in this way it does not require to complete whole read or write operation
 *          - therefore, it does not keep all data inside memory
 * ex: streaming companies: YOUTUBE, NETFLIX uses same type of strategies
 * (instead of waiting for complete video to load.. they work on parts of videos / data)
 * 
 * - with streams we can handle large volumes of data [videos]
 * - makes more efficient data processing - terms of memory [no need to keep all data inside memory]
 *      - and time [we don't have to wait until complete data is available] 
 * 
 * $ NOTE:
 * - streams is an instance of "EventEmitter" class!
 *      - which means all streams in below can emit and listen to named-events
 * 
 * (there are 4 types of streams)
 * >>> [Node.JS Streams]
 * ---
 *      - READABLE STREAMS [imp]
 *          - description:                              streams from which we can read [consume] data
 *          - example:                                  data that comes with [http requests, fs read streams]
 *          - events [we can emit and listen to...]:    data [when there is a new piece of data to consume] and end [when there is no more data to consume] 
 *          - functions:                                pipe() [which allows us to plug streams together]   and read()
 * 
 *      - WRITABLE STREAMS [imp]
 *          - streams of data which we can write data
 *          - http responses, fs write streams
 *          - drain and finish
 *          - write() and end()
 * 
 *      - DUPLEX STREAMS
 *          - streams that are both writable and readable
 *          - net web socket
 *              - which is a communication channel between client and server that works in both directions
 * 
 *      - TRANSFORM STREAMS
 *          - these are DUPLEX streams that "transform" data as it is read or written
 *          - zlib [to compress data]
 * 
 * 
 * ! 8. Streams in Practice
 * -=-=-=-=-=-=-=-=-=-=-=-=-
 * >>> when we need to read a large text-file and then send it to the client
 * 
 * - solution-1: [just read file and send it to the client [simplest]]
 * [code]
 * ------
const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  fs.readFile("./test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log("server up and running on: 8080");
});
 * 
 * ? [problem] 
 * - node will have to load entire file into memory! [after that only it can send that data]
 *      - problem when used for production code
 * 
 * - solution-2: "Streams" 
 *      -  [events emitted and listened from "STREAMS" are: "data", "end"]
 * [code]
 * ------
const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  const readable = fs.createReadStream("./test-file.txt");
  readable.on("data", (chunk) => {                              // - every piece of data that is read will be written into response
    res.write(chunk);                                   // - response is a writeable stream.. we write to response!
  });
  readable.on("end", () => {            // - signaling that no more data is "writeable"
    res.end();
  });
  readable.on("error", (err) => {       // - if any errors ?
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
});

server.listen(8080, () => {
  console.log("server up and running on: 8080");
});
 * 
 * ? [problem]: BACKPRESSURE
 * - here readable stream is much faster than sending result with response writable stream over the network!
 *      - as a result: writeable stream cannot handle all incoming data that much faster
 * [BACKPRESSURE]
 *      - when response cannot send data as fast as it is receiving that data
 * [code]
 * ------
const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  // >>> solution-3:
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
});

server.listen(8080, () => {
  console.log("server up and running on: 8080");
});
 * 
 * >>> pipe()
 * - allows us to "PIPE" output of a readable stream into the input of a writable stream
 *      - this will fix the problem of "BACKPRESSURE"
 * 
 * - works as follows:
 *      - readable-source.pipe(writable-destination)
 * 
 * 
 * ! 9. How Requiring Modules Really Works
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (how nodejs modules work behind the scenes?)
 * 
 * * [COMMON JS MODULE SYSTEM]
 *      - each JS file is treated as separate module
 *      - node.js uses commonJS module system: [require(), exports OR module.exports()]
 *      - ES module system is used in browsers: import / export 
 * 
 * ? what happens when we require() a module ?
 * 
 * [PROCESS]
 * ---------
 * RESOLVING &   
 *  LOADING     --- core modules [http]     ||      developer modules ["./folder/file"]     ||      3rd party modules - from NPM ["express"]
 *     |       
 *  WRAPPING    --- 
 *     |
 * EXECUTION    ---
 *     | 
 * RETURNING-
 *  EXPORTS     ---
 *     |
 *  CACHING     ---
 * 
 * ! SKIPPED !
 * 
 * ! 10. Requiring Modules in Practice
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! SKIPPED !
 * 
 * 
 */
