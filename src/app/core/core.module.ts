import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AppConfigService } from './services/app-config.service';
import { ModalModule,SidepanelModule } from 'rui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    SidepanelModule 
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    ModalModule,
    SidepanelModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    HttpService,
    AuthService,
    AppConfigService,
    AuthGuardService
  ],
  declarations: [
    HeaderComponent,
    SideNavComponent
  ]
})
export class CoreModule { }
