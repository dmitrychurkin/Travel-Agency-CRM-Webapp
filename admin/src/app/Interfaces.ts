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

export interface IPortUserOrder {
  // _id: string;
  arrive_date: string;
  dep_date: string;
  destination: string;
  email: string;
  phone: string;
  last_name: string;
  first_name: string;
  service: 'Air ticketing and reservation' |
            'Travel insurance' |
            'Visa assist' |
            'Consular services' |
            'World wide hotel booking' |
            'Incentive group travel' |
            'Honeymoon packages' |
            'Family packages' |
            'Holiday packages' |
            'Pilgrimage packages';
  class: 'First' | 'Econom' | 'Business';
  remarks: string;
  infant_num: number;
  child_num: number;
  adult_num: number;
  timestamp: number;
  orderId: string;
  isCanDelete?: boolean;
}
export interface IOrdersData {
  // header: string;
  orders: Array<IPortUserOrder>;
  timemark: string;
}

export interface IPortSocketInfo {
  lastTimestamp: number;
  adminId: string | boolean;
}
