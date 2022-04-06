import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(DOCUMENT) private document: any,
  private httpService: HttpService) { }

  private emitUserInfo = new Subject<any>();
  userEmitted$ = this.emitUserInfo.asObservable();

  emitUserInfoChange(userInfo: any) {
    this.emitUserInfo.next(userInfo);
  }

  getUserDetails() {
    return this.httpService.post('rpnc/userservice/api/v1/user/me');
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();

    if(window.location.hostname === "localhost"){
      this.document.location.href = `${environment.loginUrl}?redirectURL=${window.location.host}`;
    } else {
      this.document.location.href = `${environment.loginUrl}?redirectURL=${environment.appUrl}`;
    }
    
    // this.document.location.href = `${environment.loginUrl}`;
  }


}
