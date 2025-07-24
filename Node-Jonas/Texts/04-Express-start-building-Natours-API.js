// ! Express start building Natours API !
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * 
 * ! 1. What is Express?
 * -=-=-=-=-=-=-=-=-=-=-=
 * 
 * * Express 
 * - express is a minimal node.js framework, a higher level of abstraction!
 * [which is built on top of node.js]
 * 
 * - express contains set of features: 
 *      - [complex routing, easier handling of requests and responses, middleware, server-side-rendering etc.,]
 * 
 * - express makes it easier to organize our application into MVC architecture
 * [MVC: a software architecture pattern]
 * 
 * 
 * ! 2. Installing Postman
 * -=-=-=-=-=-=-=-=-=-=-=-=
 * - an application which helps us to test an API
 * - a tool which simplifies API DEVELOPMENT
 * 
 * >>> download POSTMAN application...
 * visit: // => https://www.postman.com/downloads/
 * 
 * 
 * ! 3. Setting up Express and Basic Routing
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-
 * (we work on big project called: "NATOURS" application)
 * 
 * - copy the project set-up from jonas's node-github repository!
 * copy from: // => "https://github.com/jonasschmedtmann/complete-node-bootcamp/tree/master/4-natours" 
 * 
 * - set-up package.json using "npm init"
 * [without flag: -y]
 *      - provide package-name: "Natours"
 *  
 * - install express version: 4
 * => npm i express@4
 * 
 * - create a new file // => app.js
 * 
 * [code]
 * ------
const express = require("express");

const app = express();      
const port = 8080;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from server side!",
    app: "Natours",
  });
});

app.post("/", (req, res) => {
  res.send("You can post on this endpoint...");
});

app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * - app = express() 
 *      - upon calling "express".. it will add methods into "app" variable
 * 
 * $ NOTE
 * - app works similarly node and it is 100% nodejs under the hood!
 * - it reduces the complexity 
 * 
 * >>> defining routes
 * - defining how an application responds to a client request / certain URL 
 *      - but also responding to an HTTP method!
 * 
 * >>> [HTTP- methods]
 *      - app.get()
 *      - app.post() .. etc.,
 * 
 * - these takes a URL and callback.. on requesting to that URL callback will be executed!
 * - callback takes in request and response..
 *      - on certain request to a specific URL... res will be sent!
 * 
 * >>> [response-object]
 *      - we can send a response with.. [but only a string to the client] 
 *          - res.send("comments!")
 * 
 * - we can send a json object.. 
 *      - res.json({ message: "comments", app: "express-application" })
 * 
 * [status-codes]
 *      - we can also attach status-codes [for example.. 200: ok, 404: not found etc.,]
 *          - res.status(200).send("comments!")
 * 
 * - imp: so we can now hard-code "status-codes" while sending responses!
 * [ex]
 * ----
app.get("/", (req, res) => {
    res.status(200).send("some string")    
})

app.post("/", (req, res) => {
    res.send("something big!")    
})
 * 
 * - this response will only be sent.. when "get" method with URL: "/" is requested on server!  
 * 
 * $ SUMMARY:
 * - in this we can send different responses for different methods [get, post] for different URLs: [/, /login etc.,]
 * - with express, we do not have to specify the status codes 
 *      - a default status code: "200" will be set for every response
 * 
 * - similarly we do not have to set any headers.. express will take care of those!
 *      - but we have to specify manually when we use NODE
 * [headers means: "Content-Type": "application/json"] >>> if the response is JSON
 * 
 * 
 * ! 3. APIs and RESTful API Design
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (understand API and REST-ful APIs)
 * 
 * * API 
 * >>> Application Programming Interface
 *      - a piece of software that can be used by another piece of software.. 
 *          - in order to allow applications to communicate each other
 * 
 * * The REST architecture
 * >>> Representational States Transfer 
 *      - is a way of building web-APIs in a logical way [making APIs easy to consume!]
 * [APIs follows REST architecture!]
 * 
 * >>> [REST- principles]
 * ---
 * #1 separate API into logical resources
 *      
 *      - data that we want to share in API must be divided into logical-resources  
 * 
 *      ? resource: 
 *          - an object or representation of something.. which has data associated to it!
 *              - any info that can be NAMED can be a RESOURCE  
 *              ex: users, bookings, cabins
 * 
 * #2 exposed using structured, resource-based URLs
 * 
 *      - make available the data using structured URLs 
 *          - so that a client can send a REQUEST to!
 * ex: http://www.the-wild-oasis.com/bookings 
 *      
 *      - this entire address is called "URL" and ["/bookings"] is called an API-endpoint!
 *      - an API can have different endpoints and requesting to that endpoint can send a different data
 * 
 * #3 API should use different HTTP methods (verbs)
 *      - endpoints such as ["getCabins" "deleteBookings"] are bad-practices
 *          - cannot contain verbs in the endpoints but only "NOUNS"!
 * 
 *      - making "getTour" into best-practiced end-points
 *          - GET /tours
 *              - so we have to attach a HTTP method to access an endpoint
 *              - with this we only have a "RESOURCE" but not an "HTTP" method inside an end-point! 
 * 
 *      ? CRUD operations
 *          - which include mostly used 5 different HTTP methods
 * 
 *      - READ:     HTTP method / verb that an app read data from DB >>> we have to use "GET /bookings" 
 *      ex: GET /bookings >>> to get all bookings 
 *          GET /bookings/7 >>> single booking with ID: 7
 * 
 *      - CREATE:   to create a new resource in a DB >>> method should be used is "POST /bookings"
 *      ex: POST /bookings        
 * 
 *      - UPDATE:   we use methods such as: "PUT" or "PATCH"
 *          - PUT:      client has to send entire updated object    
 *          ex: PUT /bookings/7
 *          - PATCH:    supposed to send only a part of an object   
 *          ex: PATCH /bookings/7
 * 
 *      - DELETE:   we have "DELETE" HTTP method
 *          - so we have to delete a single piece of a resource.. so we have to use ID  
 *          ex: DELETE /tours/7 
 *      - 
 * 
 * #4 usually send data as JSON
 *      
 *      - data that CLIENT receives or SERVER receives from a client 
 *          - we use JSON data format!
 *      - 
 *      ? JSON:
 *          - very lightweight data interchange format [which is heavily used by web-APIs] 
 * 
 * >>> [structure of JSON]
[
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
]
 *       
 *      - looks similar to an object used in JS with key-value pairs
 *          - but all the keys have to be strings!
 * 
 *      - before sending this response to client make some formatting
 *      ? RESPONSE-FORMATTING
 *          - we have to use JSend
 *          - for JSON... add a status message to it!
 *              - to inform client whether a response is "success" "fail" "error"
 * [ex]
 * ---- after RESPONSE-FORMATTING !!!
{
    "status": "success", 
    "data": 
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        }
    }
}
 * 
 *      - we add "status" and "data" keys
 *          - status consists of "message" that has to be sent to client OR server
 *          - data contains JSON object! 
 *      - 
 * #5 must be stateless
 *      
 *      ? stateless
 *          - all state must be handled on CLIENT but not on server-side!
 *          - means that each request must contain "all" info necessary to process a certain request
 *          - server shall not remember previous requests!
 *          
 *      - state refers to piece of data that might change over time
 * 
 *      >>> state shall not remember previous state [DEMO]
 *      ---
 *      ex: when we used..  "GET" "/bookings/nextPage"..    then server has to process "currentPage to generate a "nextPage"  // - bad practice!
 *      ex: just define..   "GET" "/bookings/page/6"..      then server has to be requested "page-number: 6"
 * 
 * - client way of handling things has not be followed on server-side
 * [ex]
 * ----
nextPage = currentPage + 1  |
send(nextPage)              |   ... this has to AVOIDED ... a-bad-practice

>>> server-side
send(nextPage)
 * 
 * - this way of handling states has to be done on CLIENT-side but not on SERVER-side
 * 
 * 
 * ! 4. Starting Our API: Handling GET Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * >>> discuss about API
 *      - we gonna build an API [natours project]
 * 
 * - an application where we can see tours and book them!
 *      - we can create user-accounts and can login into those
 * - we can view different tours and login to book a tour!
 * 
 * - we gonna build an API for this application and then use pre-defined interface [may be] 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * ! 2. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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