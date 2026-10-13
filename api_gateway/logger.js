const {createLogger,format ,transport, transports } = require ("winston");
require("winston-daily-rotate-file");
const path = require ("path");
// const { info } = require("console");

const dailRotateFileTransport = new  transports.DailyRotateFile({
    filename:path.join(__dirname, "logs","gateway-%DATE%.log"),
    datePattern:"YYYY-MM-DD",
    zippedArchive:true,
    maxFiles:"14d",
})

const logger = createLogger({
    level:"info",
    format:format.combine(
        format.colorize({all: true}),
        format.timestamp({format: "YYYY-MM-DD HH:MM:SS" }),
        format.printf(
            (info) => `${info.timestamp} [${info.level}]: ${info.message}`
        ),
    ),
    transports: [ new transports.Console(), dailRotateFileTransport]
});

module.exports = logger ;