// ! Express start building Natours API - Part (2)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * 
 * ! 17. Param Middleware
 * -=-=-=-=-=-=-=-=-=-=-=-
 * 
 * * PARAM MIDDLEWARE
 * - this middleware gets executed only when we have certain parameters inside a URL!
 * 
 * - inside below code.. HTTP method: "get" will only be executed.. if URL has param: id
 * ex:
 * router.route("/:id").get(tourController.getTour)
 * 
 * [syntax]
 * --------
// >>> param middleware
// ---
router.param('id', (req, res, next, value) => {
  console.log(`Tour id is: ${value}`);
  next()
});
 * 
 * - normally middleware fns get access to three parameters: [req, res, next]
 *  
 * - but with param-middleware.. middlewares gets access to "value" 
 *    - that is.. whatever the value that is with "id"
 * 
 * [{id: 2}] >>> if parameter requested inside URL is /api/v1/tours/2 OR /api/v1/users/2
 *    .- therefore the value will be: 2
 * 
 * => IMP
 * - calling "next" is important here.. otherwise middleware will not be able to move on to next middlewares
 *    - so response will not be sent to the user! 
 * 
 * [that is..]
 * -----------
// param middleware
router.param('id', (req, res, next, value) => {     // #1
  console.log(`Tour id is: ${value}`);
  next()                                | - 1st middleware
});                                                         | - without calling next.. execution will not reach other middlewares inside this "stack" 

router
  .route("/")
  .get(tourController.getAllTours)      |
  .post(tourController.createTour);     | .. bunch of middlewares here.. 
router
  .route("/:id")
  .get(tourController.getTour)          |
  .patch(tourController.updateTour)     | .. another bunch of middlewares here..
  .delete(tourController.deleteTour);
 * 
 * 
 * # 1.
 * router.param("id", (middleware function) => {})
 *    - this works on URL with parameter "id" and if "id" contains value.. 
 *      - that value will be accessed inside middleware fn
 * 
 * middleware fn: (req, res, next, value)
 *    - 4th argument is value which will be the value of the URL-parameter
 * [ex:]
 * "/api/v1/tours/2"
 *    - value will be {id: "2"}
 * 
 * $ NOTE
 * - if this param-middleware is defined inside "tourRouter" then it would work for "tours" only..
 *    - but it will not work for "user" routes! [if we want then we can define similar param-middleware inside user-routes]
 * 
 * $ NOTE
 * - whenever we use express.router() to define a new router inside a code / router
 *    - this then will create a new-sub-application on the name of that 'router'
 * 
 * ex: if express.router() was used inside "tourRoutes" file
 *    ... then for tours a new-mini-app is created!
 * 
 * >>> common middlewares 
 * - usually if any middlewares were defined inside app.js
 *    - they were called common-middlewares.. any request will go through these..
 *    - and finally reaches the respective route
 * [ex:] 
 * - for "api/v1/tours/2" : goes through app.js middlewares and then goes through "tours" middleware
 * 
 * ? use-cases ?
 * ---
 * - INSIDE TOUR-HANDLER CODE
 * [code]
 * ------
// - GET-A-TOUR!
exports.getTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {   |
    return res.status(404).json({               | - SIMILAR CODE #1
      status: "fail",                           |
      message: "id not found!",
    });
  }
  const tour = tours.find((element) => element.id === id); // console.log(tour);

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

// - PATCH update a field
exports.updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {   |
    return res.status(404).json({               | - SIMILAR CODE #2
      status: "fail",                           |
      message: "id not found!", 
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

// - DELETE delete a field
exports.deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {   |
    return res.status(404).json({               | - SIMILAR CODE #3
      status: "fail",                           |
      message: "id not found!",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
 * 
 * 
 * - replace repeating code with PARAM-MIDDLEWARE
 * [repeating-code]
 * ----------------
  if (Number(req.params.id) > tours.length) {   |
    return res.status(404).json({               | - REPEATING CODE
      status: "fail",                           |
      message: "id not found!",
    });
  }
 * 
 * 
 * - replace with following CODE.. once on top of a file!
 * [code]
 * ------
exports.checkID = (req, res, next, value) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({               // #1
      status: "fail",
      message: "id not found!",
    });
  }
  next();     // #2
};
 * 
 * 
 * # 1. 
 * - return statement
 *    - do not forget to add "return" 
 * [if not.. fn execution continues even if that fn goes through an error]
 * 
 * # 2.
 * - next()
 * - if "next" is not called the execution does not reach next middleware fn inside middleware-stack
 * [if there was no "return" statement next will be called and will goes through middleware-stack]
 * 
 * [MODIFIED-CODE]
 * >>> tourRoutes.js
 * -----------------
const express = require("express");

// contains route-handler fns
const tourController = require("./../controllers/tourController");

const router = express.Router();

router.param("id", tourController.checkID);

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
 * >>> tourController.js
 * ---------------------
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.checkID = (req, res, next, value) => {    |
  if (Number(req.params.id) > tours.length) {     |
    return res.status(404).json({                 | ... // - this middleware is imp and checked 1st.. before going further into middlewares! 
      status: "fail",
      message: "id not found!",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
 * 
 * 
 * $ IMP:
 * - there is a chance that we could use a function in the place of param-middleware!
 *    - calling fn to check-id inside where it has to be checked.. is imp
 * [that is inside: (getTour, updateTour, deleteTour)]
 * 
 * - but using middleware and middleware-stack must be according to express-convention
 * 
 * 
 * 
 * ! 18. Chaining Multiple Middleware Functions
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (learn to chain multiple middleware fns to a route)
 * 
 * - till now we have passed only one middleware fn
 * - for below given example.. we passed only "createTour" as a middleware fn 
 *    createTour will only be called when we get a POST request via a URL!
 * 
 * ? why shall we chain multiple middleware fns ?
 * [ex]
 * ----
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
 * 
 * 
 * - if we wanted to run a middleware before createTour to check data that is coming.. 
 *    - for the above POST req.. we can check "does req.body contain data that we wanted or not?"
 * 
 * [code]
 * ------
// >>> tourRoutes.js
---
router
  .route("/")     // #1
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);   // #2

// >>> tourController.js    
---
// middleware: check req.body!
exports.checkBody = (req, res, next) => {     |
  if (!req.body.name || !req.body.price) {    | ... placed at top of the code
    return res.status(400).json({
      status: "fail",
      message: "Missing name OR price fields",
    });
  }
  next();
};
 * 
 * 
 * >>> Flow of execution
 * #1 
 * - URL request hits "/"
 * [checks that req is POST or not]
 * 
 * #2
 * - if it is POST-req.. then it goes into middleware-first
 *    - at [(!req.body.name || !req.body.price)] checks for the data
 * 
 * [if data is there]
 *    - request reaches "createTour" a-route-handler cause "next" will be called! 
 * [if not]
 *    - function will be returned
 * 
 * 
 * $ NOTE
 * - status-code: 500 >>> INTERNAL SERVER ERROR
 * 
 * 
 * ! 19. Serving Static Files
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-
 * (learn to serve static files using express)
 * 
 * ? what are static files ?
 * - files which are inside file-system / project-folder
 * [but we cannot access them using routes]
 * 
 * - mostly static HTML files will be present inside public-folder of our project
 *    - so we cannot use "/public/index.html" route to access the index-file that was kept inside 'public'
 * 
 * [cause] we did not define a route yet!
 * >>> if we want to access something from our file-system.. we need to use built-in Express Middleware 
 * 
 * [code]
 * ------
// >>> app.js
---
// serving-static-files
app.use(express.static("./public/overview.html"));
OR
app.use(express.static(`${__dirname}/public/overview.html`));
 * 
 * 
 * - __dirname indicates current directory! [./]
 *    - URL that we have to request data for: "/index.html"
 * [file_name can be not only 'index' but anything]
 * 
 * - URL: localhost:8080/index.html
 * 
 * ? why don't we need "/public/index.html" but only "/index.html" ?
 * [cause]
 * - if we requested a URL.. express sends a request
 *    - if express can't find in any of our routes.. express look into PUBLIC-folder 
 * [basically express sets public to root (root === public-folder)]
 * 
 * - [folder/file structure]
 * public/overview.html >>> HTML file that would be rendered!
 * public/css           >>> css-folder contains styles
 * public/img           >>> img-folder contains images
 * 
 * - we cannot request for folders  >>> "/img"
 * - we can only req for files      >>> "/overview.html" OR "/index.html"
 * 
 * $ SUMMARY
 * - we can now server static files from a FOLDER but not form a ROUTE
 * 
 * 
 * ! 20. Environment Variables
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * - node OR express apps can run in different environments.. 
 *    - most imp [dev and prod] 
 * 
 * - every settings such as: [debugging, logging, database selection]
 *    - might change depending on type of development we are in 
 * 
 * - using different diff databases and logging on or off depends upon.. 
 *    - are based on ENVIRONMENT VARIABLES!
 * 
 * * ENVIRONMENT VARIABLES
 * - these are global variables that are used to define the environment in which the NODE APP is running!
 * 
 * [DEMO]
 * - to know which environment we are in presently.. we use 
 *    - app.get("env") and log it to the console!
 * [this "env" variable is set by express!]
 * 
 * - to know different variables that are set.. 
 *    - use.. console.log(process.env)
 * 
 * [where a bunch of environment variables which were set will be logged to console!]
 * - where node uses most of them internally!
 * 
 * - these different variables comes from PROCESS-core module
 *    - and these are set when PROCESS has started!
 * [this PROCESS is available everywhere and it is global]
 * 
 * >>> set an environment-variable
 * [inside terminal-current working directory]
 * 
 * - we need to prepend that variable to command "nodemon server.js" 
 * [command.. which is used to start server]
 * 
 * #1 way: using TERMINAL
 * ---
 * - NODE_ENV=development nodemon server.js
 * [and start the process..]
 * (we have to change this to production when we are set to deployment!)
 * 
 * - NODE_ENV=development X=23 nodemon server.js
 * 
 * >>> configuration using environment-variables
 * - we could change the database for different environments.. 
 *    - activate them based on that environment!
 * 
 * - we could set [sensitive-data] passkey/passwords || API-keys || user-names 
 *    - using this env-var
 * 
 * #2 using CONFIGURATION FILE
 * ---
 * - create a file "config.env" 
 * [.env extension is used for a file to define env-var] 
 * 
 * - and we define following variables inside that file..
NODE_ENV=development
PORT=8080
USERNAME=jonas
 * 
 * 
 * ? but how do we use them with our application ?
 * ---
 * - to read these defined variables and use them into out app..
 *    - we use npm package called: "dotenv"
 * 
 * [installation]
 * => npm install dotenv
 * 
 * - to read inside a file [server.js]
 * [code]
 * ------
// >>> server.js
---
const dotenv = require("dotenv");       // - require/import npm module
dotenv.config({ path: "./config.env" });      // #1

const app = require("./app");

// read env-var to console
// console.log(process.env);      // #2

// 1. LISTENING TO SERVER / START SERVER
const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
 * 
 * 
 * # 1.
 * dotenv.config({ path: "./config.env" })
 * - this line reads defined variables in the path specified 
 *    - and saves them into NODE.JS env-variables
 * 
 * [order is imp]
 * - dotenv.config() 
 *    - this has to be done before importing/requiring "app"
 * [cause]
 * - we cannot read env-variables inside app.js CAUSE it is not CONFIGURED yet!
 * 
 * >>> to read variables
 * # 2.
 * console.log(process.env)
 * - this is used to log every env-variable to console!
 * 
 * >>> to use variable
 * - [demonstrated how to run code depending on when we are on production/development environments]
 * [code]
 * ------
// >>> app.js:
---
const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// - using env-variables here...
if (process.env.NODE_ENV === "development") {     // #1
  app.use(morgan("dev"));                         // ... CODE INSIDE HERE ... will only run if dev-env is satisfied [if only we are working in..!]
}

// - body-parser
app.use(express.json());

// - serving-static-files
app.use(express.static(`${__dirname}/public/overview.html`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
--------------------------------------------------------------------------------
// >>> server.js
---
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });    |
const app = require("./app");               | ... order is important!

// read env-var to console
// console.log(process.env);      // - reading from TERMINAL

const port = process.env.PORT || 3000;      // - using environment variables here ... 
app.listen(port, () => {  
  console.log(`server up and running on: ${port}`);
});
 * 
 * 
 * ? how are these env-var available inside app.js file ?
 * --- 
 * - as we defined them inside server.js file using: "dotenv.config({ path: "./config.env" })"
 * 
 * - as reading of variables is done inside server [even once]
 *    - so they are registered inside "PROCESS" [even this process is done once]
 * 
 * - as PROCESS is available and same for every file
 *    - that's why we get access to these variables inside "app.js" file
 * [usually these variables are available inside every file inside project!]
 * 
 * 
 * * CONFIGURING PACKAGE.JSON:
 * ---
 * [modified]
 * ----------
"scripts": {
  "start:dev": "nodemon server.js", 
  "start:prod": "NODE_ENV=production nodemon server.js"
},
 * 
 * 
 * - here we had modified "scripts" so that we can work inside diff environments!
 *    - just have to change command to start application inside TERMINAL use... 
 *        - "npm run start:dev"   >>> to start development env!
 *        - "npm run start:prod"  >>> to start production env!
 * 
 * [if it is simple start-script: then no need of "run" inside >>> "npm start"]
 * 
 * $ NOTE
 * - so many packages that we use for express-development depends upon this environment variable
 * 
 * ! 21. Setting up ESLint + Prettier in VS Code
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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
