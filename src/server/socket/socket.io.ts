import * as io from "socket.io";
import { Server } from "http";
export class IO {
    static createSocketIOServer(server: Server): IO {
        return new IO(server);
    }
    socketIOServer: SocketIO.Server;
    socketIOSocket: SocketIO.Socket;
    private constructor(server: Server) {
        this.socketIOServer = io(server);
        this.setListeners();
    }
    private setListeners(): void {
        this.socketIOServer.on("connection", (socket: SocketIO.Socket) => {
            this.socketIOSocket = socket;
            // console.log(socket.request.headers);
            // socket.emit("test", "Hello World");
        });
    }
}
