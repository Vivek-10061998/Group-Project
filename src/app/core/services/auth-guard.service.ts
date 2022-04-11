import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
import { AppConfigService } from './app-config.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {
  userIsAuthenticated=false;
  constructor(@Inject(DOCUMENT) private document: any,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService, private router: Router,
    private appConfigService: AppConfigService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      this.userIsAuthenticated=this.authService.getIsAuthenticated();
      if(!this.userIsAuthenticated){
        alert("Please Login First");
        this.router.navigate(['/login'])
      return false;
      }
      return true;
    }
    canLoad(route: Route): Promise<boolean> {
    
      return new Promise<boolean>((resolve, reject) => {
  
        //this.activatedRoute.queryParams.subscribe(params => {
        let index = window.location.href.indexOf('token=');
  
        if (index > 0) {
          const tokenFrmURL = window.location.href.substr(index + 'token='.length);
          this.appConfigService.saveTokenValue(tokenFrmURL);
          this.getUserDetails(route, resolve, reject);
        }
        else {
          const tokenFrmCatche = this.appConfigService.getTokenValue();
  
          if (tokenFrmCatche) {
            resolve(this.validateRoles(route));
          }
          else {
            this.goToLoginUrl();
            reject(false);
          }
  
        }
  
      })
  
    }
  
  
    getUserDetails(route: any, resolve: any, reject: any) {
  
      this.authService.getUserDetails().subscribe((res: any) => {
  
        if (res && res?.code == 200) { //Success
          this.appConfigService.setSessionObj('userInfo', res.data);
          resolve(this.validateRoles(route));
        }
        else {
          this.router.navigate(['notauthorized']);
        }
  
      }, err => {
        this.router.navigate(['notauthorized']);
      })
  
    }
  
    validateRoles(route: Route) {
  
      let userData = {
        userInfo: this.appConfigService.getSessionObj('userInfo')
      }
  
      if (!userData.userInfo || Object.keys(userData.userInfo).length === 0) {
        this.router.navigate(['notauthorized']);
        return false;
      }
      else {
  
        if (window.location.href.indexOf('token') > 0) {
          if (window.location.hostname === "localhost") {
            this.redirectToSavedState(`http://` + window.location.host + `/dashboard`);
          } else {
            this.router.navigate(['dashboard']);
          }
        }
  
        this.authService.emitUserInfoChange(userData);
  
        return true;
      }
  
    }
  
  
    goToLoginUrl(): void {
      try {
        this.document.location.href = `${environment.loginUrl}?redirectURL=${window.location.href}`;
        // this.document.location.href = `${environment.loginUrl}`;
      } catch (e) {
        // this.snackbar.openSnackBar(e.message, 'close', 'red-snackbar');
      }
    }
  
    redirectToSavedState(url: string) {
      try {
        const routeName = new URL(url).pathname;
        if (window.location.hostname === "localhost") {
          this.router.navigate([routeName]);
        }
        else {
          this.router.navigate(['dashboard']);
        }
      } catch (e) {
        // this.snackbar.openSnackBar(e.message, 'close', 'red-snackbar');
      }
    }


    
}
