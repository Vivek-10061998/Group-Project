import { Component, Input } from '@angular/core';


@Component({
  selector: 'chip',
  template: `
  <div class="jds-chip" [ngClass]="[size, color, design]"   >
    <div > {{title}} <ng-content> </ng-content> </div>                                
  </div>`,
  styleUrls:['./chip.component.scss']

})
export class ChipComponent {
  @Input()
  public size: string = "";
  @Input()
  public design: string = "";
  @Input()
  public color: string = "";
  @Input()
  public position: string = "right";
  @Input()
  public title: string = "";

  ccolor: any = {
    "success": "success",
    "failure": "failure",
    "warning": "warning",
    "info": "info",

  };
  csize: any = {
    "small": "small",
    "large": "large"
  };



}


