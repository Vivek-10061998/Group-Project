import { Component, Input, HostBinding, Directive } from '@angular/core';

@Directive({
  selector: 'button[ruibutton]'
})
export class ButtonDirective {
  ccolor: any = {
    "default": "r-btn-default",
    "primary": "r-btn-primary",
    "secondary": "r-btn-secondary",
    "success": "r-btn-success",
    "info": "r-btn-info",
    "warning": "r-btn-warning",
    "danger": "r-btn-danger"
  };
  cdesign: any = {
    "outlined": "r-btn-outlined",
    "solid": "r-btn-solid"
  };
  csize: any = {
    "small": "r-btn-small",
    "medium": "r-btn-medium",
    "large": "r-btn-large"
  };
  cshape: any = {
    "squared": "r-btn-squared",
    "rounded": "r-btn-rounded",
    "pilled": "r-btn-pilled",
    "borderless": "r-btn-border-none"
  };

  @Input()
  public design: any = "solid";

  @Input()
  public size: any = "medium";

  @Input()
  public shape: any = "rounded";

  @Input()
  public color: any = "primary";


  @HostBinding('class')
  get classes(): string {
    return `${this.cdesign[this.design]} ${this.csize[this.size]} ${this.cshape[this.shape]} ${this.ccolor[this.color]}`
  }

}


@Component({
  selector: 'div[ruibutton],span[ruibutton],a[ruibutton],input[ruibutton],button[ruibutton]',
  providers: [ButtonDirective],
  template: "<ng-content></ng-content>",
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

}

