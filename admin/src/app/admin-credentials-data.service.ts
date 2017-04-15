import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import { Response } from '@angular/http';
import { BackendService } from './backend.service';
import { AdminCredentialsStorageService } from './admin-credentials-storage.service';
import { GET_ADMIN_INFO } from './app.config';
import {IAdminData, IRequestForRegistration} from './Interfaces';

@Injectable()
export class AdminCredentialsDataResolver implements Resolve<IAdminData> {
  static adminData: IAdminData | IRequestForRegistration;
  constructor(
    private backendService: BackendService,
    private storageService: AdminCredentialsStorageService
    ) {}
  clearAdminData() {
    if (this.storageService.Storage) {
      return this.storageService.Storage.removeItem('adminData');
    }
    delete AdminCredentialsDataResolver.adminData;
  }
  getAdminData(): IAdminData | IRequestForRegistration {
    return this.storageService.Storage ?
          JSON.parse(this.storageService.Storage.getItem('adminData')) :
          AdminCredentialsDataResolver.adminData;
  }
  setAdminData(data: IAdminData | IRequestForRegistration) {
    if (this.storageService.Storage) {
      this.storageService.Storage.setItem('adminData', JSON.stringify(data));
    }else {
      AdminCredentialsDataResolver.adminData = data;
    }
  }
  resolve(): Promise<any>|any {
    if (this.storageService.Storage) {
      if (this.storageService.Storage.adminData) {
        return JSON.parse(this.storageService.Storage.getItem('adminData'));
      }
      return this.backendService.sendRequest(GET_ADMIN_INFO)
                  .then((response: Response) => {
                    const adminData = response.text();
                    this.storageService.Storage.setItem('adminData', adminData);
                    return JSON.parse(adminData);
                  })
                  .catch(err => {
                    const adminData = {name: 'Admin!', id: false};
                    this.storageService.Storage.setItem('adminData', JSON.stringify(adminData));
                    return adminData;
                  });
    }else {
      if (AdminCredentialsDataResolver.adminData) {
        return AdminCredentialsDataResolver.adminData;
      }
      return this.backendService.sendRequest(GET_ADMIN_INFO)
                         .then((response: Response) => {
                            AdminCredentialsDataResolver.adminData = response.json();
                            return AdminCredentialsDataResolver.adminData;
                          })
                          .catch(err => {
                            AdminCredentialsDataResolver.adminData = {name: 'Admin!', id: false};
                            return AdminCredentialsDataResolver.adminData;
                          });
    }
  }
}
