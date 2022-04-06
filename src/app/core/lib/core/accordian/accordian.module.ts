import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordianComponent } from './accordian.component';
import { AccordianHeaderComponent } from './accordian-header.component';
import { AccordianBodyComponent } from './accordian-body.component';


@NgModule({
  declarations: [
    AccordianComponent,
    AccordianHeaderComponent,
    AccordianBodyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccordianComponent,
    AccordianHeaderComponent,
    AccordianBodyComponent
  ]
})
export class AccordianModule { }
