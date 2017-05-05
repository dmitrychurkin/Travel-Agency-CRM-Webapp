"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("fs");
const uuid = require("uuid");
const serverConfig_1 = require("../serverConfig");
const cryptoOptions = {
    saltLen: 32,
    encoding: "hex",
    iterations: 25000,
    keylen: 512,
    digest: "SHA1"
};
function ttlScheduller(onTimeExpire, timeout = 5000) {
    const id = setTimeout(onTimeExpire.bind(null), timeout);
    return id;
}
exports.ttlScheduller = ttlScheduller;
function tokenStorage(UniqueStorage, { ttl = 5000 } = {}) {
    let Storage;
    if (UniqueStorage) {
        Storage = UniqueStorage;
    }
    else {
        Storage = new Map();
    }
    return (token = uuid.v1()) => {
        const TimerId = ttlScheduller(() => {
            if (Storage.has(token)) {
                Storage.delete(token);
            }
        }, ttl);
        Storage.set(token, TimerId);
        return token;
    };
}
exports.tokenStorage = tokenStorage;
function encryptPwdAsync(password, salt, options = cryptoOptions) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, options.iterations, options.keylen, options.digest, (err, hashRaw) => {
            if (err) {
                return reject(err);
            }
            let hash = Buffer.from(hashRaw.toString(), "binary").toString(options.encoding);
            resolve(hash);
        });
    });
}
exports.encryptPwdAsync = encryptPwdAsync;
function generateRandStrAsync(lenght = 48, encoding = "hex") {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(lenght, (err, buf) => {
            if (err) {
                return reject(err);
            }
            let salt = buf.toString(encoding);
            resolve(salt);
        });
    });
}
exports.generateRandStrAsync = generateRandStrAsync;
function writeFileAsync(pathToFile, fileContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathToFile, fileContent, err => {
            if (err)
                return reject(err);
            resolve(0);
        });
    });
}
exports.writeFileAsync = writeFileAsync;
function readFileAsync(pathToFile, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, encoding, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}
exports.readFileAsync = readFileAsync;
function comparePwdsAsync(resolver, rejector) {
    let helperFn = (promiseLikeResulter, result, needThrow = false) => {
        if (typeof promiseLikeResulter === "function") {
            return promiseLikeResulter(result);
        }
        if (needThrow)
            throw result;
        return result;
    };
    return (hash, salt, password) => {
        return encryptPwdAsync(password, salt)
            .then(encriptedHash => {
            const RESULT = encriptedHash === hash;
            return helperFn(resolver, RESULT);
        })
            .catch(err => helperFn(rejector, err, true));
    };
}
exports.comparePwdsAsync = comparePwdsAsync;
exports.basicCookieSessOptions = {
    httpOnly: true,
    sameSite: true
};
exports.basicCookieJwtOptions = {
    signed: true,
    httpOnly: true,
    sameSite: true,
    maxAge: serverConfig_1.default.JWT_MAX_AGE
};
function orderNormalizator(ORDER) {
    const orderDefaults = {
        orderId: uuid.v4(),
        timestamp: +new Date(),
        adult_num: 0,
        child_num: 0,
        infant_num: 0,
        remarks: "-",
        dep_date: new Date().toLocaleDateString("en-US"),
        arrive_date: new Date().toLocaleDateString("en-US"),
        class: "Econom"
    };
    const applyDefaults = (order) => Object.assign(orderDefaults, order);
    const outputToDB = applyDefaults(ORDER);
    delete outputToDB.ACTION;
    delete outputToDB.SITE_LANG;
    return outputToDB;
}
exports.orderNormalizator = orderNormalizator;
function moveFileAsync(fromPath, toPath) {
    return new Promise((resolve, reject) => {
        fs.rename(fromPath, toPath, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
exports.moveFileAsync = moveFileAsync;
function isThisObjectSync(...args) {
    for (const arg of args) {
        if (typeof arg !== "object") {
            return false;
        }
    }
    return true;
}
exports.isThisObjectSync = isThisObjectSync;
