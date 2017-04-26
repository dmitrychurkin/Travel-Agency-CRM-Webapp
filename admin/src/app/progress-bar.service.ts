import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProgressBarService {
    emmiter = new EventEmitter<boolean>(true);
}
