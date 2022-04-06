import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDirective, ButtonComponent } from './button.component';
export { ButtonComponent } from './button.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    ButtonDirective
  ]
})
export class ButtonModule { }
