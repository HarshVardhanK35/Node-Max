const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// read env-var to console
// console.log(process.env);

// 1. LISTENING TO SERVER / START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server up and running on: ${port}`);
});
