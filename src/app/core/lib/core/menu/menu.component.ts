import { Component, Input, QueryList, ContentChildren } from '@angular/core';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'popmenu',
  template: `
  <span class="dropdown">
  <button ruibutton [color]="color" [design]="design" [shape]="shape" [size]="size" class="dropdown-toggle" 
  data-bs-toggle="dropdown" aria-expanded="false" [disabled]="disabled==''?'disabled':false" >
    {{title}}
  </button>
  <ul class="dropdown-menu" >
  <ng-content> </ng-content>
  </ul>
</span>
  `,
  styleUrls: ['./menu.component.scss']

})
export class MenuComponent {
  @Input() title: string = "";
  @Input() color: string = "primary";
  @Input() design: string = "solid";
  @Input() shape: string = "rounded";
  @Input() size: string = "medium";
  @Input() disabled: any;

  @ContentChildren(MenuItemComponent) menuitems: QueryList<MenuItemComponent> = {} as QueryList<MenuItemComponent>;

}
