import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'icon',
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./icon.component.scss']

})
export class IconComponent {

}
