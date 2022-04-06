import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { AppConfigService } from '../services/app-config.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private appConfigService: AppConfigService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.appConfigService.getTokenValue();

    if (token) {

      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // if (req.url.includes("/api/v1/attachment")) {
      //   req = req.clone({
      //     setHeaders: {
      //       'Authorization': `Bearer ${token}`,
      //     },
      //     withCredentials: true
      //   })
      // }else{
      //   req = req.clone({
      //     setHeaders: {
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     }
      //   })
      // }
      // headersConfig['Authorization'] = `Bearer ${token}`;
    }
    // const request = req.clone({ setHeaders: headersConfig });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['session-timeout']);
        }
        else {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
