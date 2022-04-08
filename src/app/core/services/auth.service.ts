import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl="http://localhost:3000/api/";
  private token!:string |null;
  private isAuthenticated=false;
  private authStatusListener = new Subject<boolean>();
  constructor(@Inject(DOCUMENT) private document: any,
  private httpService: HttpService,private http:HttpClient,
  private router:Router) { }

  private emitUserInfo = new Subject<any>();
  userEmitted$ = this.emitUserInfo.asObservable();
  getToken(){
    console.log("from method",this.token)
    return this.token;
  }
  getAuthStatusListener(){
      return this.authStatusListener.asObservable();
  }
  getIsAuthenticated(){
      return this.isAuthenticated;
  }
  emitUserInfoChange(userInfo: any) {
    this.emitUserInfo.next(userInfo);
  }
  

  getUserDetails() {
    return this.httpService.post('rpnc/userservice/api/v1/user/me');
  }
  createUser(email:string,password:string){
    const authData:AuthData={email:email, password:password};
    this.http.post(this.authUrl+'signup',authData).subscribe(response=>{
        console.log(response);
        this.router.navigate(['/']);
    })
}
  login(email:string,password:string){
    const authData:AuthData={email:email,password:password};
    this.http.post<{token:string,expiresIn:number}>(this.authUrl+"login",authData).subscribe(response=>{
        const token=response.token;
        this.token=token;
        if(token){
        const expiresInDuration=response.expiresIn;
        this.isAuthenticated=true;
        this.authStatusListener.next(true);
        const now=new Date();
        const expirationDate= new Date(now.getTime()+expiresInDuration*1000);
        console.log(expirationDate);
        this.saveAuthData(token,expirationDate);
        console.log(this.token);
        this.router.navigate(['/']);
        }
    })
}
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.token=null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    this.router.navigate(['/'])
    // if(window.location.hostname === "localhost"){
    //   this.document.location.href = `${environment.loginUrl}?redirectURL=${window.location.host}`;
    // } else {
    //   this.document.location.href = `${environment.loginUrl}?redirectURL=${environment.appUrl}`;
    // }
    
     //this.document.location.href = `${environment.loginUrl}`;
  }
  private saveAuthData(token:string, expirationDate:Date){
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("expiration",expirationDate.toISOString());
}


}
