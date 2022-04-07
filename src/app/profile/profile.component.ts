import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() error: boolean = false;
  @Input() position = "left";


  constructor() { }

  ngOnInit(): void {
  }

}
