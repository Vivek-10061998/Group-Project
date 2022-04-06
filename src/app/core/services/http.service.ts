import { Injectable, ɵConsole } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from 'rui';
import { Response } from 'src/app/core/models/response.model';
import { SnackbarService } from 'rui';

@Injectable()
export class HttpService {

  requestErrorMessage: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private snackbarService: SnackbarService
  ) { }


  private formatErrors(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      errorMessage = error.error.message || error.statusText || error.message;
      if (error.status === 403) {
        this.router.navigate(['session-timeout']);
      }
    }

    this.requestErrorMessage = errorMessage;
    this.loaderService.hide()
    this.showError();
    return throwError(error.error);
  }

  showError() {
    this.snackbarService.show(this.requestErrorMessage);
  }

  get(url: string, params: HttpParams = new HttpParams()): Observable<Response> {
    this.loaderService.show();
    return this.http.get(`${url}`, { params })
      .pipe(
        tap(res => {
          this.loaderService.hide();
        }),
        catchError(this.formatErrors.bind(this))
      )
  }

  getAttachment(path: string): Observable<any> {
    this.loaderService.show();
    return this.http.get(`${path}`, { observe: 'response', responseType: 'blob' as 'json' })
      .pipe(
        tap(res => this.loaderService.hide()),
        catchError(this.formatErrors.bind(this))
      )
  }

  getPostAttachment(path: string, body: any): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${path}`, body, { observe: 'response', responseType: 'blob' as 'json' })
      .pipe(
        tap(res => this.loaderService.hide()),
        catchError(this.formatErrors.bind(this))
      )
  }

  getJson(path: string): Observable<Response> {
    this.loaderService.show();
    return this.http.get(path)
      .pipe(
        tap(res => {
          this.loaderService.hide();
        }),
        catchError(this.formatErrors.bind(this))
      )
  }

  post(url: string, body: Object = {}): Observable<Response> {
    this.loaderService.show();
    return this.http.post(`${url}`, body)
      .pipe(
        tap(res => {
          this.loaderService.hide();
        }),
        catchError(this.formatErrors.bind(this))
      )
  }

  put(url: string, body: Object = {}): Observable<Response> {
    this.loaderService.show();
    return this.http.put(`${url}`, JSON.stringify(body))
      .pipe(
        tap(res => this.loaderService.hide()),
        catchError(this.formatErrors.bind(this))
      );
  }

  delete(url: string): Observable<Response> {
    this.loaderService.show();
    return this.http.delete(`${url}`)
      .pipe(
        tap(res => this.loaderService.hide()),
        catchError(this.formatErrors.bind(this))
      )
  }


}
