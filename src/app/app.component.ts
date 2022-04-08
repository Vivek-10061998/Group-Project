import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userIsAuthenticated=false;
  private authListenerSub$:any;
  constructor(
    public authService: AuthService){}
    ngOnInit() {
      this.userIsAuthenticated=this.authService.getIsAuthenticated();
      this.authListenerSub$=this.authService.getAuthStatusListener().subscribe(
        isAuthenticated=>{
          this.userIsAuthenticated=isAuthenticated;
        }
      )
      // try {
      //   setTimeout(() => {
      //     this.getUserName();
      //     this.getUserEmail();
      //     this.getNotification();
      //   }, 1000);
      // }
      // catch (e) {
      // }
  
    }

}
