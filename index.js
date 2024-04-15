const mongoose = require("mongoose");
const app = require("./app");
// const config = require("./config/config");

let server;
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info("Connected to MongoDB");
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });
// });


 app.listen(8000, () => {
    console.log(`Listening to port 8000`);
  });
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// server()

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
