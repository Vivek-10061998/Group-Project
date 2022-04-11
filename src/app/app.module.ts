import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from 'src/app/core/core.module';
import { AppInitService } from './core/services/app-init.service';
import { AppRuiModule } from './core/app-rui.module'
import { SharedModule } from '../app/shared/shared.module';

export function init(appInitService: AppInitService) {
  return () => appInitService.init();
}

export function loadUrls(appInitService: AppInitService) {
  return () => appInitService.loadUrls();
}
import * as $ from "jquery";
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { LoginModule } from './auth/login.modules';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    LoginModule,
    AppRuiModule
  ],
  exports: [AppRuiModule],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: init, deps: [AppInitService], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadUrls, deps: [AppInitService], multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
