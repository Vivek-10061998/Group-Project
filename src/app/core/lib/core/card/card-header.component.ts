import { Component } from '@angular/core';

@Component({
  selector: 'card-header',
  template: `<div class="jds-secondary-header body-02"> <ng-content></ng-content> </div>`,
  styleUrls: ['./card.component.scss']
})
export class CardHeaderComponent { }