import { Component, Input } from '@angular/core';

@Component({
  selector: 'hint',
  template: `<span class="input-message" [ngClass]="[error ? 'error-message':'',(position=='right')?'full-width text-right':'' ]">
  <ng-content></ng-content>
</span>`
})
export class TextfieldHintComponent {
  @Input() error: boolean = false;
  @Input() position = "left";
}