import App from "./app";

const { express, server } = App;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const PORT = function(portNumber: string) {
  const portValue = parseInt(portNumber, 10);

  if (isNaN(portValue)) {
    // named pipe
    return portNumber;
  }

  if (portValue >= 0) {
    // port number
    return portValue;
  }

  return false;
}(process.env.PORT || "3000");

let debug: any = null;

if (isDevelopment) {
  debug = require("debug")("tester-bundler:server");
}

express.set("port", PORT);

server.listen(PORT);

server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof PORT === "string"
    ? "Pipe " + PORT
    : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  let addr = server.address();
  let bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);
});
