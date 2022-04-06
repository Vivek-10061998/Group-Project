import { Component, HostBinding, Input } from '@angular/core';
import { SHOW_HIDE } from '../shared/animations/show-hide.animation';

@Component({
  selector: 'tab',
  template: `  <div [hidden]="!active" class="jds-tab-container" [@showHide] >
  <ng-content></ng-content>
</div>`,
  styleUrls: ['./tab.component.scss'],
  animations: [SHOW_HIDE]

})
export class TabComponent {
  @Input() tabTitle: string = "";
  @Input() active = false;
  index: number = 0;

  constructor() {
    this.active = false;
  }

}
