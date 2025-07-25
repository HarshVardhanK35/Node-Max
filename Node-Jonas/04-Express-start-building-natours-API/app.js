const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// 1. MIDDLEWARES

// 3rd-party middlewares
app.use(morgan(""));

// body-parser
app.use(express.json());

// defined middlewares
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTE HANDLERS

/////////////////////////////////////////////////////////////////
// 2.1 Tour-route-handlers

const getAllTours = (req, res) => {
  // get-all-tours
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// GET a-tour [with Id]
const getTour = (req, res) => {
  // const id = req.params.id * 1;
  const id = Number(req.params.id); // console.log(id)

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
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

// POST create-a-tour
const createTour = (req, res) => {
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

// PATCH update a field
const updateTour = (req, res) => {
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
};

// DELETE delete a field
const deleteTour = (req, res) => {
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
};

///////////////////////////////////////////////////////////////
// 2.2 user-route-handlers

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

// 3. ROUTES
// - 
// 3.1 TOUR-ROUTES
const tourRouter = express.Router();

tourRouter.route("/api/v1/tours").get(getAllTours).post(createTour);
tourRouter
.route("/api/v1/tours/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

// 3.2 USER-ROUTES
const userRouter = express.Router();

app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4. LISTENING TO SERVER / START SERVER
const port = 8080;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
