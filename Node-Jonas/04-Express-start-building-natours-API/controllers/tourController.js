const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.checkID = (req, res, next, value) => {
  // console.log(`Tour id is: ${value}`);

  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "id not found!",
    });
  }
  next();
};

// middleware: check req.body!
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name OR price fields",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id); // console.log(tour);

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

// POST create-a-tour
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

// PATCH update a field
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

// DELETE delete a field
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
