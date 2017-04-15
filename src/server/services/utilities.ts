import * as crypto from "crypto";
import * as fs from "fs";
import * as uuid from "uuid";
import ServerConfig from "../serverConfig";

const cryptoOptions = {
    saltLen: 32,
    encoding: "hex",
    iterations: 25000,
    keylen: 512,
    digest: "SHA1"
};

export function ttlScheduller(onTimeExpire: () => void, timeout= 5000) {
    const id = setTimeout(onTimeExpire.bind(null), timeout);
    return id;
}

export function tokenStorage(UniqueStorage?: Map<string, number>, { ttl= 5000 }= {} /*...tokens: any[]*/) {
    let Storage: Map<string, number>;
    if (UniqueStorage) {
        Storage = UniqueStorage;
    }else {
        Storage = new Map();
    }
    // const Storage = new UniqueStorage(tokens);
    // test
    // let tokenT: any = null;
    // setTimeout(() => console.log(Storage.has(tokenT)), ttl + 1000);
    return (token: string= generateUUIDV1()) => {
        // test
        // tokenT = token;

        const TimerId = ttlScheduller(() => {
            if (Storage.has(token)) {
                Storage.delete(token);
            }
        }, ttl);
        Storage.set(token, TimerId);

        // test
        // console.log(Storage.has(tokenT));
        return token;
    };
}
export function encryptPwdAsync(password: string, salt: string, options= cryptoOptions): Promise<string> {
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
export function generateUUIDV1() {
    return uuid.v1();
}
export function generateRandStrAsync(lenght= 48, encoding= "hex"): Promise<string> {
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
export function writeFileAsync(pathToFile: string, fileContent: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathToFile, fileContent, err => {
            if (err) return reject(err);
            resolve(0);
        });
    });
}
export function readFileAsync(pathToFile: string, encoding= "utf-8") {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, encoding, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}
export function comparePwdsAsync(resolver?: (value?: {} | PromiseLike<{}> | undefined) => void, rejector?: (reason?: any) => void) {
    let helperFn = ( promiseLikeResulter: any, result: any, needThrow= false ) => {
        if ( typeof promiseLikeResulter === "function" ) {
            return promiseLikeResulter(result);
        }
        if ( needThrow ) throw result;
        return result;
    };
    return (hash: string, salt: string, password: string) => {
        return encryptPwdAsync(password, salt)
                        .then(encriptedHash => {
                            const RESULT = encriptedHash === hash;
                            return helperFn(resolver, RESULT);
                        })
                        .catch(err => helperFn(rejector, err, true));
    };
}

export const basicCookieSessOptions = {
    signed: true,
    httpOnly: true,
    sameSite: true
};
export const basicCookieJwtOptions = {
    signed: true,
    httpOnly: true,
    sameSite: true,
    maxAge: ServerConfig.JWT_MAX_AGE
};
// export const DefaultCookieOptionsForSession = (req: Request) => Object.assign(cookieOptsBasic, { expires: 0 }, req.secure ? { secure: true } : {});
// export const DefaultCookieOptionsForJwt = (req: Request) => Object.assign(cookieOptsBasic, { maxAge: ServerConfig.JWT_MAX_AGE }, req.secure ? { secure: true } : {});