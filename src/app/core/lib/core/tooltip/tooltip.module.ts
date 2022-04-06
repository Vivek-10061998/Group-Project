import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipDirective } from './tooltip.directive';

export { TooltipDirective } from './tooltip.directive';


@NgModule({
  declarations: [
    TooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TooltipDirective
  ]
})
export class TooltipModule { }
