import { Component } from '@angular/core';

@Component({
  selector: 'card-body',
  template: `<div class="jds-card-body"><ng-content></ng-content></div>`,
  styleUrls: ['./card.component.scss']
})
export class CardBodyComponent { }