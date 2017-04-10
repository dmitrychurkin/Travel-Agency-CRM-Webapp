export class AuthenticationError extends Error {
    status?: number;
    constructor(message?: string) {
        super(message);
        const ctr = new.target;
        Error.captureStackTrace && Error.captureStackTrace(this, ctr);
        this.name = ctr.name;
        this.message = message || "";
    }
}