import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ErrorEmmiter } from './error.service';

import { ProgressBarService } from './progress-bar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    style: 'display: block;z-index:0;position:relative;'
  }
})
export class AppComponent implements OnInit, OnDestroy {
  private _sub_progBar: Subscription;
  private _sub_err: Subscription;
  public isActive: boolean;
  private _timemarkInitial: number;
  constructor(
    private snackBar: MdSnackBar,
    private errorEmmiterService: ErrorEmmiter,
    private progressBarService: ProgressBarService
  ) {}
  ngOnInit() {
    this._sub_progBar = this.progressBarService.emmiter.subscribe(
      (value: boolean) => {
        if (value) {
          this._timemarkInitial = Date.now();
          this.isActive = value;
        }else {
          const period = Date.now() - this._timemarkInitial;
          if (period <= 1000) {
            setTimeout(() => this.isActive = value, 1000 - period);
          }else {
            this.isActive = value;
          }
        }
      }
    );
    this._sub_err = this.errorEmmiterService.emmiter.subscribe(
          message => this.snackBar.open(message || 'Error occured!', 'Ok', { duration: 3000 })
        );
  }
  ngOnDestroy() {
    this._sub_err.unsubscribe();
    this._sub_progBar.unsubscribe();
  }
}
