"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
class IO {
    static createSocketIOServer(server) {
        return new IO(server);
    }
    constructor(server) {
        this.socketIOServer = io(server);
        this.setListeners();
    }
    setListeners() {
        this.socketIOServer.on("connection", (socket) => {
            this.socketIOSocket = socket;
        });
    }
}
exports.IO = IO;
