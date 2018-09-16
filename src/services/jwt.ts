import * as jwt from "jsonwebtoken";
import ServerConfig from "../serverConfig";
import { IVerifyPayloadJWT } from "../interfaces";
function setJwtOpts(subject: { subject: string }) {
    return Object.assign({}, ServerConfig.JWT_OPTIONS_FOR_ISSUE, subject);
}
export function issueTokenJWTAsync(jwtOptions: { subject: string }, payload= {}): Promise<string> {
    const optionsJwt = setJwtOpts(jwtOptions);
    return new Promise( (resolve, reject) => jwt.sign(payload, ServerConfig.SECRET_JWT, optionsJwt, (err, token) => err ? reject(err) : resolve(token)) );
}
export function verifyTokenJWTAsync(token: string, subject= {}): Promise<IVerifyPayloadJWT> {

        const Options: jwt.VerifyOptions = Object.assign(ServerConfig.JWT_OPTIONS_FOR_VERIFICATION, subject);

        return new Promise( (resolve, reject) => jwt.verify(token, ServerConfig.SECRET_JWT, Options, (err, decoded) => err ? reject(err) : resolve(decoded)) );
}
export function decodeTokenJWTSync(tokenJWT: any) {

    const decodedJWTTokenObj = jwt.decode(tokenJWT, { complete: true });

    if ( decodedJWTTokenObj && decodedJWTTokenObj.header && decodedJWTTokenObj.payload ) {
        return decodedJWTTokenObj;
    }
}