
export interface IAdminData {
    name: string;
    id: string | boolean;
    role?: 'E';
}

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
  orders: Array<IPortUserOrder>;
  timemark: string;
}

export interface IPortSocketInfo {
  lastTimestamp: number;
  adminId: string | boolean;
}

// FileStorage response
export interface IFileAttr {
  type: 'files';
  id: string;
  attributes: {
    fileSize: number;
    // isInPublic: boolean;
    locationFlag: 'S' | 'O' | 'P';
    fileName: string;
  };
  links: {
    self: string;
  };
};
export interface IFileStoragePortResponse {
  links: {
    self: string;
  };
  data: Array<IFileAttr>;
}

export interface IFileEntity {
    attributes: {
      fileSize: number;
      fileName: string;
      // isInPublic: boolean;
      locationFlag: 'S' | 'O' | 'P';
    };
    id: string;
    type: 'files';
    links: {
      self: string;
    };
}

// Customize component SelectedTabService

export interface IMenuSubTab {
    tabName: string;
    _name: string;
    ico: string;
    isActive: boolean;
}
export interface IMenuTab {
    header: string;
    _name: string;
    ico: string;
    children: Array<IMenuSubTab>;
}
