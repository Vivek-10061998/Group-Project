import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableDirective } from './table.directive';
import { TableService } from './table.service';

export { TableDirective } from './table.directive';
export { TableComponent } from './table.component';


@NgModule({
  declarations: [
    TableComponent,
    TableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    TableDirective
  ]
})
export class TableModule { }
