import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionTimeoutComponent } from './session-timeout.component';

const routes: Routes = [
  { path: '', redirectTo: 'session-timeout', pathMatch: 'full' },
  { path: 'session-timeout', component: SessionTimeoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SessionTimeoutRoutingModule { }
