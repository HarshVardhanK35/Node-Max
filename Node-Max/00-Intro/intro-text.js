// ! Introduction !
// ----------------
/**
 * ! 1. What is Node.js?
 * -=-=-=-=-=-=-=-=-=-=-
 * * Node.js
 *      - javascript runtime... node.js is built on JS 
 * - this allows js code to run on server!
 * [not only on browser/client side.. but on server-side]
 * 
 * * server
 *      - which are computers running somewhere on the internet!
 * 
 * >>> points:
 * - node uses V8: V8 is name of js engine built - google
 *      - this runs JS on server!
 * 
 * - V8 takes browser's JS and compile it to machine-code 
 *      - V8 is made with C++ and adds features to JS [ex: which makes JS to work with local file system: (opening, reading, deleting) files etc.,]  
 * [which these features are not possible on client-side]
 * 
 * - execute JS with node.js on server
 * 
 * ! 2. Installing Node.js and Creating our First App
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * visit // => nodejs.org
 *      - download LTS / current version of node
 * 
 * open // => Command Prompt
 *      - to check the version
 * 
 * * REPL
 *      - open terminal/cmd => run "node" as command 
 * - which enables users to enter a new mode.. which run certain node commands
 *  
 * - creating 1st app.. using code editor: VS CODE
 * [code]
 * ------
console.log("Hello world from node.js")
 * 
 * >>> executing file with node.js:
 *      - use terminal to run files => navigate into current project folder 
 *      - then run // => node <file-name>.js 
 * [with file name and it's extension]
 * 
 * >>> working with local files
 *      - file system ["fs"] functionality form node.js
 *      - core modules: "fs"
 *      -  
 * steps:
 *      - import it using >>> require()
 *      - store it inside a variable 
 *      - use .writeFileSync() method on that variable 
 * [code]
 * ------
const fs = require("fs")
fs.writeFileSync("hello.txt", "Hello from node.js")
 *      
 * - after running file with node <file-name>.js 
 * - which will create a file with "hello.txt" with content "Hello from node.js" 
 *                              [inside same folder where fs module is executed]
 * 
 * 
 * ! 3. Understanding the Role & Usage of Node.js
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 *                          tasks: [we connect to databases, set-up authentication, can perform input-validation]
 *                          /
 *                | SERVER |    -----   on that server we execute code with incoming request and returns a response
 *                  |   |
 *                  |   |  
 *        request   |   |   response [an HTML page]
 *                  |   |
 *                  |   |
 *              Client-Browser
 *        - made with JS, HTML, CSS
 * [process]
 * - when user visits any URL: "any-page.com" [request is sent]!
 * 
 * [server]
 * - computer running on internet which has IP
 * 
 * [to-perform-tasks]
 * - connect to databases, set-up authentication, can perform input-validation
 * - so we write server using: "Node.JS"
 * 
 * ? node.js in web-development:
 *  >>> [run server]
 * - we create server and listen to incoming requests
 *  >>> [business logic]
 * - handle requests, validate inputs, connect to databases
 *  >>> [responses]
 * - handle responses not just incoming requests, we send back data to clients 
 *      - return responses [send: HTML pages to render, data in the form of JSON]
 * 
 * 
 * ! 4. Course Outline
 * ---------------------------------+---------------------------------------+
 *      getting started             |       [MVC]: Model-View-Controller    |
 *          |                       |                   |                   |
 *  javascript refresher            |       advanced routes and models      |
 *          |                       |                   |                   |
 *      node.js basics              |   connected node and SQL (MySQL)      |
 *          |                       |                   |                   |
 *  efficient development           |           using sequelize             |
 *          |                       |                   |                   |
 *  use Express.JS (node-framework) |           Node + NoSQL (MongoDB)      |
 *          |                       |                   |                   |
 *  templating engines              |           using Mongoose              |
 * ---------------------------------+---------------------------------------+
 *      sessions & cookies          |       file uploads & downloads        |
 *          |                       |                   |                   |
 *      Authentication              |               pagination              |
 *          |                       |                   |                   |
 *      sending emails              |               async requests          |
 *          |                       |                   |                   |
 *adv.auth + authorization deep dive|    handling payments (stripe.js)      |
 *          |                       |                   |                   |
 *      user input validation       |           REST APIs Basics            |
 *          |                       |                   |                   |
 *   error handling                 |           adv. REST API features      |
 * ---------------------------------+---------------------------------------+ 
 *    using async & await           |
 *          |                       |
 *   web sockets and socket.io      |
 *          |                       |
 *      GraphQL APIs                |
 *          |                       |
 *      deployment                  |
 *          |                       |
 *   beyond web servers             |
 *          |                       |
 *  Node.js + typescript, Deno      |
 * ---------------------------------+
 * 
 * 
 * ! 2. Working with the REPL vs Using Files
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * * REPL
 *      - Read:     read user input
 *      - Eval:     Evaluate user input
 *      - Print:    Print output (result)
 *      - Loop:     Loop again - wait for user input - repeat REP
 * 
 * >>> enter into REPL
 * - type "node" inside terminal
 * - we can write code in every line but we don't create files
 * so, this is used as playground [once we exit the process will not be saved]!
 * 
 * [alternative to REPL]
 * - execute files
 *      - write code in files with extension ".js" and execute them using "node <filename>.js"
 * (used for development of real-applications)
 * 
 * ! completed !
 * 
 * next lecture
 *          => JS basics
 * 
 */