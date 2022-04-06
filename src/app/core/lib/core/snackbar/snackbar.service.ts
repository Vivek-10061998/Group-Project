import { ComponentFactory, ComponentFactoryResolver, Injectable, Injector, ApplicationRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackbarMessageSource: Subject<string>
  public timeoutVal = "10000";

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {
    this._snackbarMessageSource = new Subject<string>();
  }

  public show(message: string, timeout: string = "10000"): void {
    const snackbar = document.createElement('snackbar');
    this.timeoutVal = timeout;
    // snackbar.setAttribute('ng-reflect-timeout',timeout.toString());
    const snackbarFactory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(SnackbarComponent);
    const snackbarref = snackbarFactory.create(this.injector, [], snackbar);
    this.applicationRef.attachView(snackbarref.hostView);
    document.body.appendChild(snackbar);
    setTimeout((e: any) => {
      this.open(message);
    }, 0);

  }

  public open(message: string): void {
    this._snackbarMessageSource.next(message);
  }


  public onSnackbarMessage(): Observable<string> {
    return this._snackbarMessageSource.asObservable();
  }
}
