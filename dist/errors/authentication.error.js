"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        const ctr = new.target;
        Error.captureStackTrace && Error.captureStackTrace(this, ctr);
        this.name = ctr.name;
        this.message = message || "";
    }
}
exports.AuthenticationError = AuthenticationError;
