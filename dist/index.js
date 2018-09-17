"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const { express, server } = app_1.default;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const PORT = function (portNumber) {
    const portValue = parseInt(portNumber, 10);
    if (isNaN(portValue)) {
        return portNumber;
    }
    if (portValue >= 0) {
        return portValue;
    }
    return false;
}(process.env.PORT || "3000");
let debug = null;
if (isDevelopment) {
    debug = require("debug")("tester-bundler:server");
}
express.set("port", PORT);
server.listen(PORT);
server.on("error", (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    let bind = typeof PORT === "string"
        ? "Pipe " + PORT
        : "Port " + PORT;
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
    typeof debug === "function" && debug("Listening on " + bind);
});
