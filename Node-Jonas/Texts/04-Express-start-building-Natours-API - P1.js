// ! Express start building Natours API - PART(1) !
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
 * $ NOTE
 * - status-code = 200 >>> 'ok'
 * 
 * 
 * ! 4. APIs and RESTful API Design
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
 * ! 5. Starting Our API: Handling GET Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=
 * 
 * * PROJECT: "Natours" application
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - 1st API and then we build user-interface
 * 
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();

const tours = JSON.parse(                                               // #2
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> GET all-tours
app.get("/api/v1/tours", (req, res) => {            // #1
  res.status(200).json({
    status: "success",              // #3
    results: tours.length,
    data: {
      tours: tours,         // #4
    },
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * $ EXPLANATION
 * -------------
 * # 1.1
 * - "/api/v1/tours"
 *      - specifying API version V1 and V2 so on.. 
 *      - use new versions.. whenever we modify previous version 
 *      [so that older-versions would not be broken!] >>> when we work on V2.. V1 will not be broken!
 * 
 * # 1.2 
 * - request handler / route handler
 *      - when we hit the route [/api/v1/tours].. callback fn will be executed
 *      - every data we send inside callback-fn.. will be sent to "tours" [tours a resource!]
 * [only request handler that is a callback function.. will run inside event-loop]
 * 
 * [inside req-handler we read JSON file from local folders]
 * # 2.
 * - JSON.parse()
 *      - JSON will be converted into javascript objects OR an array of JS objects!
 * 
 * # 3.
 * - res.json({ ... })
 * * sends a JSON response!
 *      - we send JSON data with JSend- a JSON formatting standard!
 *      - inside we specify "status" and "data"
 *          - data key: used to envelope the data we send!
 * 
 * # 4.
 * [data: {tours: tours} in which "tours" as key is used cause to represent resource inside "/api/v1/tours"]
 * 
 * >>> POSTMAN
 * - as this is used to test routes
 * - open => create a new collection => inside collection "node-natours" => select "GET" method => enter URL: "localhost:8080/api/v1/tours"
 *      - click on "send" => we get a response 
 * [response of what we read from the file!] 
 * 
 * $ NOTE
 * - in future, we send the stored data that is read from DataBase!
 * 
 * 
 * ! 6. Handling POST Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (we can send / post data from client to server)
 * 
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();

// >>> middleware               
app.use(express.json());        // #2

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> POST create-a-tour
app.post("/api/v1/tours", (req, res) => {       // #3
  //
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);       // #1.1 (only req.body)   #1.2 Object.assign(object-1, object-2)

  tours.push(newTour)
  
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {        // #4 (JSON.stringify)
    res.status(201).json({
      status: "success",    |
      data: {               | // - sending a response object after creating a TOUR [instead of simply responding "Done"]
        tour: newTour       |
      }
    })
  })
});

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 *
 * $ EXPLANATION
 * -------------
 * # 1. 
 * ? req.body
 * [data stored inside request's body: an Object]
 * - as data sent from client to server.. so data is available inside on the request!
 *      - inside POST req.. request object holds every data that has to be sent!
 * 
 * - but express does not put body data on the request.. in order to have that data inside BODY.. 
 *      - we have to use "MIDDLEWARE"! 
 * 
 * # 2.
 * * MIDDLEWARE
 * - to insert a middleware inside an express-application, we use.. 
 *      >>> app.use(express.json())
 * 
 * - here express.json() is a middleware!
 *      - a function which can modify incoming request-data [from client]! 
 * 
 * - it is called MIDDLEWARE
 *      - cause it stays in between request and response cycle!
 *      [we talk more about this in later lectures]
 * 
 * >>> we used MIDDLEWARE here.. to get access to the request.body
 * 
 * ? send data to server and write that same data to the file: "./dev-data/data/tours-simple.json"
 * # 3.
 * - request-handler [a-callback-fn]
 * - on same route that was used to "get-all-tours" [but HTTP method was changed to "POST"]
 *      [POST: cause here we are creating a new tour and adding it to existing file]
 * 
 * - calculating "newId" for new-tour.. based on last object's ID 
 * const newId = tours[tours.length - 1].id + 1;
 * 
 * # 1.1 
 * ? Object.assign({source-object}, {target-object})
 *      - takes in a new-source object and target-object
 * 
 * const newTour = Object.assign({ id: newId }, req.body);
 * - this takes in one or more "source-objects" {id: newId} and copies properties to existing "target-object" {req.body}
 * 
 * - while creating "newTour" 
 *      - Object.assign copies 'id' and it's 'value' to "req.body"
 * 
 * # 4.
 * ? JSON.stringify()
 * - Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *                          [value: can be any JS object or an array]
 * - here tours is an array of objects
 *      - this array will be converted into JSON string!
 * 
 * ? how to send data through request via 'POSTMAN'
 * >>> POSTMAN
 *      - inside existing collection "node-natours" => create another request "POST" => add URL: "localhost:8080/api/v1/tours"
 *          - we can send data in various ways inside "Body" tab: [none, form-data, x-www-form-urlencoded, raw, binary, graphQL]
 * [same URL is used to get data and post a data >>> but http methods are diff: "GET" and "POST"]
 * 
 * - we can only use "Body" to send a request => select "raw" and inside drop-down select "JSON" format! 
 * [data-to-send]
 * --------------
{
    "name": "Test tour",    |
    "duration": 30,         |   - Dummy Data!
    "difficulty": "easy"    |
}
 * 
 * - if we log the req.body to console.. we get JavaScript Object
 * { name: 'Test tour', duration: 30, difficulty: 'easy' }
 * 
 * - without app.use() that is without middleware.. we get "undefined" inside console!
 * 
 * >>> after sending request on POSTMAN
 * [via "localhost:8080/api/v1/tours"]
 *      - we get below response.. 
{
  "status": "success",
  "data": {
    "tour": {
      "id": 9,
      "name": "Test tour",
      "duration": 30,
      "difficulty": "easy"
    }
  }
}
 * 
 * $ SUMMARY
 * - this above object will be converted to JSON-string and added to file at last of the tours-array!
 * 
 * ! 7. Responding to URL Parameters
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (how to define parameters inside URL and also how to read and respond to parameters)
 * [ex: localhost:8080/api/v1/tours/5] >>> reading tour with "id": 5
 * 
 * - localhost:8080/api/v1/tours/5
 *                               | +---- this '5' is called "variable"
 * 
 * ? how to define a route which can accept a variable! 
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> GET all-tours
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// >>> GET a-tour [with Id]
app.get("/api/v1/tours/:id", (req, res) => {        // #1
  // console.log(req.params);

  // const id = req.params.id * 1;         // #2
  const id = Number(req.params.id)
  // console.log(id)

  if (id > tours.length) {              // #3
    return res.status(404).json({
      status: "fail",                   |
      message: "id not found!",         |... // #4
    });
  }

  const tour = tours.find((element) => element.id === id);  // #5
  // console.log(tour);

  res.status(200).json({        // - res.json() sends a JSON response
    status: "success",
    data: {
      tour: tour,
    },
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * $ EXPLANATION
 * 
 * # 1.
 * - parameters inside URL (/api/v1/tours/:id)
 * :id >>> where 'id' is a "variable"
 * 
 * - after ":" colon every thing is considered as a variable
 * (/api/v1/tours/:id/:xy/:yz)
 *    - here id, xy and yz are variables and.. 
 *    - every variables has to be filled with data.. while requesting from client-side
 * 
 * - if URL is structured like:       /api/v1/tours/:id/:xy/:yz
 * - then requests has to be sent:    /api/v1/tours/5/3/2
 * [id = 5, xy = 3, yz = 2]
 * (if not, error will be thrown)
 * 
 * - optional parameters with '?'
 *    - if URL has been structured like this: /api/v1/tours/:id/:xy?/
 *    - here ? denotes that xy is an OPTIONAL parameter
 * (if no value passed.. undefined will be taken)
 * 
 * # 2.
 * - req.params: string-type
 *    - parameters are requested from URL [that is from client-side]
 * (hence parameters are put on request!)
 * 
 * const id = req.params.id * 1
 * - [in JS, any string multiplies with 1 >>> will be converted to a number]
 * 
 * # 3.
 * - guard-clause! 
 * if (id > tours.length) { return ... }
 *    - this is added to check if there is no "id" passed into URL
 *       - and will be returned from current operation! 
 * 
 * # 4.
 * - send message to catch error
 * res.status(404).json({ ... })
 *    - res.status() is set to '404' >>> represents "Not Found!"
 *    - res.json({}) is used to send JSON response with "message": "id not found!"
 * 
 * # 5.
 * ? find method
 * const tour = tours.find((element) => element.id === id)
 *    - The find() method iterates through the array in ascending order.
 *      - It calls the provided function for each element until it finds one that satisfies the condition.
 *        - If such an element is found, it returns that element; otherwise, it returns undefined.
 * 
 * simply, it loops on every element in provided array and applies the callback and logic specified inside callback!
 *    if logic satisfied it returns the 1st element.. else 'undefined' 
 * [ex]
const numbers = [4, 9, 16, 25];
const found = numbers.find(num => num > 10);    | - executes for once.. if it finds one element it will be returned!
console.log(found); // Output: 16
 *  
 * 
 * $ NOTE
 * - status-code: 404 >>> "NOT FOUND!"
 * 
 * ! 8. Handling PATCH Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * - PUT:   server receives entire updated object
 * - PATCH: server expects only updated properties of an object
 * 
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();

// middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> PATCH update-a-tour
app.patch("/api/v1/tours/:id", (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "id not found!",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * $ NOTE
 * - here.. have not implemented complete logic behind updating  
 * [as we are applying CRUD operations on files but it is not real-world]
 * 
 * ? [steps]
 * ---------
 * - update properties only.. not an entire object!
 * [used PATCH here..]
 * 
 * - as patch updates only an object inside a resource.. so we send ID as URL-params
 *    - check if there are any params 
 * 
 * - on success.. send a json object! 
 *    - with JSend formatting!
 * 
 * 
 * ! 9. Handling DELETE Requests
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> PATCH update a field
app.patch("/api/v1/tours/:id", (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "id not found!",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
});

// >>> DELETE delete a field
app.delete("/api/v1/tours/:id", (req, res) => {       
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "id not found!",
    });
  }
  res.status(204).json({          
    status: "success",
    data: null,             
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * - logic is similar to PATCH but HTTP method changes!
 * [delete]
 *    - delete a resource with it's id
 * 
 * - status code changes to '204': no content
 * - as there will not be any content (so data is set to null)
 * 
 * $ NOTE:
 * - status-code = 204 >>> "no content"
 * 
 * ! 10. Refactoring Our Routes
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * - we will separate handler functions from logic
 * [so that we can export them into separate files] >>> (so that route-handler-logic stays abstracted)
 * 
 * - we also will use "route" method
 * [app.route]
 * 
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();

// middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> GET all-tours
const getAllTours = (req, res) => { ... };

// >>> GET a-tour [with Id]
const getTour = (req, res) => { ... };

// >>> POST create-a-tour
const createTour = (req, res) => { ... };

// >>> PATCH update a field
const updateTour = (req, res) => { ... };

// >>> DELETE delete a field
const deleteTour = (req, res) => { ... };

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * - used app.route() and then chained every HTTP method!
 * [ex]
 * ----
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
 * 
 * - this creates single place to update the route 
 * [if we changed the resource name..]
 *    - we can change at single place 
 * 
 * 
 * ! 11. Middleware and the Request-Response Cycle
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-
 * (how express works: deep dive)
 * 
 * >>> essence of EXPRESS development: THE REQ-RES CYCLE!
 * 
 *                                              middleware-stack 
 *                                                     |
 *                         + ------------------------- + -------------------------- +
 *                         |                                                        |
 * INCOMING REQ +---------- middleware  ----------- middleware ----------- middleware ----------=> RESPONSE
 *      |                   .....                   .....                  .....
 * REQ + RES object         next()                  next()                 res.send()
 *                            |                       |                        |
 * ex:                    parsing body              logging              setting headers                          
 *              
 * $ [explanation]
 * - express app receives a request when someone hit a URL
 *    - for which it then creates a request and response object
 * [then that data will be used and processed.. in order to send a response]
 * 
 * - to process data.. we use MIDDLEWARES in express
 *    - which can manipulate req and res object!
 * [middlewares does not always have to be just about req and res object]
 * 
 * $ NOTE
 * - we already used middleware: used express.json() to get access to the request.body
 * 
 * * in express everything is a MIDDLEWARE
 * [as route / request handlers works as a middleware fns]
 * 
 * - middleware is a function.. executed in the middle of receiving request and sending a response!
 * [examples]
 * ----------
 *    - 1. middleware fns are used to parse request-body [express.json() >>> helps in that!]
 *    - 2. logging.. setting headers 
 * 
 * - every middleware together are called middleware stack!
 *    - order of every middleware is important
 * 
 * - req and res object that were created will go through every middleware..
 *    - inside middleware stack and where these objects were processed!
 * 
 * - at end of every middleware.. "next" function will be called
 *    - calling "next" takes req and res objects to next middleware
 * [similarly like.. data which goes through a pipeline] 
 * 
 * - last middleware where "next" is not called.. but we send response to client
 *    - we call res.send instead of next inside last middleware! 
 * 
 * $ NOTE
 * use // => use method 
 *    - on "app"
 * [app.use]
 * 
 * - middlewares applies to every single request made
 *    - route handlers are also middlewares but they apply to a certain URL!
 * 
 *  => this is how express works !
 * 
 * ! 12. Creating Our Own Middleware
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * - use method is used on "app" to use middleware!
 *    - every middleware takes in three arguments.. [req, res, next]
 * [code]
 * ------
const fs = require("fs");
const express = require("express");

const app = express();

// >>> middlewares
app.use(express.json());

app.use((req, res, next) => {           // #1
  console.log("Hi! From middleware")
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// >>> ROUTE-HANDLERS
const getAllTours = (req, res) => { ... };
const getTour = (req, res) => { ... };
const createTour = (req, res) => { ... };
const updateTour = (req, res) => { ... };
const deleteTour = (req, res) => { ... };

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * # 1.
 * - app.use((req, res, next) => { ... })
 *    - every middleware has access req and res objects
 *    - next: function has to be called else req/res objects does not react next middlewares
 * 
 * [code]
 * ------
app.route("/api/v1/tours").get(getAllTours).post(createTour);

app.use((req, res, next) => {           // #2
  console.log("Hi! From middleware")
  next()
})

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
 * 
 * # 2.
 * - middleware after request-response cycle!
 *    - requests cannot get access to middleware if it (middleware) is placed after we send response
 * [once response is send req-res cycle will be completed]
 * 
 * $ NOTE:
 * - middleware applies to each and every request 
 * - middlewares shall be called before sending a response [means before ending req-res cycle]
 *     - simply middleware must be before route handler
 * - so we define middlewares at top before req/route handlers
 * 
 * 
 * ! 13. Using 3rd-Party Middleware
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (3rd party middleware fn called: "MORGAN")
 * 
 * * Morgan
 *    - popular 3rd-party logging middleware!
 * [middleware allows us to view req-data inside console] 
 * 
 * >>> official definition
 * - Concise output colored by response status for development use. 
 *    - The :status token will be colored red for server error codes, yellow for client error codes, 
 *        - cyan for redirection codes, and uncolored for all other codes. 
 * - :method :url :status :response-time ms - :res[content-length]
 * 
 * >>> simply.. log will be like this...
 * - [used to log HTTP method used, URL used for request, status code, time took to respond, size of response (bytes, kilobytes..)]
 * 
 * - install:
 *    => npm i morgan
 * [code]
 * ------
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// - body-parser
app.use(express.json());

// >>> 3rd-party middlewares
app.use(morgan("dev"))          // #1

// - defined middlewares
app.use((req, res, next) => {           
  console.log("Hi! From middleware")
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// - ROUTE-HANDLERS
const getAllTours = (req, res) => { ... };
const getTour = (req, res) => { ... };
const createTour = (req, res) => { ... };
const updateTour = (req, res) => { ... };
const deleteTour = (req, res) => { ... };

// - routes
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// - listening to server 
const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * 
 * >>> [morgan]
 * - this is basically a middleware
 *    - behind the scenes it uses: [req, res, next]
 * [but everything will be abstracted]
 * 
 * - it takes flags as arguments such as: [combined, common, dev, short, tiny] 
 *    - based on these arguments log will be formatted!
 * 
 * - the console-log we get [when used argument: "dev"]
 * GET /api/v1/tours 200 60.443 ms - 8577
 * 
 * 
 * ! 14. Implementing the "Users" Routes
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * - implemented structure of user-routes and route-handlers
 * [but not logic inside them!]
 * 
 * [code]
 * ------
/////////////////////////////////////////////////
// >>> 2.2 user-route-handlers

const getAllUsers = (re1, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const getUser = (re1, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const createUser = (re1, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const updateUser = (re1, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const deleteUser = (re1, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

/////////////////////////////////////////////////
// >>> 3.2 USER-ROUTES

app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
 * 
 * 
 * - just implemented structure of routes!
 * 
 * $ NOTE
 * - status-code: 500 >>> INTERNAL SERVER ERROR  
 *    - message: "this route is not yet implemented!"
 * 
 * 
 * ! 15. Creating and Mounting Multiple Routers
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=
 * (create multiple routers and we use a process called "MOUNTING")
 * 
 * - ultimate-goal:
 *    - separate code into multiple files 
 * [separate files for "routes": {tours and users} and another file for "route-handlers": {tours and users}]
 * 
 * but initially.. 
 * - we need to create separate router for each resources: [tours, users]
 * 
 * [code-before]
 * -------------
// >>> 3.1 TOUR-ROUTES
app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// >>> 3.2 USER-ROUTES
app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
 * 
 * - we need to separate these routes into diff files
 *    [separate file for tour-routes and user-routes]
 * 
 * - but they are on the same router called "app"
 *    - so we need to separate the router [at-first] 
 * 
 * [code-after]
 * ------------
// - 3. ROUTES
// >>> 3.1 TOUR-ROUTES
const tourRouter = express.Router();    // #1

// >>> 3.2 USER-ROUTES
const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);   // #2
app.use("/api/v1/users", userRouter);

tourRouter.route("/").get(getAllTours).post(createTour);                      |
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);   | ... // #3

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
 * 
 * # 1. sub-app
 * const tourRouter = express.Router()
 *    - creates new router for tour related routes
 *    - it is like a mini-application for route: {/api/v1/tours}
 * 
 * [created routes separately for "tours" and "users"]
 *    therefore there are two mini-apps for tours and users
 * 
 * # 2. connect-new-router-to-express(app)
 * app.use("/api/v1/tours", tourRouter)
 * 
 * ? connect new router with our application ?
 * - tourRouter and userRouter are middlewares
 *    - and we will use that middleware on specific route: "/spi/v1/tours" and "/api/v1/users"
 * 
 * * Mounting - router
 *    - mounts (attaches) "userRouter" and "tourRouter" to main Express-application
 * 
 * >>> Flow of application:
 * - when request hits "app"
 * - app.use("/api/v1/tours", tourRouter) => express forwards request to "tourRouter"
 * - inside "tourRouter".. 
 *    - if it matches "/"     => then it will run "getAllTours"
 *    - if it matches "/:id"  => then it will run "getTour" gets-a-tour with id
 * - controller [getAllTours and getTour] processes data and sends back the response to client!
 * 
 * => next lecture
 * >>> refactor application [separate to diff folders]
 * 
 * ! 16. A Better File Structure
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * (code separation: creating mini-apps)
 * 
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * # PART - 1:
 * -----------  
 * SEPARATE ROUTES from app.js
 * 
 * - created "routes" in which.. 
 *    - created new files ["userRoutes" and "tourRoutes"] 
 *    [to separate the code from App.js into those files..]
 * 
 * [code-userRouter]
 * -----------------
const express = require("express");

// >>> Controllers (functions handling requests)
const getAllUsers = (req, res) => { ... };
const getUser = (req, res) => { ... };
const createUser = (req, res) => { ... };
const updateUser = (req, res) => { ... };
const deleteUser = (req, res) => { ... };

// >>> 1) Create a new router object
const router = express.Router();        // #1

// >>> 2) Define routes inside the router
router.route("/")               // #2.1
  .get(getAllUsers)
  .post(createUser);            // #2.2

router.route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// >>> 3) Export the router
module.exports = router;        // #3
 * 
 * ... similarly for "tourRoutes" file also ...
 * 
 * [process]
 * - here.. we created a "router" object 
 * - attached routes ("/") and ("/:id")
 * - attached route-handlers get, post etc., HTTP methods
 * 
 * >>> then the total code looks like this!
 * [code]
 * ------
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
 * 
 * - lastly the total object with routes and route-handlers attached was exported!
 * 
 * [app.js]
 * - importing exported "router" as "tourRouter" and "userRouter" from their respective "tourRoutes" and "userRoutes" files
 * [code]
 * ------
// >>> routers imported ...
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// - and using them inside middlewares to recognize the 1st part of URL ["/api/v1/tours" and "/api/v1/users"]
// >>> separate middlewares for "tourRouter" and "userRouter"
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
 * 
 * $ SUMMARY
 * - You create a router object → attach routes and handlers to it → export the whole object.. [and imported into "app.js"]
 * - in this way.. we have created sub-mini-applications "tour-app" and "user-app"
 * 
 * ? why we had separated code into their respective mini-apps ?
 * ---
 * - before separation every code contained inside app.js
 *    * but app.js is for only used for middleware declarations!
 * 
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * # PART - 2
 * ----------
 * SEPARATE ROUTE-HANDLERS for respective routes!
 * 
 * - create "controllers" but not handlers folder
 * [convention: controllers-folder convention >>> which is followed inside MVC "Model-View-Controller"]
 * 
 * [tourController.js]
 * -------------------
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.getAllTours = (req, res) => { ... }   |
exports.getTour = (req, res) => { ... }       |
exports.createTour = (req, res) => { ... }    | - all fns exports here!
exports.updateTour = (req, res) => { ... }    |
exports.deleteTour = (req, res) => { ... }    |
 * 
 * - exported from "tourController" file 
 * 
 * [import-into-tourRoutes]
 * ------------------------
const express = require("express");

// >>> contains route-handler fns
const tourController = require("./../controllers/tourController");

const router = express.Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
 * 
 * - imported into "tourRoutes" file
 * 
 * ? how exports works?
 * ---
 * - inside exports file we have: [exports.getAllTours = (req, res) => { ... }] and other exports.. 
 * - here we are attaching functions / properties to "exports" object
 * [inside tourController looks like..]
 * ------------------------------------
exports = {
  getAllTours: [Function getAllTours],
  getTour: [Function getTour],
  createTour: [Function createTour],
  updateTour: [Function updateTour],
  deleteTour: [Function deleteTour]
};
 * 
 * - BTS, when Node runs "tourController" file.. all exports will be assigned to..
 *    - [module.exports = exports] automatically 
 * [so whatever we attached to exports.. gets exported as a single object]
 * 
 * ? how imports works ?
 * ---
 * - inside tourRouter.js
const tourController = require("./../controllers/tourController");

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// - [tourController object looks like..]
tourController = {
  getAllTours: [Function getAllTours],
  getTour: [Function getTour],
  createTour: [Function createTour],
  updateTour: [Function updateTour],
  deleteTour: [Function deleteTour]
};
 * 
 * - since we exported an object with all functions as properties, "tourController" becomes that same object
 * 
 * $ SUMMARY:
 * - exports here is also an object, and you attached controller functions to it → then exported it
 * - where.. we import the whole object and use its properties.
 * 
 * >>> therefore.. similar for userRoutes and userController files
 * 
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * # PART - 3
 * CREATE server.js FILE 
 * 
 * ? why ?
 * ---
 * - it is a good practice to have everything related to express in one file.. 
 *    - and everything related to server in another main file!
 * 
 * [server]
 * - which will be the starting file.. where we also listens to the server
 *    - server related code inside app.js is only.. 
 * [code]
 * ------
const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * - so create server.js in main-root folder of project and insert above code into it!
 *    - so export "app" from app.js.. so that server gets access to "app"
 * [we have everything related to application and it's configuration in one STANDALONE file: app.js]
 * 
 * - we will have things that are not related to express inside server.js
 *    - like database configurations, error handlers, environment variables will be inside server.js
 * [acts like an entry point]
 * 
 * - as server is the entry point and we have to listen from server.js file
 *    - so we start server with "nodemon server.js" [inside terminal]
 * 
 * >>> package.json configuration
 * - modify the "scripts" property!
 * 
 * [package.json]
 * --------------
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "nodemon server.js"
},
 * 
 * - so to start server we just need "npm start" inside terminal
 * 
 * NOW..
 * * FLOW OF APPLICATION
 * ---
 * - SERVER => APP.JS => ROUTES => ROUTE-HANDLERS
 * 
 * [MODIFIED-CODE]
 * ---------------
 * >>> server.js
 * ---
const app = require("./app")

// - 1. LISTENING TO SERVER / START SERVER
const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * >>> app.js
 * --- [we have everything related to application and it's configuration in one STANDALONE file: app.js]
const express = require("express");
const morgan = require("morgan");

// routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// - 2.1 MIDDLEWARES
// 3rd-party middlewares
app.use(morgan("dev"));

// body-parser
app.use(express.json());

// defined middlewares
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

// - 2.2 routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app
 * 
 * >>> routers
 * >>> [tourRoutes.js]
 * ---
const express = require("express");

// - 3.0 contains route-handler fns
const tourController = require("./../controllers/tourController");

const router = express.Router();

// - 3.1 route-handlers
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
 * 
 * >>> route-handlers
 * >>> tourController.js
 * ---
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

// GET all-tours!
exports.getAllTours = (req, res) => { ... };

// GET a-tour! [with Id]
exports.getTour = (req, res) => { ... };

// POST create-a-tour!
exports.createTour = (req, res) => { ... };

// PATCH update-a-field!
exports.updateTour = (req, res) => { ... };

// DELETE a-field!
exports.deleteTour = (req, res) => { ... };
 * 
 * 
 * 
 * 
 * ! PART - (2) !
 * => CONTINUES..
 * 
 * 
 * 
 * */