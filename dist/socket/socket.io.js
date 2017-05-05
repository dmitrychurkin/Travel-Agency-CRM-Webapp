"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const io = require("socket.io");
const controllers_1 = require("../controllers");
const serverConfig_1 = require("../serverConfig");
class IO {
    static createSocketIOServer(server) {
        return new IO(server);
    }
    constructor(server) {
        this.socketIOServer = io(server);
        this.socketIO_OrdersNSP = this.socketIOServer.of("/orders");
        this.setListeners();
    }
    setListeners() {
        this.socketIO_OrdersNSP.on("connection", (socket) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                socket.on("disconnect", () => {
                    return controllers_1.adminController.updateOnDisconnect(socket.id);
                });
                const sessionTokenCookie = `${serverConfig_1.default.SESSION_TOKEN_NAME}=`;
                const expectedSessionToken = socket.request.headers.cookie.split("; ").filter((cookie) => cookie.includes(sessionTokenCookie))[0];
                const sessionToken = expectedSessionToken && expectedSessionToken.split(sessionTokenCookie)[1];
                socket.once("READY", (socketPortInfo, fn) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        yield controllers_1.adminController.updateSocketIdOnConn(sessionToken, socket.id);
                        controllers_1.ordersController.selectOrdersForAdminAsync(socketPortInfo)
                            .then(fn)
                            .catch((err) => {
                            console.log("ordersController.selectOrdersForAdminAsync err=>", err);
                            fn({ error: true });
                        });
                    }
                    catch (err) {
                        console.log("Error in setListeners", err);
                    }
                }));
                socket.on("ORDERS_TO_DELETE", (arrayOfIdsToRemove, fn) => {
                    controllers_1.ordersController.deleteOrdersByAdminAsync(arrayOfIdsToRemove)
                        .then(() => fn({ ok: true }))
                        .catch(err => {
                        console.log(err);
                        fn({ ok: false });
                    });
                });
                yield controllers_1.adminController.updateSocketIdOnConn(sessionToken, socket.id);
            }
            catch (err) {
                console.log("Error in setListeners", err);
            }
        }));
    }
    emitOnNewOrder(adminId, socketId, order) {
        this.socketIO_OrdersNSP.to(socketId).emit(`NEW_ORDER_FOR_${adminId}`, order);
    }
    emitOnUserCanceledOrder(adminId, socketId, orderId) {
        this.socketIO_OrdersNSP.to(socketId).emit(`CANCEL_ORDER_FOR_${adminId}`, orderId);
    }
}
exports.IO = IO;
