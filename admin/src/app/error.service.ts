import { Injectable, EventEmitter, ErrorHandler } from '@angular/core';

export const errorMessages = {
    load: 'Network problem! Check your connection'
};

@Injectable()
export class ErrorEmmiter {
    emmiter = new EventEmitter<any>(true);
}

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(private errorEmiter: ErrorEmmiter) {}
    handleError(error) {
        console.error(error);
        if (error.message.toLowerCase().includes('load')) {
            this.errorEmiter.emmiter.emit(errorMessages.load);
        }
    }
}

