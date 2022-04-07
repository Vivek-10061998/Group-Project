import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { from } from 'rxjs';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
    path: 'session-timeout',
    loadChildren: () => import('src/app/core/components/session-timeout/session-timeout.module').then(m => m.SessionTimeoutModule)
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
