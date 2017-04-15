import { Injectable } from '@angular/core';

@Injectable()
export class AdminCredentialsStorageService {
  Storage: any;
  constructor() {
    if ( 'sessionStorage' in window ) {
      this.Storage = window.sessionStorage;
    }else {
      this.Storage = null;
    }
   }

}
