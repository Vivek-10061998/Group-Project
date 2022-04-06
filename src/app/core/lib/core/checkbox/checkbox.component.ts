import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: 'checkbox',
  template: `
  <label class="jds-checkbox-list">
  <span *ngIf="position=='left'" style="margin-right: 10px;">{{title}} </span>
  <input
    class="checkbox-input"
    type="checkbox"
    [ngModel]="checked"
    (ngModelChange)="onModelChange($event)"
  /> 
  <span *ngIf="position=='right'" style="margin-right: 10px;">{{title}} </span>
</label>`,
  styles: [`.jds-checkbox-list{
    display: inline-flex;
    align-items: center;
    font-size: .875rem;
  
    input{
      margin-right: 0.5rem;
      cursor: pointer;
    }
  }
  .jds-checkbox-list + .jds-checkbox-list {
    margin: 0 0rem 1rem 1rem;
  }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input()
  public position: string = "right";
  @Input()
  public title: string = "";

  onChange: any = function* () { };
  onTouch: any = function* () { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  checked: boolean = false;
  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
  }

}


