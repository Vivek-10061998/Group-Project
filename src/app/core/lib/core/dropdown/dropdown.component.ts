import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
@Component({
  selector: "dropdown",
  templateUrl: "dropdown.component.html",
  styleUrls: ["dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  // Inputs
  @Input("size") size = "";
  @Input("type") type = "single";
  @Input("label") label = "";
  @Input("placeholder") placeholder = "Select1";
  @Input("searchplaceholder") searchplaceholder = "Search";
  @Input() required: boolean = false;
  @Input() hasSearch: boolean = false;
  @Input("items") set items(value: any) {
    this.list = value;
    this.temp_list = value;
  }
  @Input("labelField") labelField = "label";
  @Input("valueField") valueField = "label";
  @Input() state: string = "";

  // output
  @Output() afterChange = new EventEmitter();
  // element
  @ViewChild("input") input: ElementRef = {} as ElementRef;

  list = [];
  keyword = ""; // search input value 
  value: any = this.placeholder; // initial placeholder
  shown = false; // open toggle
  // temp variables
  temp_list = [];
  _labelField: any;
  _valueField: any;

  // ControlValueAccessor functions
  onChange: any = function* () { };
  onTouch: any = function* () { };

  constructor(private ele: ElementRef) { }

  ngOnChanges() {
    if (typeof this.labelField !== 'undefined')
      this.temp_list = this.mapValue(this.temp_list);

    this._labelField = (typeof this.labelField !== 'undefined' && this.labelField !== '') ? this.labelField : 'label';
    this._valueField = (typeof this.valueField !== 'undefined' && this.valueField !== '') ? this.valueField : 'label';
    this.value = this.placeholder;
  }

  mapValue(array: any) {
    return array.map((label: any) => ({ label }))
  }

  writeValue(value: any) {
    if (value) {
      this.temp_list.forEach(x => {
        if (x[this._valueField] == value) {
          this.value = x[this._labelField];
        }
      })
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  search(e: any) {
    const val = e.toLowerCase();
    let that = this;
    const temp = this.temp_list.filter(function (x: any) {
      if (x[that._labelField].toLowerCase().indexOf(val) !== -1 || !val) {
        return x;
      }
    });
    this.list = temp;
  }

  select(item: any) {
    if (typeof (item) == "object") {
      this.onChange(item[this._labelField]);
      this.value = item[this._labelField];
    } else {
      this.onChange(item);
      this.value = item;
    }
    this.shown = false;
    this.afterChange.emit(item);
  }

  show() {
    this.shown = this.shown ? false : true;
    setTimeout(() => {
      this.ele.nativeElement.focus();
    }, 200);
  }

  typeOf(value: any) {
    return typeof value;
  }

  @HostListener("document:click", ["$event"]) onClick(e: any) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }
}
