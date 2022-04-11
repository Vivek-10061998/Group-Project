import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { from } from 'rxjs';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { OrderComponent } from './order/order.component';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', component:HomeComponent
  },
  
  {
    path: 'dashboard',
    // canLoad: [AuthGuardService],
    loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile', component:ProfileComponent
  },
  {
    path: 'order', component:OrderComponent
  },
  {
    path: 'session-timeout',
    loadChildren: () => import('src/app/core/components/session-timeout/session-timeout.module').then(m => m.SessionTimeoutModule)
  },
  //{ path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
