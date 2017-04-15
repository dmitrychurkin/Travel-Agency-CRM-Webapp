// import {RequestMethod, Headers} from '@angular/http';
export interface IAdminData {
    name: string;
    id: string | boolean;
    role?: 'E';
}
// export interface RequestCustomArgs {
//   method: RequestMethod | string;
//   body: any;
//   headers: Headers;
//   withCredentials: boolean;
// }
// export type RequestCustomConfig =
// (method?: RequestMethod | string, body?: any, contentType?: { [i: string]: string }) => RequestCustomArgs;
export interface IRequestForRegistration {
  r: boolean;
  canEdit?: boolean;
}
export interface IRegistrationCredentials {
  userName: string;
  pass: string;
  repeatPass: string;
  role: 'E' | 'O';
}
export interface IAdminSignInCredentials {
  userName: string;
  pass: string;
}
