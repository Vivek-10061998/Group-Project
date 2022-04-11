import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./signup/signup.component";

@NgModule({
    declarations:[
       LoginComponent,
       SignUpComponent 
    ],
    providers:[],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path:'login',
                component:LoginComponent
            },
            {
                path: 'signup',
                component:SignUpComponent
            }
        ]),
    ]
})
export class LoginModule{}