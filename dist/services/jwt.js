"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const serverConfig_1 = require("../serverConfig");
function setJwtOpts(subject) {
    return Object.assign({}, serverConfig_1.default.JWT_OPTIONS_FOR_ISSUE, subject);
}
function issueTokenJWTAsync(jwtOptions, payload = {}) {
    const optionsJwt = setJwtOpts(jwtOptions);
    return new Promise((resolve, reject) => jwt.sign(payload, serverConfig_1.default.SECRET_JWT, optionsJwt, (err, token) => err ? reject(err) : resolve(token)));
}
exports.issueTokenJWTAsync = issueTokenJWTAsync;
function verifyTokenJWTAsync(token, subject = {}) {
    const Options = Object.assign(serverConfig_1.default.JWT_OPTIONS_FOR_VERIFICATION, subject);
    return new Promise((resolve, reject) => jwt.verify(token, serverConfig_1.default.SECRET_JWT, Options, (err, decoded) => err ? reject(err) : resolve(decoded)));
}
exports.verifyTokenJWTAsync = verifyTokenJWTAsync;
function decodeTokenJWTSync(tokenJWT) {
    const decodedJWTTokenObj = jwt.decode(tokenJWT, { complete: true });
    if (decodedJWTTokenObj && decodedJWTTokenObj.header && decodedJWTTokenObj.payload) {
        return decodedJWTTokenObj;
    }
}
exports.decodeTokenJWTSync = decodeTokenJWTSync;
