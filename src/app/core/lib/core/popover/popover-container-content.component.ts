import { Component } from '@angular/core';
@Component({
  selector: 'popover-content',
  template: '<div class="dialog-content-area body-02"><ng-content> </ng-content> </div> ',
  styles: [` .dialog-content {
    height: calc(100vh - 120px);
    border-bottom: 1px solid #c4c9d9;
  } `]
})
export class PopovercontentComponent {
}
