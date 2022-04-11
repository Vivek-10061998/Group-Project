import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";


@Component({
    selector:'app-signup',
    templateUrl:'signup.component.html'
})
export class SignUpComponent{
    pageTitle='Signup';
    isLoading=false;
    constructor(private authService:AuthService,private router:Router){}
    onSignUp(form:NgForm)
    {
        if(form.invalid){
            return;
        }
        this.isLoading=true;
        this.authService.createUser(form.value.email,form.value.password);
        this.router.navigate(['/login'])
    }
}