const EventEmitter = require("events");
const http = require("http");
// const myEmitter = new EventEmitter(); // creating instance from class "EventEmitter" [these emit named events and we can subscribe to those events]

// class: "EventEmitter" and new class "Sales" will inherit everything from "EventEmitter"
class Sales extends EventEmitter {
  // fn that would run when we create an object from a class!
  constructor() {
    // we have to call "super" whenever we extend from another super-class!
    super(); // from this we gets access to every method from super-class!
  }
}

const myEmitter = new Sales(); // we created an object here!

// listeners
myEmitter.on("newSale", () => {
  console.log("There was a new sale!"); // "on" here is an observer >>> observes emitter and waits until it emits "newSale" event!
});

// REGISTERING multiple event-listeners for same event "newSale"
myEmitter.on("newSale", (stockItems) => {
  console.log(`There are now ${stockItems} items left in stock.`);
});

myEmitter.emit("newSale", 9); // event name [event to emit named event called: "newSale"]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received");
});

// listen for multiple times for same "request"
server.on("request", (req, res) => {
  console.log("Request received!");
});

server.on("close", () => {
  console.log("Server closed!");
});

// start the server
server.listen(8080, () => {
  console.log("Server up and running on: 8080");
});
