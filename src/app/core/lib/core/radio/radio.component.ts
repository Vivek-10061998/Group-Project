import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'radio',
  template: `<label class="jds-radio-list">
            <span *ngIf="position=='left'" style="margin-right: 10px;">{{title}} </span>
              <input type="radio" 
                    [name]="name"
                    class="radio-input"
                    [value]="value"
                    [(ngModel)] ="modelValue"
                    (change)="valueChanged(value)">
                    <span *ngIf="position=='right'" style="margin-right: 10px;">{{title}} </span>
            </label>`,
  styles: [`.jds-radio-list{
              display: inline-flex;
              align-items: center;
              font-size: .875rem;
            
              input{
                margin-right: 0.5rem;
                cursor: pointer;
              }
            }
            .jds-radio-list + .jds-radio-list {
              margin: 0 0rem 1rem 1rem;
            }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ],
})
export class RadioComponent implements ControlValueAccessor {
  @Input() title: string = "";
  @Input() name: string = "";

  @Input('value') _value = "";

  @Input()
  public position: string = "right";

  modelValue: any;

  get value() {
    return this._value;
  }

  set value(value) {

    if (!!value) {
      this._value = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  onChange: any = function* () { };

  onTouched: any = function* () { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this.modelValue = value;
  }

  valueChanged(value?: any) {
    this.onChange(this.modelValue);
  }
}
