const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {service: "service"},
  transports: [
    new winston.transports.File({filename: "error.log", level: "error"}),
    new winston.transports.File({filename: "combined.log"}),
    new winston.transports.Console({
      level: "verbose"
    })
  ]
});

module.exports = logger;
