import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()
  public borderColor: string = "";
  @Input()
  public outline: string = "";
  @Input()
  public background: string = "";

  constructor() {
    this.outline = "";
  }

}
