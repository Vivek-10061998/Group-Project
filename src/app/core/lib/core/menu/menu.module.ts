import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItemComponent } from './menu-item.component';
import { MenuComponent } from './menu.component';
import { ButtonModule } from '../../index';


@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    MenuComponent,
    MenuItemComponent
  ]
})
export class MenuModule { }
