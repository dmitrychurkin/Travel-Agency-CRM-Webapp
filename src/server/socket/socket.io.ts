import * as io from "socket.io";
import { Server } from "http";
import { ordersController, adminController } from "../controllers";
import { IPortSocketInfo, IPortUserOrder } from "../interfaces";
import ServerConfig from "../serverConfig";

export class IO {
    static createSocketIOServer(server: Server): IO {
        return new IO(server);
    }
    socketIOServer: SocketIO.Server;
    socketIO_OrdersNSP: SocketIO.Namespace;

    private constructor(server: Server) {
        this.socketIOServer = io(server);
        this.socketIO_OrdersNSP = this.socketIOServer.of("/orders");
        this.setListeners();
    }
    private setListeners(): void {

        this.socketIO_OrdersNSP.on("connection", async (socket: SocketIO.Socket) => {
            try {
                socket.on("disconnect", () => {
                    return adminController.updateOnDisconnect(socket.id);
                });
                const sessionTokenCookie = `${ServerConfig.SESSION_TOKEN_NAME}=`;
                const expectedSessionToken = socket.request.headers.cookie.split("; ").filter((cookie: any) => cookie.includes(sessionTokenCookie))[0];
                const sessionToken = expectedSessionToken && expectedSessionToken.split(sessionTokenCookie)[1];
                socket.once("READY", async(socketPortInfo: IPortSocketInfo, fn: (a?: any) => void) => {
                    try {
                         await adminController.updateSocketIdOnConn(sessionToken, socket.id);

                        ordersController.selectOrdersForAdminAsync(socketPortInfo)
                                    .then(fn)
                                    .catch((err: string) => {
                                        console.log("ordersController.selectOrdersForAdminAsync err=>", err);
                                        fn({error: true});
                                    });

                    }catch (err) { console.log("Error in setListeners", err); }

                });
                socket.on("ORDERS_TO_DELETE", (arrayOfIdsToRemove: Array<string>, fn: (a?: any) => void) => {
                    ordersController.deleteOrdersByAdminAsync(arrayOfIdsToRemove)
                                    .then(() => fn({ ok: true }))
                                    .catch(err => {
                                        console.log(err);
                                        fn({ ok: false });
                                    });
                });
                await adminController.updateSocketIdOnConn(sessionToken, socket.id);

            }catch (err) { console.log("Error in setListeners", err); }
        });
    }
    emitOnNewOrder(adminId: string, socketId: string, order: IPortUserOrder) {
        this.socketIO_OrdersNSP.to(socketId).emit(`NEW_ORDER_FOR_${adminId}`, order);
    }
    emitOnUserCanceledOrder(adminId: string, socketId: string, orderId: string) {
        this.socketIO_OrdersNSP.to(socketId).emit(`CANCEL_ORDER_FOR_${adminId}`, orderId);
    }
}
