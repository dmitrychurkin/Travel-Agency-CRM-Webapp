import { Injectable, EventEmitter } from '@angular/core';
import { async } from 'rxjs/scheduler/async';

@Injectable()
export class ProgressBarService {
    emmiter = new EventEmitter<boolean>(true);
    autoStop(timeout= 1) {
        this.emmiter.emit(true);
        async.schedule(() => this.emmiter.emit(false), timeout * 1000);
    }
}
