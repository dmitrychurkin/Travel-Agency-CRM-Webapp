import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {IAdminData, IRequestForRegistration} from './Interfaces';

@Injectable()
export class AdminCredentialsDataResolver implements Resolve<IAdminData> {
  static adminData: IAdminData | IRequestForRegistration;

  resolve(): Promise<any>|any {
    return AdminCredentialsDataResolver.adminData;
  }

}
