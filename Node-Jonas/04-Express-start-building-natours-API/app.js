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
