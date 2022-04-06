import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';


@NgModule({
  declarations: [
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent,
    TabComponent
  ]
})
export class TabModule { }
