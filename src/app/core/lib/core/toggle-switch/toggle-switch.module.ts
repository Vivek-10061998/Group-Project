import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleSwitchComponent } from './toggle-switch.component';
export { ToggleSwitchComponent } from './toggle-switch.component';


@NgModule({
  declarations: [
    ToggleSwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ToggleSwitchComponent
  ]
})
export class ToggleSwitchModule { }
