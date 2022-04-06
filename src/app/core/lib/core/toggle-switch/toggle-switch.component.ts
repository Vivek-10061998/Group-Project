import { Component, Input, HostListener, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']

})
export class ToggleSwitchComponent {

  @Input()
  public checked: boolean = false;
  @Input()
  public position: string = "right";
  @Input()
  public size: string = "small";
  @Input()
  public title: string = "";
  @Input()
  public type: string = "";
  @Input()
  public disabled: boolean = false;
  @Output() onChange: any = new EventEmitter<any>();

  @HostListener('change', ['$event.target.checked'])
  change(checked: any) {
    this.checked = checked;
    this.onChange.emit(checked);
  }

}
