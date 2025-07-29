const express = require("express");
const morgan = require("morgan");

// routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1. MIDDLEWARES
// 3rd-party middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body-parser
app.use(express.json());

// serving-static-files
app.use(express.static(`${__dirname}/public/overview.html`));

// defined middlewares
app.use((req, res, next) => {
  // console.log("Hello from middleware");
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
