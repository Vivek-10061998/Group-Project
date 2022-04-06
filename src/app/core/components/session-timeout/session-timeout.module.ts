import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { SessionTimeoutRoutingModule } from './session-timeout-routing.module';

import { SessionTimeoutComponent } from './session-timeout.component';

@NgModule({
  declarations: [
    SessionTimeoutComponent
  ],
  imports: [
    CommonModule,
    SessionTimeoutRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SessionTimeoutModule { }
