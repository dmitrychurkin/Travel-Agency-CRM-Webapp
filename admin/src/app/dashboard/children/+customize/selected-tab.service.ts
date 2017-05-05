import { Injectable } from '@angular/core';

@Injectable()
export class SelectedTabService {
    static listOfTabs = [
        {
            service: {
                header: 'General Site Settings',
                name: 'skype'
            }
        },
        {
            service: {
                header: 'Administrators Managment',
                name: 'admin managment system'
            }
        },
        {
            service: {
                header: 'File Storage Manager',
                name: 'file uploads'
            }
        }
    ];
    currentlySelectedTab = { service: { name: 'intro' } };
    // constructor() {
    //     console.log('Service SelectedTab created');
    // }
}
