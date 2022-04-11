import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../app/core/services/auth.service";

@Component({
    selector:'app-login',
    templateUrl:'login.component.html'
})
export class LoginComponent{
    pageTitle='Login';
    maskUserName: boolean=true;
    errorMessage="";
    isLoading=false;
    constructor(private authService:AuthService, private router:Router){}
    login(loginForm:NgForm){
        console.log("Login successful" + loginForm.value)
        if(loginForm.invalid){
            return;
        }
        this.isLoading=true;
        this.authService.login(loginForm.value.userName,loginForm.value.password)
        this.router.navigate(['/home'])
    }
    
}