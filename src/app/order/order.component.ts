import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selectedTab = 1;

  selectionChange(tab: any) {
    
  }
  options = [
    { id: 1, label: 'One' },
    { id: 2, label: 'Two' },
    { id: 3, label: 'Three' }
  ];
  control = new FormControl();
}
