import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';
import { SHOW_HIDE } from '../shared/animations/show-hide.animation';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [SHOW_HIDE]
})
export class SnackbarComponent implements OnInit, OnDestroy {

  @Input() timeout: string = "10000";

  private _snackbarSubject$: Subject<void> = new Subject<void>();
  public message = "";
  show: boolean = false;

  constructor(public _snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this._snackbarService.onSnackbarMessage()
      .pipe(takeUntil(this._snackbarSubject$))
      .subscribe(message => {
        this.show = true;
        this.message = message;
        this.timeout = this._snackbarService.timeoutVal;
        let that = this;
        setTimeout(function () {

          that.show = false;
          let nodes: any = document.getElementsByTagName("snackbar");
          while (nodes[0]) {
            nodes[0].parentNode.removeChild(nodes[0]);
          }
        }, parseInt(that.timeout))
      });
  }

  onSnackbarClose(): void {
    this.show = false;
  }
  ngOnDestroy(): void {
    this._snackbarSubject$.next();
    this._snackbarSubject$.complete();
  }
}
