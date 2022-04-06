import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss']

})
export class AccordianComponent {

  @Input() expanded: boolean = false;

}
