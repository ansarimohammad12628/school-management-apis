const winston = require("winston");
const winstonDailyRotateFile = require("winston-daily-rotate-file");
const moment = require("moment");
const path = require("path");

const customTimestamp = winston.format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  } else {
    info.timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  }

  return info;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    customTimestamp({ tz: "Asia/Kolkata" }),
    winston.format.json(),
  ),
  transports: [
    new winstonDailyRotateFile({
      filename: "combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "info",
      dirname: path.join(__dirname + "../../../logs"),
      maxFiles: "7d",
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      customTimestamp({ tz: "Asia/Kolkata" }),
      winston.format.json(),
    ),
    level: "error",
  }),
);

module.exports = logger;
