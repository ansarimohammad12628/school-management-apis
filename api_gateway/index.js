const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env " });

const proxy = require("express-http-proxy");
const os = require("os");
const path = require("path");

const app = express();
const logger = require("./logger");
const { monitorCpu } = require("./cpuMonitor");

app.use(cors());

process.env.TZ = "Asia/Kolkata";
app.use("/storage", express.static(path.join(__dirname, "../public")));
console.log(path.join(__dirname, "../public"));

monitorCpu();

app.use((req, res, next) => {
  const freeMen = os.freemem();
  const totalMen = os.totalmem();
  const usedMen = totalMen - freeMen;
  const memoryUsagePercent = (usedMen / totalMen) * 100;
  const loadAvg = os.loadavg();

  const logMessage = `API: ${req.originalUrl} | Method: ${req.method} | Memory: ${memoryUsagePercent.toFixed(2)}% CPU Load(1m): ${loadAvg[0].toFixed(2)}`;

  if (memoryUsagePercent > 80 || loadAvg[0] > 50) {
    logger.warn(`HIGH USAGE DETECTED => ${logMessage}`);
  } else {
    logger.info(logMessage);
  }
  console.log(req.originalUrl + " : " + req.method);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS, FETCH",
  );

  next();
});

app.use("/api/admin", proxy("http://localhost:7010", { limit: "3mb" }));
// app.use("/api/user", proxy("http://localhost:7020", { limit: "3mb" }));

const port = 2000;
app.listen(port, () => {
  console.log(`Gateway is Listening to Port ${port} (HTTP)`);
});
