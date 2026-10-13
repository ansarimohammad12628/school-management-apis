const express = require("express");
const app = express();

// app.use((req, res, next) => {
//   console.log("BACKEND HIT:", req.method, req.originalUrl);
//   next();
// });

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: __dirname + "/.env" });

const morgan = require("morgan");
app.use(morgan("combined"));

const routes = require("./App/Routes/allRoutes");

process.env.TZ = "Asia/Kolkata";
app.use("/storage", express.static("public"));
console.log(path.join(__dirname, "../public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "3mb",
  }),
);

let cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS, FETCH",
  );

  next();
});

app.use("/", routes);

app.use((error, req, res, next) => {
  if (!error) {
    return next();
  }

  res.status(500).send({
    status: 0,
    message: "INTERNAL SERVER ERROR!",
    result: error.message,
  });
});

app.listen(process.env.SERVICE_PORT ? process.env.SERVICE_PORT : 7010, () => {
  console.log(
    `Server is running at port ${process.env.SERVICE_PORT ? process.env.SERVICE_PORT : 7010}`,
  );
});
