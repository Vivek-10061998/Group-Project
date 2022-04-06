import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'menu-item',
  template: `  <li><span class="dropdown-item">
  <ng-content></ng-content>
</span> </li>`,
  styleUrls: ['./menu.component.scss']

})
export class MenuItemComponent { }
