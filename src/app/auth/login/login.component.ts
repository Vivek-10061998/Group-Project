import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
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
    constructor(private authService:AuthService){}
    login(loginForm:NgForm){
        console.log("Login successful" + loginForm.value)
        if(loginForm.invalid){
            return;
        }
        this.isLoading=true;
        this.authService.login(loginForm.value.userName,loginForm.value.password)
    }
    onSignUp(form:NgForm)
    {
        if(form.invalid){
            return;
        }
        this.isLoading=true;
        this.authService.createUser(form.value.email,form.value.password)
    }
}