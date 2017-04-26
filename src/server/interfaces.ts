export interface IPortUserOrder {
  _id: string;
  arrive_date: string;
  dep_date: string;
  destination: string;
  email: string;
  phone: string;
  last_name: string;
  first_name: string;
  service: "Air ticketing and reservation" |
            "Travel insurance" |
            "Visa assist" |
            "Consular services" |
            "World wide hotel booking" |
            "Incentive group travel" |
            "Honeymoon packages" |
            "Family packages" |
            "Holiday packages" |
            "Pilgrimage packages";
  class: "First" | "Econom" | "Business";
  remarks: string;
  infant_num: number;
  child_num: number;
  adult_num: number;
  timestamp: number;
  orderId: string;
}
export interface IPortOrder {
    info: string;
    reqId: string;
}
export interface IPortOnAdminSession {
    name: string; // admin name
    id: string; // hashed _id (session token)
    role?: "E"; // role (only if Editor),
}
export interface IPortSocketInfo {
  lastTimestamp: number;
  adminId: string | boolean;
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

export interface IUpdatePayload {
    ok: number;
    nModified: number;
    n: number;
}