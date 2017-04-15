export interface UserOrder {

}
export interface IRegistrationAdminInfo {
    userName: string;
    pass: string;
    role: "E" | "O";
}

export interface IVerifyPayloadJWT {
    iat: number;
    exp: number;
    sub: string;
}

// export interface IIssuedPayloadJWT {
//     jwt: string;
// }

export interface IDocOnAdminSingin {
    password: string;
    passwordSalt: string;
    name: string;
    role: "E" | "O";
}
export interface IDocOnAdminRegister {
    name: string;
    role: "E" | "O";
}