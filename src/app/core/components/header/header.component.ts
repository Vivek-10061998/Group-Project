import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
// import { AuthService, ThemingService, SidenavService, NotificationService, AppConfigService } from "src/app/core/services";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated=false;
  private authListenerSub$:any;
  userName: string = '';
  userEmail: string = '';
  notificationList :any;
  notificationCount :any;
  remarks_list : any[] = [
    {
      name:{
        firstname:"Jaskaran",
        lastname:"Banga",
      },
      remarks: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
       ex ea commodo consequat`,
      date: "12/02/2021"
    },
    {
      name:{
        firstname:"Satyajeet",
        lastname:"Thakare",
      },
      remarks: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
       ex ea commodo consequat`,
      date: "12/02/2021"
    },
    {
      name:{
        firstname:"Kartik",
        lastname:"Prakash",
      },
      remarks: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
       ex ea commodo consequat`,
      date: "12/02/2021"
    }
  ];
  constructor(
    public authService: AuthService,
    // private snackbar: SnackbarService,
    // private themingService: ThemingService,private notificationService : NotificationService,
    // public sidenavService: SidenavService,private appConfigService : AppConfigService,
    private router: Router
  ) {
    // this.notificationService.notificationPageEmitter$.subscribe(res =>{
    //   if(res)
    //   this.getNotification();
    // })
  }


  ngOnInit() {
    this.userIsAuthenticated=this.authService.getIsAuthenticated();
    this.authListenerSub$=this.authService.getAuthStatusListener().subscribe(
      isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
      }
    )
    try {
      setTimeout(() => {
        this.getUserName();
        this.getUserEmail();
        this.getNotification();
      }, 1000);
    }
    catch (e) {
    }

  }


  getUserName() {
    // this.userName = this.authService.getUserName();
  }
  getUserEmail() {
    // this.userEmail = this.authService.getUserEmail();
  }

  getNotification(){
    try{
      // this.notificationService.fetchUnreadNotifications().subscribe(res =>{
      //   this.notificationList=res.data.notificationList;
      //   this.notificationCount =res.data.unReadNotificationCount;
      // })
    }
    catch (error) {
    }
  }

  markReadNotification(id: string){
    try{
      // this.notificationService.markReadNotification(id).subscribe(res =>{
      //   this.getNotification();
      // })
    }
    catch (error) {
      // this.snackbar.openSnackBar(error.message, 'close', 'red-snackbar');
    }
  }

  changeTheme(theme: string) {
    // this.themingService.theme.next(theme);
  }

  toggleSidenav() {
    // this.sidenavService.toggle();
    $(".jds-content-with-menu").toggleClass("menu-close");
  }

  toggleMenu(){
    $(".jds-header-dropdown").toggleClass("hideMe");
  }
  // @HostListener('window:unload', ['$event'])
  logout() {
    try {
      this.authService.logout();
    }
    catch (e) {
      //this.snackbar.openSnackBar(e.message, 'close', 'red-snackbar');
    }
  }

  navigate(route:any){
    try{
      this.router.navigate([route]);
    }
    catch(e){

    }
  }
  navigateToDashboard(){
    this.router.navigate(['dashboard']);
  }

}
