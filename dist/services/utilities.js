"use strict";
const crypto = require("crypto");
const fs = require("fs");
const uuid = require("uuid");
const cryptoOptions = {
    saltLen: 32,
    encoding: "hex",
    iterations: 25000,
    keylen: 512,
    digest: "SHA1"
};
function ttlScheduller(onTimeExpire, timeout = 5000) {
    setTimeout(onTimeExpire.bind(null), timeout);
}
exports.ttlScheduller = ttlScheduller;
function tokenStorage({ ttl = 5000 } = {}, UniqueStorage = Set, ...tokens) {
    const Storage = new UniqueStorage(tokens);
    let tokenT = null;
    setTimeout(() => console.log(Storage.has(tokenT)), ttl + 1000);
    return (token = generateUUIDV1()) => {
        tokenT = token;
        Storage.add(token);
        ttlScheduller(() => Storage.delete(token), ttl);
        console.log(Storage.has(tokenT));
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
function generateUUIDV1() {
    return uuid.v1();
}
exports.generateUUIDV1 = generateUUIDV1;
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
